// src/utils/loyalty.js

// programa de lealtad: 10% de descuento desde la quinta compra //
export function getLoyalty(user) {
  if (!user) return { count: 0, discount: 0, discountPct: 0, reason: null };

  const key = `orders_count_${user.email}`;
  const count = Number(localStorage.getItem(key) || 0);
  const discountPct = count >= 5 ? 10 : 0; // porcentaje entero
  const discount = discountPct / 100; // fracción (ej: 0.1)
  return { count, discount, discountPct, reason: discountPct ? 'Cliente frecuente' : null };
}

// incrementa el contador de peddidos del usuario //
export function bumpOrderCount(user) {
  if (!user) return;
  const key = `orders_count_${user.email}`;
  const next = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(next));
}
