// src/utils/coupons.js
// Reglas de cupones por umbral de compra (se aplican solo a usuarios logueados)
export function getCouponForTotal(total) {
  // total en CLP (número)
  if (total > 40000) return { discountPct: 10, label: 'Cupón 10% por compras > 40000 CLP' };
  if (total > 30000) return { discountPct: 7, label: 'Cupón 7% por compras > 30000 CLP' };
  if (total > 20000) return { discountPct: 5, label: 'Cupón 5% por compras > 20000 CLP' };
  return { discountPct: 0, label: null };
}

export default {
  getCouponForTotal,
};
