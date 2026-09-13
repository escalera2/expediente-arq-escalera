export class GeneradorSecuenciaAWB {
  private static instancia: GeneradorSecuenciaAWB;
  private contador: number = 1000;

  private constructor() {}

  public static getInstancia(): GeneradorSecuenciaAWB {
    if (!GeneradorSecuenciaAWB.instancia) {
      GeneradorSecuenciaAWB.instancia = new GeneradorSecuenciaAWB();
    }
    return GeneradorSecuenciaAWB.instancia;
  }

  public generarSiguienteAWB(): string {
    this.contador++;
    return `AWB-937-${this.contador}`;
  }
}
