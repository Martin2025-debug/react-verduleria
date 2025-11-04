import { getLoyalty, bumpOrderCount } from '../src/utils/loyalty.js';

describe('loyalty.js', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const user = { email: 'm@demo.cl', name: 'Martin' };

  it('parte sin descuento antes de la 5ª compra', () => {
    let l = getLoyalty(user);
    expect(l.count >= 0).toBeTrue();
    expect(l.discount || 0).toBe(0);

    // 4 compras
    for (let i = 0; i < 4; i++) bumpOrderCount(user);

    l = getLoyalty(user);
    expect(l.count).toBe(4);
    expect(l.discount || 0).toBe(0);
  });

  it('aplica 10% desde la 5ª compra', () => {
    for (let i = 0; i < 5; i++) bumpOrderCount(user);

    const l = getLoyalty(user);
    expect(l.count).toBe(5);
    expect(l.discount).toBeCloseTo(0.10, 5);
  });

  it('bumpOrderCount incrementa el contador correctamente', () => {
    const before = getLoyalty(user);
    bumpOrderCount(user);
    const after = getLoyalty(user);
    expect(after.count).toBe(before.count + 1);
  });

  it('el descuento se mantiene en 10% después de muchas compras', () => {
    // simular 50 compras
    for (let i = 0; i < 50; i++) bumpOrderCount(user);
    const l = getLoyalty(user);
    expect(l.discountPct).toBe(10);
  });
});
