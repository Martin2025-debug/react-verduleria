import { getCouponForTotal } from '../src/utils/coupons.js';

describe('cupones por umbral', () => {
  it('no aplica cupón por debajo de 20000', () => {
    const r = getCouponForTotal(19999);
    expect(r.discountPct).toBe(0);
    expect(r.label).toBeNull();
  });

  it('aplica 5% sobre 20000+', () => {
    const r = getCouponForTotal(20001);
    expect(r.discountPct).toBe(5);
    expect(typeof r.label).toBe('string');
  });

  it('aplica 7% sobre 30000+', () => {
    const r = getCouponForTotal(30001);
    expect(r.discountPct).toBe(7);
  });

  it('aplica 10% sobre 40000+', () => {
    const r = getCouponForTotal(40001);
    expect(r.discountPct).toBe(10);
  });
});
