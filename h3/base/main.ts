import { ReservaCarga } from "./ReservaCarga";

const reservaBase = new ReservaCarga(
  "Importadora Bolivar",
  150,
  120000,
  "CBB",
  "VVI",
  "OB-301",
  375,
);

console.log("Reserva Base (Sin patrones):", reservaBase);
