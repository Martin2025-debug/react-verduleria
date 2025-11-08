
// Componente para mostrar La informacion del producto y agregar al carrito //


import { useCart } from "../contexts/CartContext.jsx"; // import del contexto del carrito //
import { clp } from "../utils/money.js"; // import de la funcion para formatear dinero //

export default function ProductCard({ product }) { // Componente ProducCard que recibe un producto como prop //
  const { add } = useCart(); // obtenemos La funcion add del contexto del carrito //
  return (
    <div className="producto"> 
      <img src={product.img} alt={product.name} />
      <h3>{product.code ? `${product.code} - ${product.name}` : product.name}</h3>
      <p>{clp(product.price)} / kg</p>
      <button onClick={() => add(product)}>Agregar al carrito</button>
    </div>
  );
}
