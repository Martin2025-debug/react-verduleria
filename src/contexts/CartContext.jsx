
// cerebro del Carrito de compras //

// importa las funciones de react necesarias //

import { createContext, useContext, useEffect, useMemo, useState } from "react";


// se crea el contexto del carrito //
const CartCtx = createContext();


// este componente provee el contexto del carrito a sus hijos //
export function CartProvider({ children }) {
  
  // estado inicial del carrito, cargando desde LocalStorgae //
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("carrito") || "[]"); }
    catch { return []; }
  });


  // sincroniza el estado del carrito con LocalStorage //
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

// funcion para agregar un producto al carrito //

  const add = (product) => {
    setItems(prev => {
      // busca si el producto ya esta en el carrito //
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        // y si ya existe, aumenta la cantidad //
        const c = [...prev];
        c[i] = { ...c[i], qty: c[i].qty + 1 };
        return c;
      }

      // si no existe, Lo agrega con cantidad 1 //
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const dec = (id) =>
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));


// funcion para remover completamente un producto del carrito //

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id));

// funcion para limpiar todo el carrito //
  const clear = () => setItems([]);


  // funcion para sumar cantidades y totales //
  const totalItems = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const totalCLP   = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items]);


  // retorna el proveedor del contexto con los valores y funciones del carrito //
  return (
    <CartCtx.Provider value={{ items, add, dec, remove, clear, totalItems, totalCLP }}>
      {children}
    </CartCtx.Provider>
  );
}

// funcion para poder usar el carrito desde cualquier componente //
export const useCart = () => useContext(CartCtx);
