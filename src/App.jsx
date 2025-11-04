import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import History from "./pages/History.jsx";
import Help from "./pages/Help.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <CartProvider>
      <NavBar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/historial" element={<History />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </CartProvider>
  );
}
