import { EstrategiaCalculoTarifa } from "./EstrategiaCalculoTarifa";

export class CalculadoraFlete {
  private estrategia: EstrategiaCalculoTarifa;

  constructor(estrategiaInicial: EstrategiaCalculoTarifa) {
    this.estrategia = estrategiaInicial;
  }

  public cambiarEstrategia(nuevaEstrategia: EstrategiaCalculoTarifa): void {
    this.estrategia = nuevaEstrategia;
  }

  public calcularCostoReserva(pesoKg: number, volumenCm3: number): number {
    return this.estrategia.calcularCosto(pesoKg, volumenCm3);
  }
}
