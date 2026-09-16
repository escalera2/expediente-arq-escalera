import { EnvioBase } from "./EnvioBase";
import {
  DecoradorSeguro,
  DecoradorManejoEspecial,
} from "./DecoradoresConcretos";

const envioSimple = new EnvioBase(300, "AR-101");

const combinacionA = new DecoradorSeguro(envioSimple);

console.log("--COMBINACIÓN A ---");
console.log(`Detalle: ${combinacionA.obtenerDescripcion()}`);
console.log(`Costo Total: $${combinacionA.obtenerCosto()}`);

const combinacionB = new DecoradorManejoEspecial(
  new DecoradorSeguro(new EnvioBase(500, "AR-202")),
);

console.log("\n--- COMBINACIÓN B ---");
console.log(`Detalle: ${combinacionB.obtenerDescripcion()}`);
console.log(`Costo Total: $${combinacionB.obtenerCosto()}`);
