import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth.js';

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    logout();
    // notificar a listeners dentro de la misma pestaña
    window.dispatchEvent(new Event('sesion-changed'));
    // volver al inicio
    nav('/');
  }, [nav]);

  return null;
}
