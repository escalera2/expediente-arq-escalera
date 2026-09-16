import { DecoradorServicio } from "./DecoradorServicio";

export class DecoradorSeguro extends DecoradorServicio {
  public obtenerCosto(): number {
    return super.obtenerCosto() + 120.0;
  }

  public obtenerDescripcion(): string {
    return `${super.obtenerDescripcion()} + Seguro de Carga ($120)`;
  }
}

export class DecoradorManejoEspecial extends DecoradorServicio {
  public obtenerCosto(): number {
    return super.obtenerCosto() + 85.0;
  }

  public obtenerDescripcion(): string {
    return `${super.obtenerDescripcion()} + Manejo de Carga Frágil ($85)`;
  }
}
