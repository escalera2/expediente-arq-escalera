export interface EstrategiaCalculoTarifa {
  calcularCosto(pesoKg: number, volumenCm3: number): number;
}
