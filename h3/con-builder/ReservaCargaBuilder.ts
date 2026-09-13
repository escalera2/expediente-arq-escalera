import { ReservaCarga } from "./ReservaCarga";

export class ReservaCargaBuilder {
  private reserva: ReservaCarga;

  constructor() {
    this.reserva = new ReservaCarga();
  }

  public paraCliente(cliente: string): this {
    this.reserva.cliente = cliente;
    return this;
  }

  public conCarga(
    pesoKg: number,
    largo: number,
    ancho: number,
    alto: number,
  ): this {
    this.reserva.pesoKg = pesoKg;
    this.reserva.volumenCm3 = largo * ancho * alto;
    return this;
  }

  public conRuta(origen: string, destino: string): this {
    this.reserva.origen = origen;
    this.reserva.destino = destino;
    return this;
  }

  public enVuelo(codigoVuelo: string): this {
    this.reserva.codigoVuelo = codigoVuelo;
    return this;
  }

  public calcularCosto(precioPorKg: number): this {
    this.reserva.costoTotal = this.reserva.pesoKg * precioPorKg;
    return this;
  }

  public build(): ReservaCarga {
    if (this.reserva.pesoKg <= 0) {
      throw new Error("Guardián: La carga debe tener un peso mayor a 0 kg.");
    }

    if (!this.reserva.origen || !this.reserva.destino) {
      throw new Error("Guardián: La reserva debe incluir origen y destino.");
    }

    return this.reserva;
  }
}
