import { useState, useEffect } from 'react';
import { getSesion, getUser, updateUser } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const nav = useNavigate();
  const ses = getSesion();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    // Solo reaccionar al email de la sesión para evitar re-ejecuciones
    // por cambios de timestamp u otros metadatos de sesión que
    // sobrescriban los campos mientras el usuario escribe.
    if (!ses) return nav('/login');
    const u = getUser(ses.email);
    if (!u) return nav('/login');
    setUser(u);
    setAddress(u.address || '');
    setPhone(u.phone || '');
    setName(u.name || '');
  }, [nav, ses?.email]);

  const onSave = (e) => {
    e.preventDefault();
    try {
      updateUser(user.email, { address: address.trim(), phone: phone.trim(), name: name.trim() });
      setMsg('Perfil guardado.');
      // volver al inicio después de guardar
      setTimeout(() => nav('/'), 900);
    } catch (err) {
      setMsg(err.message || 'Error al guardar');
    }
  };

  if (!user) return null;

  return (
    <main>
      <h2>Perfil de usuario</h2>
      <form onSubmit={onSave} style={{ maxWidth: 600 }}>
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="address">Dirección de entrega</label>
          <input id="address" name="address" type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Calle, número, comuna" />
        </div>

        <div className="field">
          <label htmlFor="phone">Teléfono de contacto</label>
          <input id="phone" name="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+56 9 1234 5678" />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Guardar perfil</button>
        </div>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}
