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

export function registrar(email, pass) {
  const usuarios = getUsuarios();
  if (usuarios.some(u => u.email === email)) {
    throw new Error('El correo ya está registrado');
  }
  usuarios.push({ email, pass });
  saveUsuarios(usuarios);
  localStorage.setItem(LS_SESION, JSON.stringify({ email, ts: Date.now() }));
}

export function login(email, pass) {
  const u = getUsuarios().find(u => u.email === email && u.pass === pass);
  if (!u) throw new Error('Credenciales inválidas');
  localStorage.setItem(LS_SESION, JSON.stringify({ email, ts: Date.now() }));
}

export function logout() {
  localStorage.removeItem(LS_SESION);
}

export function getSesion() {
  return JSON.parse(localStorage.getItem(LS_SESION) || 'null');
}

export function requireAuth(redirectTo = '/login') {
  if (!getSesion()) {
    window.location.href = redirectTo;
  }
}
