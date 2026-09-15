import { ObservadorVuelo } from "./ObservadorVuelo";

export class SeguimientoVueloSubject {
  private observadores: ObservadorVuelo[] = [];
  private estadoActual: string = "EN_ESPERA";

  constructor(public codigoVuelo: string) {}

  public suscribir(observador: ObservadorVuelo): void {
    this.observadores.push(observador);
  }

  public desuscribir(observador: ObservadorVuelo): void {
    this.observadores = this.observadores.filter((obs) => obs !== observador);
  }

  public cambiarEstado(nuevoEstado: string): void {
    this.estadoActual = nuevoEstado;
    console.log(
      `[RADAR DE VUELO]: Cambio detectado para vuelo ${this.codigoVuelo} -> ${nuevoEstado}`,
    );
    this.notificar();
  }

  private notificar(): void {
    for (const observador of this.observadores) {
      observador.actualizar(this.codigoVuelo, this.estadoActual);
    }
  }
}
