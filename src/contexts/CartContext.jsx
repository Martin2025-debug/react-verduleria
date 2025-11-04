import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("carrito") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  const add = (product) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const c = [...prev];
        c[i] = { ...c[i], qty: c[i].qty + 1 };
        return c;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const dec = (id) =>
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const totalCLP   = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items]);

  return (
    <CartCtx.Provider value={{ items, add, dec, remove, clear, totalItems, totalCLP }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
