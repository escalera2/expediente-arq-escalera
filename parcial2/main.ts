// Solucion: "escalera choque brayan"

// Interfaz
export interface IObservadorVencimiento {
  actualizar(nombreSocio: string, fechaVencimiento: string): void;
}

export class NotificadorWhatsApp implements IObservadorVencimiento {
  public actualizar(nombreSocio: string, fechaVencimiento: string): void {
    console.log(
      `[WHATSAPP]: Hola ${nombreSocio}, tu membresía del gimnasio venció el ${fechaVencimiento}.`,
    );
  }
}

export class ModuloPromociones implements IObservadorVencimiento {
  public actualizar(nombreSocio: string, fechaVencimiento: string): void {
    console.log(
      `[PROMOCIONES]: Generando oferta de renovación con 20% de descuento para ${nombreSocio}.`,
    );
  }
}

export class SocioSubject {
  private observadores: IObservadorVencimiento[] = [];

  constructor(
    public nombreSocio: string,
    public fechaVencimiento: string,
  ) {}

  public suscribir(observador: IObservadorVencimiento): void {
    this.observadores.push(observador);
  }

  public notificarVencimiento(): void {
    console.log(
      `\n[SISTEMA GIMNASIO]: Membresía vencida para el socio: ${this.nombreSocio}`,
    );
    for (const observador of this.observadores) {
      observador.actualizar(this.nombreSocio, this.fechaVencimiento);
    }
  }
}

const socio = new SocioSubject("Sergio Viscarra", "10-Sep-2026");

const whatsApp = new NotificadorWhatsApp();
const promociones = new ModuloPromociones();

// Suscripcion dinámico
socio.suscribir(whatsApp);
socio.suscribir(promociones);

// Disparo del evento de vencimiento
socio.notificarVencimiento();
