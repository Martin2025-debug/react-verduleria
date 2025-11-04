import { registrar, login, logout, getSesion } from '../src/utils/auth.js';

describe('auth.js', () => {
  beforeEach(() => {
    localStorage.clear();
    // reseed behavior in auth.js may create admin@demo.cl on first run
    // but tests will operate independent by clearing and then registering.
  });

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
