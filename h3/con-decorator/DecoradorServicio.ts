import { ServicioCarga } from "./ServicioCarga";

export abstract class DecoradorServicio implements ServicioCarga {
  constructor(protected servicio: ServicioCarga) {}

  public obtenerCosto(): number {
    return this.servicio.obtenerCosto();
  }

  public obtenerDescripcion(): string {
    return this.servicio.obtenerDescripcion();
  }
}
