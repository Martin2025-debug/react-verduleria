export default function Help() {
  return (
    <main>
      <h2>Centro de ayuda — Verdulería El Huertito</h2>

      <section style={{ marginTop: 12 }}>
        <h3>¿Cómo comprar?</h3>
        <ol>
          <li>Ve a <strong>Catálogo</strong> y añade productos al carrito con "Agregar al carrito".</li>
          <li>Abre <strong>Carrito</strong> (arriba, botón Carrito) para revisar cantidades y total.</li>
          <li>Pulsa <strong>Enviar pedido</strong> para finalizar la compra. Si estás logueado, tu pedido quedará guardado en tu historial.</li>
        </ol>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Cuenta y seguridad</h3>
        <p>
          Puedes crear una cuenta en <strong>Login</strong>. Este es un sistema de demostración: las contraseñas se guardan en <code>localStorage</code> en texto claro
          — no utilices credenciales reales en este entorno.
        </p>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Descuentos y cupones</h3>
        <ul>
          <li>Si acumulas 5 o más pedidos como usuario, obtienes un <strong>10%</strong> de loyalty.</li>
          <li>Además, para usuarios logueados se aplican cupones por umbral de compra:</li>
          <ul>
            <li>Compras &gt; 40.000 CLP → 10%</li>
            <li>Compras &gt; 30.000 CLP → 7%</li>
            <li>Compras &gt; 20.000 CLP → 5%</li>
          </ul>
          <li>El descuento total mostrado suma el loyalty + el cupón (por ejemplo: loyalty 10% + cupón 7% = 17%).</li>
        </ul>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Historial</h3>
        <p>Si estás logueado, los pedidos quedan guardados indefinidamente en tu cuenta. Si compras como invitado, los pedidos se guardan como invitado y se purgan tras 14 días.</p>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Contacto</h3>
        <p>Si necesitas ayuda adicional escríbenos a <a href="mailto:hola@elhuertito.cl">hola@elhuertito.cl</a>.</p>
      </section>
    </main>
  );
}
