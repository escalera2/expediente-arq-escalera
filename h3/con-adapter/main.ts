import {
  FlightAwareAPI,
  FlightAwareAdapter,
  SeguimientoVueloService,
} from "./FlightAwareAdapter";

const apiExterna = new FlightAwareAPI();

const servicioSeguimiento: SeguimientoVueloService = new FlightAwareAdapter(
  apiExterna,
);

const estado = servicioSeguimiento.obtenerEstadoVuelo("OB-301");

console.log("--- Prueba de Patrón Adapter (FlightAware) ---");
console.log(estado);
