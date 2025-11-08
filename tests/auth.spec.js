// import alas funciones necesarias para las pruebas //

import { registrar, login, logout, getSesion } from '../src/utils/auth.js';

//describe el bloque de pruebas de auth.js//

describe('auth.js', () => {
  
  // antes de cada prueba Limpia el LocalStorage //
  beforeEach(() => {
    localStorage.clear();

  });

  // caso 1 registrar a un suario nuevo //
  it('registrar usuario nuevo guarda en localStorage', () => {
    registrar('nuevo@spec.dev', 'pw123');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    expect(usuarios.some(u => u.email === 'nuevo@spec.dev')).toBeTrue();
    // además la sesión quedó guardada
    const ses = getSesion();
    expect(ses).not.toBeNull();
    expect(ses.email).toBe('nuevo@spec.dev');
  });

  it('registrar usuario duplicado lanza error', () => {
    registrar('dup@spec.dev', 'x');
    expect(() => registrar('dup@spec.dev', 'x')).toThrow();
  });

  it('login exitoso guarda sesión', () => {
    // crear usuario manualmente en usuarios
    registrar('login@spec.dev', 'pw');
    logout();
    // ahora login
    login('login@spec.dev', 'pw');
    const ses = getSesion();
    expect(ses).not.toBeNull();
    expect(ses.email).toBe('login@spec.dev');
  });
});
