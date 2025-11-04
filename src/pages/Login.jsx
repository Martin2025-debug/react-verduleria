import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, registrar, getSesion } from '../utils/auth.js';

export default function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  if (getSesion()) {
    // si ya hay sesión, redirigir a inicio
    nav('/');
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      if (mode === 'login') {
        login(email.trim(), pass);
      } else {
        registrar(email.trim(), pass);
      }
      nav('/');
    } catch (err) {
      setMsg(err.message || 'Ocurrió un error');
    }
  }

  return (
    <main>
      <h2>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>

      <form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
        <label htmlFor="email">Correo</label>
        <input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />

        <label htmlFor="pass">Contraseña</label>
        <input id="pass" type="password" required value={pass} onChange={e=>setPass(e.target.value)} />

        <div style={{ marginTop: 12 }}>
          <button type="submit">{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</button>
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginLeft: 8 }}>
            {mode === 'login' ? 'Quiero crear cuenta' : 'Tengo cuenta'}
          </button>
        </div>
      </form>

      {msg && <div id="msg" style={{ color: '#b91c1c', marginTop: 12 }}>{msg}</div>}
    </main>
  );
}
