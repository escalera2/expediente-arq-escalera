export class GeneradorSecuenciaAWB {
  private static instance: GeneradorSecuenciaAWB;
  private ultimoCorrelativo: number;

  private constructor() {
    this.ultimoCorrelativo = 10000000;
  }

  public static getInstance(): GeneradorSecuenciaAWB {
    if (!GeneradorSecuenciaAWB.instance) {
      GeneradorSecuenciaAWB.instance = new GeneradorSecuenciaAWB();
    }
    return GeneradorSecuenciaAWB.instance;
  }

  public generarSiguienteAWB(prefijoAerolinea: string): string {
    this.ultimoCorrelativo++;
    return `${prefijoAerolinea}-${this.ultimoCorrelativo}`;
  }
}
