import {
  TarifaPorPeso,
  TarifaPorVolumen,
  TarifaPorDistancia
} from "./EstrategiasTarifa";
import {
  ReservaCargaBase,
  ConSeguroCarga,
  ConEmbalajeEspecial,
  ConCadenaDeFrio,
  IReservaCarga
} from "./ReservaCarga";

console.log("==========================================================");
console.log("   SISTEMA AIR CARGO - DEMO FUSIÓN (STRATEGY + DECORATOR)  ");
console.log("==========================================================");

const awb = "AWB-779-2026";
const peso = 150;
const volumen = 2.5;
const distancia = 1200;

const estrategiaTarifa = new TarifaPorVolumen();

let reservaAirCargo: IReservaCarga = new ReservaCargaBase(
  awb,
  peso,
  volumen,
  distancia,
  estrategiaTarifa
);

console.log("\n[PASO 1: Tarificación Base con Strategy]");
console.log(`Detalle: ${reservaAirCargo.obtenerDetalle()}`);
console.log(`Costo Flete Base: $${reservaAirCargo.obtenerCostoTotal().toFixed(2)}`);

console.log("\n[PASO 2: Aplicando Aditivos Opcionales con Decorator]");

reservaAirCargo = new ConSeguroCarga(reservaAirCargo);
reservaAirCargo = new ConEmbalajeEspecial(reservaAirCargo);
reservaAirCargo = new ConCadenaDeFrio(reservaAirCargo);

console.log(`\nResumen Final de la Reserva:`);
console.log(`Detalle de Servicios: ${reservaAirCargo.obtenerDetalle()}`);
console.log(`----------------------------------------------------------`);
console.log(`COSTO TOTAL A COBRAR: $${reservaAirCargo.obtenerCostoTotal().toFixed(2)}`);
console.log("==========================================================");
