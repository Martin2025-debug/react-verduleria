import { useCart } from "../contexts/CartContext.jsx";
import { clp } from "../utils/money.js";

export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <div className="producto">
      <img src={product.img} alt={product.name} />
      <h3>{product.code ? `${product.code} - ${product.name}` : product.name}</h3>
      <p>{clp(product.price)} / kg</p>
      <button onClick={() => add(product)}>Agregar al carrito</button>
    </div>
  );
}
