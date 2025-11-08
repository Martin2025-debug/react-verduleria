// src/utils/orders.js
import { v4 as uuidv4 } from 'uuid';

function getSession() {
  // pruebas usan 'vh_session', app usa 'session' - soportamos ambos
  const a = localStorage.getItem('vh_session');
  if (a) return JSON.parse(a);
  const b = localStorage.getItem('sesion');
  if (b) return JSON.parse(b);
  return null;
}

function nowISO() { return new Date().toISOString(); }

// guarda un nuevo pedido desde el carrito actual //
export function saveOrderFromCart(cart) {
  const session = getSession();
  const items = (cart || []).map(p => ({ id: p.id, name: p.name, price: Number(p.price), qty: Number(p.qty || 1) }));
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  // valida que haya items //
  if (!items || items.length === 0) {
    throw new Error('El carrito está vacío');
  }

  // crea el objeto pedido //
  const order = {
    id: uuidv4(),
    items,
    subtotal: total,
    total,
    createdAt: nowISO(),
  };

  // guarda el peidido en localStorage //
  if (session && session.email) {
    const key = `orders_${session.email}`;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(order);
    localStorage.setItem(key, JSON.stringify(list));
  } else {
    const key = 'guest_orders';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    // elimina pedidos >14 dias //
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const filtered = list.filter(o => now - new Date(o.createdAt).getTime() < twoWeeks);
    filtered.push(order);
    localStorage.setItem(key, JSON.stringify(filtered));
  }

  return order;
}

// Lista los pedidods del usuario Logueado o invitado //
export function listOrders() {
  const session = getSession();
  if (session && session.email) {
    const key = `orders_${session.email}`;
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  // guarda invitado//
  const list = JSON.parse(localStorage.getItem('guest_orders') || '[]');
  // filtro de (<14 dias)
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return list
    .filter(o => now - new Date(o.createdAt).getTime() < twoWeeks)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
