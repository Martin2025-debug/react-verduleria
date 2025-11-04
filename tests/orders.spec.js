import { saveOrderFromCart, listOrders } from '../src/utils/orders.js';

const day = 24 * 60 * 60 * 1000;

describe('orders.js', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('guarda pedido como invitado en guest_orders', () => {
    const cart = [{ id: 'p1', name: 'Manzana', price: 1000, qty: 2 }];
    const order = saveOrderFromCart(cart);

    const stored = JSON.parse(localStorage.getItem('guest_orders') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(order.id);

    const listed = listOrders();
    expect(listed.length).toBe(1);
    expect(listed[0].total).toBe(2000);
  });

  it('guarda pedido de usuario en orders_<email>', () => {
    // simular sesión
    localStorage.setItem('vh_session', JSON.stringify({ email: 'm@demo.cl', name: 'Martin' }));

    const cart = [{ id: 'p2', name: 'Tomate', price: 500, qty: 3 }];
    const order = saveOrderFromCart(cart);

    const key = 'orders_m@demo.cl';
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(order.id);

    const listed = listOrders();
    expect(listed.length).toBe(1);
    expect(listed[0].total).toBe(1500);
  });

  it('purga órdenes de invitado con más de 14 días al guardar', () => {
    // inyectar una orden vieja en guest_orders
    const oldOrder = {
      id: 'o_old',
      items: [{ id: 'x', name: 'Viejo', price: 1, qty: 1 }],
      total: 1,
      createdAt: new Date(Date.now() - 15 * day).toISOString(), // >14 días
    };
    localStorage.setItem('guest_orders', JSON.stringify([oldOrder]));

    // guarda una nueva
    const cart = [{ id: 'p3', name: 'Plátano', price: 700, qty: 1 }];
    saveOrderFromCart(cart);

    const after = JSON.parse(localStorage.getItem('guest_orders') || '[]');
    expect(after.length).toBe(1);           // la vieja fue purgada
    expect(after[0].id).not.toBe('o_old');  // y quedó solo la nueva
  });

  it('lanza error si el carrito está vacío', () => {
    expect(() => saveOrderFromCart([])).toThrow();
  });

  it('genera ids únicas para cada pedido', () => {
    localStorage.clear();
    const a = saveOrderFromCart([{ id: 'pA', name: 'A', price: 100, qty: 1 }]);
    const b = saveOrderFromCart([{ id: 'pB', name: 'B', price: 200, qty: 1 }]);
    expect(typeof a.id).toBe('string');
    expect(typeof b.id).toBe('string');
    expect(a.id).not.toBe(b.id);
  });

  it('devuelve órdenes ordenadas por fecha descendente', () => {
    // crear dos órdenes manualmente en guest_orders con createdAt diferentes
    const now = Date.now();
    const newer = { id: 'n1', items: [], total: 10, createdAt: new Date(now).toISOString() };
    const older = { id: 'o1', items: [], total: 5, createdAt: new Date(now - 1000 * 60).toISOString() };
    localStorage.setItem('guest_orders', JSON.stringify([older, newer]));

    const listed = listOrders();
    expect(listed.length).toBeGreaterThanOrEqual(2);
    expect(listed[0].id).toBe(newer.id);
    expect(listed[1].id).toBe(older.id);
  });
});
