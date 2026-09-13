import { ReservaCarga } from "./ReservaCarga";

export class ReservaFactory {
  public static crearReservaEstandard(
    cliente: string,
    origen: string,
    destino: string,
  ): ReservaCarga {
    return new ReservaCarga(cliente, 10, 8000, origen, destino, "FL-STD", 50);
  }

  public static crearReservaPesada(
    cliente: string,
    pesoKg: number,
    origen: string,
    destino: string,
  ): ReservaCarga {
    return new ReservaCarga(
      cliente,
      pesoKg,
      pesoKg * 1000,
      origen,
      destino,
      "FL-HEAVY",
      pesoKg * 3.5,
    );
  }
}
