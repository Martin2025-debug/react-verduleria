// src/utils/auth.js
const LS_USUARIOS = 'usuarios';
const LS_SESION = 'sesion';

// Semilla: crea un usuario demo la primera vez
(function seed() {
  const existentes = JSON.parse(localStorage.getItem(LS_USUARIOS) || '[]');
  if (existentes.length === 0) {
    localStorage.setItem(LS_USUARIOS, JSON.stringify([
      { email: 'admin@demo.cl', pass: '1234' }
    ]));
  }
})();

function getUsuarios() {
  return JSON.parse(localStorage.getItem(LS_USUARIOS) || '[]');
}
function saveUsuarios(arr) {
  localStorage.setItem(LS_USUARIOS, JSON.stringify(arr));
}

export function getUser(email) {
  if (!email) return null;
  return getUsuarios().find(u => u.email === email) || null;
}

export function updateUser(email, patch) {
  const usuarios = getUsuarios();
  const i = usuarios.findIndex(u => u.email === email);
  if (i === -1) throw new Error('Usuario no encontrado');
  usuarios[i] = { ...usuarios[i], ...patch };
  saveUsuarios(usuarios);
  return usuarios[i];
}

export function registrar(email, pass) {
  const usuarios = getUsuarios();
  if (usuarios.some(u => u.email === email)) {
    throw new Error('El correo ya está registrado');
  }
  usuarios.push({ email, pass });
  saveUsuarios(usuarios);
  localStorage.setItem(LS_SESION, JSON.stringify({ email, ts: Date.now() }));
  // notificar a listeners en la misma pestaña que la sesión cambió
  try { window.dispatchEvent(new Event('sesion-changed')); } catch (e) { /* safe */ }
}

export function login(email, pass) {
  const u = getUsuarios().find(u => u.email === email && u.pass === pass);
  if (!u) throw new Error('Credenciales inválidas');
  localStorage.setItem(LS_SESION, JSON.stringify({ email, ts: Date.now() }));
  // notificar a listeners en la misma pestaña que la sesión cambió
  try { window.dispatchEvent(new Event('sesion-changed')); } catch (e) { /* safe */ }
}

export function logout() {
  localStorage.removeItem(LS_SESION);
}

export function getSesion() {
  return JSON.parse(localStorage.getItem(LS_SESION) || 'null');
}

export function requireProfile() {
  const s = getSesion();
  if (!s) return false;
  const user = getUser(s.email);
  if (!user) return false;
  // consider profile complete if has address and phone
  return Boolean(user.address && user.phone);
}

export function requireAuth(redirectTo = '/login') {
  if (!getSesion()) {
    window.location.href = redirectTo;
  }
}
