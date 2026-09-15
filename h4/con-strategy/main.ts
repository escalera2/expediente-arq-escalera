import { CalculadoraFlete } from "./CalculadoraFlete";
import {
  TarifaEstandar,
  TarifaExpress,
  TarifaRefrigerada,
} from "./EstrategiasConcretas";

const peso = 100;
const volumen = 80000;

const calculadora = new CalculadoraFlete(new TarifaEstandar());
console.log(
  `Costo Tarifa Estándar: $${calculadora.calcularCostoReserva(peso, volumen)}`,
);

calculadora.cambiarEstrategia(new TarifaExpress());
console.log(
  `Costo Tarifa Express: $${calculadora.calcularCostoReserva(peso, volumen)}`,
);

calculadora.cambiarEstrategia(new TarifaRefrigerada());
console.log(
  `Costo Tarifa Refrigerada: $${calculadora.calcularCostoReserva(peso, volumen)}`,
);
