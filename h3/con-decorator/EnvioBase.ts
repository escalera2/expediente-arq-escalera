import { ServicioCarga } from "./ServicioCarga";

export class EnvioBase implements ServicioCarga {
  constructor(
    private tarifaBase: number,
    private codigoReserva: string,
  ) {}

  public obtenerCosto(): number {
    return this.tarifaBase;
  }

  public obtenerDescripcion(): string {
    return `Envío Aéreo Base [${this.codigoReserva}]`;
  }
}
