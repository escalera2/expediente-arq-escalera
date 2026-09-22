import { EstrategiaCalculoTarifa } from "./EstrategiaCalculoTarifa";

export class TarifaEstandar implements EstrategiaCalculoTarifa {
  public calcularCosto(pesoKg: number, volumenCm3: number): number {
    return pesoKg * 3.5;
  }
}

export class TarifaExpress implements EstrategiaCalculoTarifa {
  public calcularCosto(pesoKg: number, volumenCm3: number): number {
    const tarifaBase = pesoKg * 7.0;
    const recargoPrioridad = 50.0;
    return tarifaBase + recargoPrioridad;
  }
}

export class TarifaRefrigerada implements EstrategiaCalculoTarifa {
  public calcularCosto(pesoKg: number, volumenCm3: number): number {
    const tarifaPeso = pesoKg * 5.0;
    const recargoRefrigeracion = (volumenCm3 / 1000) * 0.1;
    return tarifaPeso + recargoRefrigeracion;
  }
}
