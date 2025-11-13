export default function Home() {
  return (
    <main>
      {/* 🌿 Sección de bienvenida, Logo principal */}
      <section className="bienvenida text-center">
        <img
          src="/images/logo-El-Huertito.png"
          alt="Logo verdulería el huertito"
          className="logo-principal"
        />

        {/* subtítulo que acompaña al logo */}
        <p className="lead">
          Productos frescos y a buen precio todos los días.
        </p>
      </section>

      {/* 🍎 Sección: Enunciado, Misión y Visión */}
      <section className="institucional">
        <article className="bloque">
          <h2>🍎 Enunciado</h2>
          <p>
            <strong>El Huertito</strong> es una tienda online dedicada a llevar la
            frescura y calidad de los productos del campo directamente a la puerta
            de nuestros clientes en Chile. Con más de 6 años de experiencia,
            operamos en más de 9 puntos a lo largo del país, incluyendo ciudades
            clave como Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar,
            Valparaíso y Concepción. Nuestra misión es conectar a las familias chilenas
            con el campo, promoviendo un estilo de vida saludable y sostenible.
          </p>
        </article>

        <article className="bloque">
          <h2>🥕 Misión</h2>
          <p>
            Nuestra misión es proporcionar productos frescos y de calidad directamente
            desde el campo hasta la puerta de nuestros clientes, garantizando la frescura
            y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más
            cercana entre los consumidores y los agricultores locales, apoyando prácticas
            agrícolas sostenibles y promoviendo una alimentación saludable en todos los
            hogares chilenos.
          </p>
        </article>

        <article className="bloque">
          <h2>🫑 Visión</h2>
          <p>
            Nuestra visión es ser la tienda online líder en la distribución de productos
            frescos y naturales en Chile, reconocida por nuestra calidad excepcional,
            servicio al cliente y compromiso con la sostenibilidad. Aspiramos a expandir
            nuestra presencia a nivel nacional e internacional, estableciendo un nuevo
            estándar en la distribución de productos agrícolas directos del productor
            al consumidor.
          </p>
        </article>
      </section>

      {/* 🗺️ NUEVA SECCIÓN: MAPA DE NUEVAS TIENDAS */}
      <section className="mapa-tiendas text-center">
        <h2>🗺️ Nuestras Tiendas en Chile</h2>
        <p>
          Visítanos en nuestras nuevas ubicaciones: <br />
          Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción.
        </p>

        <div className="mapa-contenedor">
          <iframe
            title="Ubicaciones El Huertito"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5319285.682929769!2d-75.00157490246303!3d-36.31224324339874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf0a8b1f1ab7%3A0x7cbb1a9691e35f3f!2sSantiago!5e0!3m2!1ses!2scl!4v1708975800000!5m2!1ses!2scl"
            width="100%"
            height="480"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* 📰 Blog educativo */}
      <section className="blog">
        <h2>📰 Blog: Alimentación Saludable y Sostenibilidad</h2>

        <div className="blog-container">
          {/* 🥗 Artículo 1 */}
          <article className="blog-post">
            <img src="/images/alimentacion saludable.jpg" alt="Alimentos frescos" />
            <h3>Beneficios de consumir productos locales</h3>
            <p>
              Comprar frutas y verduras locales no solo apoya a los agricultores chilenos,
              sino que también reduce la huella de carbono y garantiza productos más frescos
              y sabrosos en tu mesa.
            </p>
            <a href="#" className="leer-mas">Leer más</a>
          </article>

          {/* 🍽️ Artículo 2 */}
          <article className="blog-post">
            <img src="/images/comida saludable.jpg" alt="Comida saludable" />
            <h3>Consejos para una dieta más equilibrada</h3>
            <p>
              Incluir alimentos frescos, evitar procesados y mantener una buena hidratación
              son claves para una vida más saludable. ¡Descubre cómo lograrlo día a día!
            </p>
            <a href="#" className="leer-mas">Leer más</a>
          </article>

          {/* 🌎 Artículo 3 */}
          <article className="blog-post">
            <img src="/images/habitos alimenticios.jpg" alt="Sostenibilidad" />
            <h3>Pequeños cambios, gran impacto</h3>
            <p>
              Adoptar hábitos sostenibles, como reducir el desperdicio de alimentos y usar
              envases reutilizables, puede marcar una gran diferencia para el planeta.
            </p>
            <a href="#" className="leer-mas">Leer más</a>
          </article>
        </div>
      </section>
    </main>
  );
}
