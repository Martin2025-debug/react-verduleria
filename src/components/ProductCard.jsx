// Componente para mostrar la información del producto y agregar al carrito //

import { useCart } from "../contexts/CartContext.jsx"; // import del contexto del carrito //
import { clp } from "../utils/money.js"; // import de la función para formatear dinero //
import { useState, useEffect } from "react";

export default function ProductCard({ product }) { // Componente ProductCard que recibe un producto como prop //
  const { add } = useCart(); // obtenemos la función add del contexto del carrito //
  const currentUrl = window.location.href;

  // 🟢 Estado de reseñas y calificación
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  // Cargar reseñas desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`reviews_${product.code}`)) || [];
    setReviews(stored);
  }, [product.code]);

  // Guardar reseñas en localStorage
  useEffect(() => {
    localStorage.setItem(`reviews_${product.code}`, JSON.stringify(reviews));
  }, [reviews, product.code]);

  // Agregar nueva reseña
  const handleAddReview = () => {
    if (!newReview.trim() || rating === 0)
      return alert("Por favor agrega una reseña y selecciona una calificación ⭐");

    const newEntry = {
      text: newReview,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newEntry, ...reviews]);
    setNewReview("");
    setRating(0);
  };

  return (
    <div className="producto">
      {/* Imagen del producto */}
      <img src={product.img} alt={product.name} />

      {/* Nombre del producto y código */}
      <h3>{product.code ? `${product.code} - ${product.name}` : product.name}</h3>

      {/* Precio del producto */}
      <p>{clp(product.price)} / kg</p>

      {/* Descripción del producto */}
      {product.description && <p className="description">{product.description}</p>}

      {/* Botón para agregar producto al carrito */}
      <button onClick={() => add(product)}>Agregar al carrito</button>

      {/* 🔗 Botones para compartir en redes sociales */}
      <div className="social-share">
        <p>Compartir:</p>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/Logo_de_Facebook.png"
            alt="Compartir en Facebook"
            className="social-icon"
          />
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=Mira este producto: ${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/WhatsApp_Logo.png"
            alt="Compartir en WhatsApp"
            className="social-icon"
          />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=Mira este producto&url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/logo-X.png"
            alt="Compartir en X/Twitter"
            className="social-icon"
          />
        </a>
      </div>

      {/* ⭐ Sección de Reseñas y Calificaciones */}
      <div className="reviews">
        <h4>Reseñas y Calificaciones</h4>

        {/* Mostrar reseñas existentes */}
        {reviews.length === 0 ? (
          <p className="no-reviews">Aún no hay reseñas para este producto.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="stars">
                {"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p>{r.text}</p>
              <small>{r.date}</small>
            </div>
          ))
        )}

        {/* Formulario para nueva reseña */}
        <div className="review-form">
          <p>Tu calificación:</p>
          <div className="stars-select">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? "star active" : "star"}
              >
                ⭐
              </span>
            ))}
          </div>

          <textarea
            placeholder="Escribe tu reseña aquí..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview}>Publicar reseña</button>
        </div>
      </div>
    </div>
  );
}
