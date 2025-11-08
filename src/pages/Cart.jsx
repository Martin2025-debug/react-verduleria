// importa las funciones necesarias de react y utilidades y reglase de negocio //

import { useCart } from "../contexts/CartContext.jsx";
import { clp } from "../utils/money.js";
import { getSesion } from "../utils/auth.js";
import { getLoyalty, bumpOrderCount } from "../utils/loyalty.js";
import { getCouponForTotal } from "../utils/coupons.js";

export default function Cart() {

  // trae los items para modificar el carrito//
  const { items, dec, add, remove, clear } = useCart();
  
  // trae la sesion del usuario //
  const user = getSesion();


  // si no hay productos en el carrito muetsra un mensaje //
  if (items.length === 0) return <main><p>Tu carrito está vacío.</p></main>;


  // clacula el subtotal //
  const subtotal = items.reduce((a, it) => a + Number(it.price) * Number(it.qty || 0), 0);
  // loyalty
  const { discountPct, reason } = getLoyalty(user);


  // cupones solo para usuarios logueados
  const couponInfo = user ? getCouponForTotal(subtotal) : { discountPct: 0, label: null };
  const couponPct = couponInfo.discountPct || 0;

  // Combinamos porcentajes (suma simple). Por ejemplo, loyalty 5% + cupón 7% => 12% total
  const combinedDiscountPct = (discountPct || 0) + (couponPct || 0);

  // calcula el descuento y total //
  const discount = Math.round(subtotal * (combinedDiscountPct / 100));
  const total = subtotal - discount;


// guarda pedidos de invitados por un maximo de 2 semanas //

  const saveGuestOrder = (order) => {
    const key = "guest_orders";
    const list = JSON.parse(localStorage.getItem(key) || "[]");

    // Mantiene solo pedidos creados denstro los ultimos 14 dias //
    const now = Date.now();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const filtered = list.filter(o => now - o.createdAt < twoWeeks);
    
    // agrega el nuevo pedido //
    filtered.push(order);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

  // guarda pedidos de usuario logueados//
  const saveUserOrder = (email, order) => {
    const key = `orders_${email}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(order);
    localStorage.setItem(key, JSON.stringify(list));
    bumpOrderCount({ email });
  };


  // envia el pedido, arma el objeto, guarda segun sea invitado o usuario, Limpia el carrito // 
  const enviarPedido = () => {
    const order = {
      items,
      subtotal,
      loyaltyPct: discountPct || 0,
      couponPct: couponPct || 0,
      couponLabel: couponInfo.label || null,
      discountPct: combinedDiscountPct,
      discount,
      total,
      user: user ? user.email : null,
      createdAt: Date.now(),
    };

    // Persistencia local de demo
    if (user) saveUserOrder(user.email, order);
    else saveGuestOrder(order);

    alert("¡Pedido enviado! Gracias por tu compra.");
    clear();
  };

  return (
    <main>
      <h2>Carrito</h2>

{/* Aviso superior: muestra beneficios y cupones si hay usuario; si no, invita a loguearse */}

      {user ? (
        <div className="form-alert">
          {reason ? `Beneficio aplicado: ${discountPct}% (${reason}).` : "Estás logueado. ¡Sigue acumulando compras para descuentos!"}
          {couponPct ? <div>Además: cupón aplicado {couponPct}% — {couponInfo.label}.</div> : null}
        </div>
      ) : (
        <div className="form-alert">
          Compra como invitado. <strong>Inicia sesión</strong> para guardar tu historial por más de 2 semanas y obtener descuentos.
        </div>
      )}

{/* Tabla principal del carrito */}


      <section id="carrito">
        <table>
          <thead>
            <tr>
              <th>Producto</th><th>Cantidad</th><th>Subtotal</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>

                {/* Columna producto: imagen, nombre y precio unitario */}

                <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {it.img && <img src={it.img} alt={it.name} width="56" height="56" style={{ borderRadius: 8 }} />}
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <small>{clp(it.price)} c/u</small>
                  </div>
                </td>

                {/* Columna cantidad: botones para decrementar/incrementar usando el contexto */}

                <td>
                  <button onClick={() => dec(it.id)}>-</button>
                  <span style={{ margin: '0 8px' }}>{it.qty}</span>
                  <button onClick={() => add(it)}>+</button>
                </td>

                {/* Subtotal por producto: precio * cantidad */}
                <td>{clp(it.price * it.qty)}</td>

                {/*Eliminar productos del carrito */}
                <td><button onClick={() => remove(it.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>

            {/* Subtotal por producto: precio * cantidad */}

        <div style={{ marginTop: 16 }}>
          <p><strong>Subtotal:</strong> {clp(subtotal)}</p>

            {/* Si hay descuento, muestra detalle: total, lealtad y cupón */}

          {discount ? (
            <div>
              <p><strong>Descuento total:</strong> -{clp(discount)} ({combinedDiscountPct}%)</p>
              {discountPct ? <p style={{ margin: 0 }}><small>Incluye loyalty: {discountPct}%</small></p> : null}
              {couponPct ? <p style={{ margin: 0 }}><small>Incluye cupón: {couponPct}% ({couponInfo.label})</small></p> : null}
            </div>
          ) : null}
          <p><strong>Total:</strong> {clp(total)}</p>
        </div>

          {/* Acciones finales: enviar pedido o vaciar carrito */}

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={enviarPedido}>Enviar pedido</button>
          <button onClick={clear} style={{ background: '#aaa' }}>Vaciar</button>
        </div>
      </section>
    </main>
  );
}
