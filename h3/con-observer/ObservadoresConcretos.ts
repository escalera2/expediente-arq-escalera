import { ObservadorVuelo } from "./ObservadorVuelo";

export class NotificadorCliente implements ObservadorVuelo {
  constructor(private emailCliente: string) {}

  public actualizar(codigoVuelo: string, nuevoEstado: string): void {
    console.log(
      `[EMAIL CLIENTE -> ${this.emailCliente}]: El vuelo ${codigoVuelo} cambió a estado: "${nuevoEstado}".`,
    );
  }
}

export class SistemaAduana implements ObservadorVuelo {
  public actualizar(codigoVuelo: string, nuevoEstado: string): void {
    console.log(
      `[SISTEMA ADUANA ]: Notificación recibida para ${codigoVuelo}. Estado: "${nuevoEstado}". Preparando manifiesto de carga.`,
    );
  }
}
