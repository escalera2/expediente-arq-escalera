import { GeneradorSecuenciaAWB } from "./GeneradorSecuenciaAWB";

const generador1 = GeneradorSecuenciaAWB.getInstancia();
const generador2 = GeneradorSecuenciaAWB.getInstancia();

console.log("--- Prueba de Patrón Singleton (Secuencia AWB) ---");
console.log("Guía 1 generada:", generador1.generarSiguienteAWB());
console.log("Guía 2 generada:", generador1.generarSiguienteAWB());
console.log("Guía 3 generada:", generador2.generarSiguienteAWB());

console.log(
  "¿Ambas referencias apuntan a la misma instancia en memoria?:",
  generador1 === generador2,
);
