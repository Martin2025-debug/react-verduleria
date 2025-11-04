import { getSesion } from '../utils/auth.js';
import { clp } from '../utils/money.js';

export default function History() {
  const sesion = getSesion();

  const now = Date.now();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;

  let orders = [];
  if (sesion) {
    const key = `orders_${sesion.email}`;
    orders = JSON.parse(localStorage.getItem(key) || '[]');
  } else {
    orders = JSON.parse(localStorage.getItem('guest_orders') || '[]')
      .filter(o => now - (o.createdAt || 0) < twoWeeks);
  }

  if (!orders || orders.length === 0) {
    return (
      <main>
        <h2>Historial de pedidos</h2>
        <p>No se encontraron pedidos{sesion ? ` para ${sesion.email}` : ''}.</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Historial de pedidos</h2>
      <section>
        {orders.map((o, idx) => (
          <article className="pedido" key={o.createdAt || idx} style={{ marginBottom: 16 }}>
            <h3>Pedido #{o.id || idx + 1} — {new Date(o.createdAt).toLocaleString('es-CL')}</h3>
            <ul>
              { (o.items || []).map((it, i) => (
                <li key={i}>{it.qty} × {it.name} — {clp(it.price * it.qty)}</li>
              )) }
            </ul>
            <p><strong>Subtotal:</strong> {clp(o.subtotal || 0)}</p>
            {o.discountPct ? <p><strong>Descuento:</strong> -{clp(o.discount || 0)} ({o.discountPct}%)</p> : null}
            <p><strong>Total:</strong> {clp(o.total || 0)}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
