import ProductCard from "../components/ProductCard.jsx";
import { useState } from "react";

// Productos agrupados por categoría con sus imágenes
const products = [
  // 🥭 Frutas Frescas
  {
    id: 1,
    code: "FR001",
    name: "Manzanas Fuji",
    price: 2400,
    category: "Frutas Frescas",
    img: "/images/manzanafuji.jpg",
    description:
      "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o postres.",
  },
  {
    id: 2,
    code: "FR002",
    name: "Naranjas Valencia",
    price: 1400,
    category: "Frutas Frescas",
    img: "/images/naranjas-ok.png",
    description:
      "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones óptimas.",
  },
  {
    id: 3,
    code: "FR003",
    name: "Plátanos Cavendish",
    price: 2100,
    category: "Frutas Frescas",
    img: "/images/bananas.jpg",
    description:
      "Plátanos maduros y dulces, ricos en potasio y vitaminas. Perfectos para el desayuno o como snack energético.",
  },

  // 🥬 Verduras Orgánicas
  {
    id: 4,
    code: "VR001",
    name: "Zanahorias Orgánicas",
    price: 1500,
    category: "Verduras Orgánicas",
    img: "/images/Zanahoria-Organica-6-un.webp",
    description:
      "Zanahorias crujientes cultivadas sin pesticidas. Fuente de vitamina A y fibra, ideales para ensaladas y jugos.",
  },
  {
    id: 5,
    code: "VR002",
    name: "Espinacas Frescas",
    price: 1800,
    category: "Verduras Orgánicas",
    img: "/images/espinaca.jpg",
    description:
      "Espinacas frescas y nutritivas, cultivadas bajo prácticas orgánicas. Perfectas para ensaladas y batidos verdes.",
  },
  {
    id: 6,
    code: "VR003",
    name: "Pimientos Tricolores",
    price: 1500,
    category: "Verduras Orgánicas",
    img: "/images/pimientos-tricolores.jpg",
    description:
      "Pimientos rojos, amarillos y verdes ricos en antioxidantes y vitaminas. Dan color y sabor a tus comidas.",
  },

  // 🍯 Productos Orgánicos
  {
    id: 7,
    code: "PO001",
    name: "Miel Orgánica",
    price: 8000,
    category: "Productos Orgánicos",
    img: "/images/Miel-Organica.jpg",
    description:
      "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.",
  },
  {
    id: 8,
    code: "PO003",
    name: "Quinua Orgánica",
    price: 3200,
    category: "Productos Orgánicos",
    img: "/images/Quinoa-Organica.jpg",
    description:
      "Quínoa premium rica en proteínas vegetales. Ideal para acompañamientos o ensaladas equilibradas.",
  },

  // 🥛 Productos Lácteos
  {
    id: 9,
    code: "PL001",
    name: "Leche Entera",
    price: 2100,
    category: "Productos Lácteos",
    img: "/images/Leche-Entera.jpg",
    description:
      "Leche entera natural y nutritiva, proveniente de granjas chilenas certificadas. Perfecta para tu desayuno.",
  },
];

// Agrupar productos por categoría
const grouped = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) groups[category] = [];
  groups[category].push(product);
  return groups;
}, {});

export default function Catalog() {
  return (
    <main>
      <h2 style={{ marginBottom: 20 }}>Catálogo</h2>

      {Object.keys(grouped).map((category) => (
        <section key={category} style={{ marginBottom: 24 }}>
          <h3 className="category-title">
            {category === "Frutas Frescas" && "🍎 "}
            {category === "Verduras Orgánicas" && "🥕 "}
            {category === "Productos Orgánicos" && "🍯 "}
            {category === "Productos Lácteos" && "🥛 "}
            {category}
          </h3>

          <div className="catalogo">
            {grouped[category].map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
