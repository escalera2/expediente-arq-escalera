import { EstrategiaCalculoTarifa } from "./EstrategiasTarifa";

export interface IReservaCarga {
  obtenerCostoTotal(): number;
  obtenerDetalle(): string;
}

export class ReservaCargaBase implements IReservaCarga {
  constructor(
    public awb: string,
    public pesoKg: number,
    public volumenM3: number,
    public distanciaKm: number,
    private estrategiaTarifa: EstrategiaCalculoTarifa,
  ) {}

  obtenerCostoTotal(): number {
    return this.estrategiaTarifa.calcularTarifaBase(
      this.pesoKg,
      this.volumenM3,
      this.distanciaKm,
    );
  }

  obtenerDetalle(): string {
    return `Guía AWB [${this.awb}] - Flete Base Aéreo`;
  }
}

export abstract class ServicioAgregadoDecorator implements IReservaCarga {
  constructor(protected reserva: IReservaCarga) {}

  abstract obtenerCostoTotal(): number;
  abstract obtenerDetalle(): string;
}

export class ConSeguroCarga extends ServicioAgregadoDecorator {
  obtenerCostoTotal(): number {
    return this.reserva.obtenerCostoTotal() + 75.0;
  }

  obtenerDetalle(): string {
    return `${this.reserva.obtenerDetalle()} + Seguro de Carga ($75)`;
  }
}

export class ConEmbalajeEspecial extends ServicioAgregadoDecorator {
  obtenerCostoTotal(): number {
    return this.reserva.obtenerCostoTotal() + 45.0;
  }

  obtenerDetalle(): string {
    return `${this.reserva.obtenerDetalle()} + Embalaje Frágil ($45)`;
  }
}

export class ConCadenaDeFrio extends ServicioAgregadoDecorator {
  obtenerCostoTotal(): number {
    return this.reserva.obtenerCostoTotal() + 120.0;
  }

  obtenerDetalle(): string {
    return `${this.reserva.obtenerDetalle()} + Monitoreo Cadena de Frío ($120)`;
  }
}
