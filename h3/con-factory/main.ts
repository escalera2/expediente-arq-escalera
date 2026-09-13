import { ReservaFactory } from "./ReservaFactory";

const reserva1 = ReservaFactory.crearReservaEstandard(
  "Importadora Bolivar",
  "CBB",
  "VVI",
);
console.log("Reserva creada con Factory:", reserva1);
