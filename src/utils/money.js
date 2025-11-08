// src/utils/money.js
// formatea un numero como peso chileno //
export const clp = (n) =>
  n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
