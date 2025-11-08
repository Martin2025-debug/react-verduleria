
// importa funciones de utilidades //
// gestion de sesion y formateo de dinero //

import { getSesion } from '../utils/auth.js';
import { clp } from '../utils/money.js';


// componente principal de la pagina de historial de peidos //

export default function History() {

  // obtiene la sesion actual del usuario //
  const sesion = getSesion();

  const now = Date.now();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;


  // obtiene los pedidos del usuario logueado o invitado //
  let orders = [];
  if (sesion) {

    // usuario logueado //
    const key = `orders_${sesion.email}`;
    orders = JSON.parse(localStorage.getItem(key) || '[]');
  } else {

    // usuario invitado //
    orders = JSON.parse(localStorage.getItem('guest_orders') || '[]')
      .filter(o => now - (o.createdAt || 0) < twoWeeks);
  }

  // si no hay pedidos muestra un mensaje //

  if (!orders || orders.length === 0) {
    return (
      <main>
        <h2>Historial de pedidos</h2>
        <p>No se encontraron pedidos{sesion ? ` para ${sesion.email}` : ''}.</p>
      </main>
    );
  }

// muestra la lista de pedidos //

  return (
    <main>
      <h2>Historial de pedidos</h2>
      <section>

{/* Recorre todos los pedidos guardados */}

        {orders.map((o, idx) => (
          <article className="pedido" key={o.createdAt || idx} style={{ marginBottom: 16 }}>

            {/* Encabezado del pedido con fecha y número */}
            <h3>Pedido #{o.id || idx + 1} — {new Date(o.createdAt).toLocaleString('es-CL')}</h3>
            <ul>
              { (o.items || []).map((it, i) => (
                <li key={i}>{it.qty} × {it.name} — {clp(it.price * it.qty)}</li>
              )) }
            </ul>

            {/* Muestra subtotal, descuento (si aplica) y total */}
            <p><strong>Subtotal:</strong> {clp(o.subtotal || 0)}</p>
            {o.discountPct ? <p><strong>Descuento:</strong> -{clp(o.discount || 0)} ({o.discountPct}%)</p> : null}
            <p><strong>Total:</strong> {clp(o.total || 0)}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
