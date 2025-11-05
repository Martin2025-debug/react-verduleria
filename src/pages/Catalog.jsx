import ProductCard from "../components/ProductCard.jsx";

// Productos: usa imágenes desde public/images (Vite recomienda /images/archivo)
// Lista con códigos (FR, VR, PO, PL) proporcionada por el usuario.
const products = [
  { id: 1, code: 'FR001', name: 'Manzanas Fuji',        price: 2400, img: "/images/manzanafuji.jpg" },
  { id: 2, code: 'FR002', name: 'Naranjas Valencia',    price: 1400, img: "/images/naranjas-ok.png" },
  { id: 3, code: 'FR003', name: 'Plátanos Cavendish',   price: 2100, img: "/images/bananas.jpg" },
  { id: 4, code: 'VR001', name: 'Zanahorias Orgánicas', price: 1500, img: "/images/Zanahoria-Organica-6-un.webp" },
  { id: 5, code: 'VR002', name: 'Espinacas Frescas',    price: 1800, img: "/images/espinaca.jpg" },
  { id: 6, code: 'VR003', name: 'Pimientos Tricolores', price: 1500, img: "/images/pimientos-tricolores.jpg" },
  { id: 7, code: 'PO001', name: 'Miel Orgánica',        price: 8000, img: "/images/Miel-Organica.jpg" },
  { id: 8, code: 'PO003', name: 'Quinua Orgánica',      price: 3200, img: "/images/Quinoa-Organica.jpg" },
  { id: 9, code: 'PL001', name: 'Leche Entera',         price: 2100, img: "/images/Leche-Entera.jpg" },
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
