export interface EstrategiaCalculoTarifa {
  calcularTarifaBase(
    pesoKg: number,
    volumenM3: number,
    distanciaKm: number,
  ): number;
}

export class TarifaPorPeso implements EstrategiaCalculoTarifa {
  calcularTarifaBase(
    pesoKg: number,
    volumenM3: number,
    distanciaKm: number,
  ): number {
    const costoPorKg = 3.5;
    return pesoKg * costoPorKg;
  }
}

export class TarifaPorVolumen implements EstrategiaCalculoTarifa {
  calcularTarifaBase(
    pesoKg: number,
    volumenM3: number,
    distanciaKm: number,
  ): number {
    const factorConversion = 167;
    const pesoVolumetrico = volumenM3 * factorConversion;
    const tarifaAplicable = Math.max(pesoKg, pesoVolumetrico);
    return tarifaAplicable * 4.0;
  }
}

export class TarifaPorDistancia implements EstrategiaCalculoTarifa {
  calcularTarifaBase(
    pesoKg: number,
    volumenM3: number,
    distanciaKm: number,
  ): number {
    const costoPorKm = 0.85;
    return distanciaKm * costoPorKm + pesoKg * 1.2;
  }
}
