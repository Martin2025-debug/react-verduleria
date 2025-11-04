import ProductCard from "../components/ProductCard.jsx";

// Productos: usa imágenes desde public/images (Vite recomienda /images/archivo)
const products = [
  { id: 1, name: "Manzanas", price: 1200, img: "/images/manzana.jpg" },
  { id: 2, name: "Bananas",  price:  900, img: "/images/bananas.jpg" },
  { id: 3, name: "Tomates",  price: 1100, img: "/images/tomate.jpg" },
];

export default function Catalog() {
  return (
    <main>
      <h2 style={{ marginBottom: 12 }}>Catálogo</h2>
      <div className="catalogo">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
