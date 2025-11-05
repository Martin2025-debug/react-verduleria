import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useEffect, useState } from "react";
import { getSesion, logout } from "../utils/auth.js";

export default function NavBar() {
  const { totalItems } = useCart();
  const [sesion, setSesion] = useState(getSesion());
  const nav = useNavigate();

  useEffect(() => {
    const onStorage = () => setSesion(getSesion());
    window.addEventListener('storage', onStorage);
    window.addEventListener('sesion-changed', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('sesion-changed', onStorage);
    };
  }, []);

  function handleLogout() {
    logout();
    setSesion(null);
    nav('/');
  }

  return (
    <header>
      <nav>
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold" to="/">Verdulería El Huertito</Link>

          <ul className="nav">
            <li className="nav-item"><NavLink className="nav-link" to="/catalogo">Catálogo</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/help">Ayuda</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/historial">Historial</NavLink></li>
            {!sesion && (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
            )}
            {sesion && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/profile">Perfil</NavLink></li>
                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 8 }}>Hola, {sesion.email}</span>
                  <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff8c42', fontWeight: 700, cursor: 'pointer' }}>Salir</button>
                </li>
              </>
            )}
          </ul>

          <NavLink className="btn" to="/carrito">
            Carrito <span id="cart-count">{totalItems}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
