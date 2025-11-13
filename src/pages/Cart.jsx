// importa las funciones necesarias de react y utilidades y reglase de negocio //
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import { clp } from "../utils/money.js";
import { getSesion } from "../utils/auth.js";
import { getLoyalty, bumpOrderCount } from "../utils/loyalty.js";
import { getCouponForTotal } from "../utils/coupons.js";

export default function Cart() {

  // trae los items para modificar el carrito //
  const { items, dec, add, remove, clear } = useCart();
  
  // trae la sesion del usuario //
  const user = getSesion();

  // 🟢 NUEVO: estado para fecha de entrega y seguimiento del pedido
  const [deliveryDate, setDeliveryDate] = useState("");
  const [status, setStatus] = useState("Preparando pedido");

  // 🧾 NUEVO: estado para mostrar boleta y guardar datos de compra
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Cargar estado guardado (persistencia)
  useEffect(() => {
    const savedDate = localStorage.getItem("deliveryDate");
    const savedStatus = localStorage.getItem("orderStatus");
    if (savedDate) setDeliveryDate(savedDate);
    if (savedStatus) setStatus(savedStatus);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("deliveryDate", deliveryDate);
    localStorage.setItem("orderStatus", status);
  }, [deliveryDate, status]);

  // Simular avance del envío
  const handleNextStatus = () => {
    const next = {
      "Preparando pedido": "En camino 🚚",
      "En camino 🚚": "Entregado ✅",
      "Entregado ✅": "Entregado ✅"
    };
    setStatus(next[status]);
  };

  // si no hay productos en el carrito muestra un mensaje //
  if (items.length === 0 && !showReceipt)
    return <main><p>Tu carrito está vacío.</p></main>;

  // calcula el subtotal //
  const subtotal = items.reduce((a, it) => a + Number(it.price) * Number(it.qty || 0), 0);
  // loyalty
  const { discountPct, reason } = getLoyalty(user);

  // cupones solo para usuarios logueados
  const couponInfo = user ? getCouponForTotal(subtotal) : { discountPct: 0, label: null };
  const couponPct = couponInfo.discountPct || 0;

  // Combinamos porcentajes
  const combinedDiscountPct = (discountPct || 0) + (couponPct || 0);

  // calcula el descuento y total //
  const discount = Math.round(subtotal * (combinedDiscountPct / 100));
  const total = subtotal - discount;

  // guarda pedidos de invitados por un máximo de 2 semanas //
  const saveGuestOrder = (order) => {
    const key = "guest_orders";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const now = Date.now();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const filtered = list.filter(o => now - o.createdAt < twoWeeks);
    filtered.push(order);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

  // guarda pedidos de usuarios logueados //
  const saveUserOrder = (email, order) => {
    const key = `orders_${email}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(order);
    localStorage.setItem(key, JSON.stringify(list));
    bumpOrderCount({ email });
  };

  // envia el pedido //
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
      deliveryDate,
      status
    };

    if (user) saveUserOrder(user.email, order);
    else saveGuestOrder(order);

    // 🧾 NUEVO: mostrar boleta antes de limpiar el carrito
    setReceiptData(order);
    setShowReceipt(true);

    alert("✅ Pedido confirmado. Boleta generada correctamente.");
    clear();
  };

  return (
    <main>
      <h2>Carrito</h2>

      {/* Aviso superior */}
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
      {!showReceipt && (  // 🧾 NUEVO: oculta el carrito cuando se muestra la boleta
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
                  <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {it.img && <img src={it.img} alt={it.name} width="56" height="56" style={{ borderRadius: 8 }} />}
                    <div>
                      <div style={{ fontWeight: 700 }}>{it.name}</div>
                      <small>{clp(it.price)} c/u</small>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => dec(it.id)}>-</button>
                    <span style={{ margin: '0 8px' }}>{it.qty}</span>
                    <button onClick={() => add(it)}>+</button>
                  </td>
                  <td>{clp(it.price * it.qty)}</td>
                  <td><button onClick={() => remove(it.id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotal y descuentos */}
          <div style={{ marginTop: 16 }}>
            <p><strong>Subtotal:</strong> {clp(subtotal)}</p>
            {discount ? (
              <div>
                <p><strong>Descuento total:</strong> -{clp(discount)} ({combinedDiscountPct}%)</p>
                {discountPct ? <p style={{ margin: 0 }}><small>Incluye loyalty: {discountPct}%</small></p> : null}
                {couponPct ? <p style={{ margin: 0 }}><small>Incluye cupón: {couponPct}% ({couponInfo.label})</small></p> : null}
              </div>
            ) : null}
            <p><strong>Total:</strong> {clp(total)}</p>
          </div>

          {/* 🗓️ NUEVA sección: selección de fecha de entrega */}
          <section className="delivery-section">
            <h4>📅 Selecciona tu fecha de entrega preferida</h4>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            {deliveryDate && <p>Fecha seleccionada: {deliveryDate}</p>}
          </section>

          {/* 🚚 NUEVA sección: seguimiento visual del envío */}
          <section className="tracking-section">
            <h4>🚚 Estado del envío</h4>
            <div className="tracking-bar">
              <div className={`tracking-step ${status !== "Preparando pedido" ? "active" : ""}`}>Preparando pedido</div>
              <div className={`tracking-step ${status === "En camino 🚚" || status === "Entregado ✅" ? "active" : ""}`}>En camino</div>
              <div className={`tracking-step ${status === "Entregado ✅" ? "active" : ""}`}>Entregado</div>
            </div>
            <p className="current-status">Estado actual: {status}</p>
            <button onClick={handleNextStatus}>Actualizar estado</button>
          </section>

          {/* Acciones finales */}
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button onClick={enviarPedido}>Enviar pedido</button>
            <button onClick={clear} style={{ background: '#aaa' }}>Vaciar</button>
          </div>
        </section>
      )}

      {/* 🧾 NUEVO: Boleta de compra */}
      {showReceipt && receiptData && (
        <div className="receipt">
          <h3>🧾 Boleta de Compra</h3>
          <p>Cliente: {receiptData.user || "Invitado"}</p>
          <p>Fecha: {new Date(receiptData.createdAt).toLocaleDateString()}</p>
          <p>Entrega: {receiptData.deliveryDate || "Por definir"}</p>
          <hr />
          {receiptData.items.map((it) => (
            <p key={it.id}>
              {it.name} x{it.qty} — {clp(it.price * it.qty)}
            </p>
          ))}
          <hr />
          <p><strong>Total pagado: {clp(receiptData.total)}</strong></p>
          <p>Estado actual: {receiptData.status}</p>
          <button onClick={() => window.print()}>🖨️ Imprimir boleta</button>
        </div>
      )}
    </main>
  );
}
