import { Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Help from "./pages/Help.jsx";
import { getSesion, requireProfile } from "./utils/auth.js";
import Footer from "./components/Footer.jsx";

export default function App() {
  // No forzamos la navegación al perfil. En vez de redirigir,
  // mostramos un aviso no intrusivo para que el usuario complete su perfil,
  // pero permitimos navegar libremente por la app.
  const ses = getSesion();
  const profileMissing = Boolean(ses && !requireProfile());
  return (
    <CartProvider>
      <NavBar />

      {profileMissing && (
        <div className="container">
          <div className="form-alert">
            Tu perfil está incompleto. <Link to="/profile">Completa tu nombre, dirección y teléfono</Link> cuando quieras — la navegación permanece disponible.
          </div>
        </div>
      )}

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/historial" element={<History />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </CartProvider>
  );
}
