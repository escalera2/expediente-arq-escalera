import { ReservaCargaBuilder } from "./ReservaCargaBuilder";

const reservaValida = new ReservaCargaBuilder()
  .paraCliente("Importadora Bolivar")
  .conCarga(150, 40, 50, 60)
  .conRuta("CBB", "VVI")
  .enVuelo("OB-301")
  .calcularCosto(2.5)
  .build();

console.log("Reserva construida con éxito:", reservaValida);
