export interface EstadoVuelo {
  codigoVuelo: string;
  ubicacionActual: { latitud: number; longitud: number };
  estado: string;
  enAire: boolean;
}

export interface SeguimientoVueloService {
  obtenerEstadoVuelo(codigoVuelo: string): EstadoVuelo;
}

export class FlightAwareAPI {
  public fetchFlightPosition(ident: string) {
    return {
      ident: ident,
      fa_flight_id: "FA-98234-OB301",
      lat: -17.3895,
      lon: -66.1568,
      flight_status: "EN_ROUTE",
      is_airborne: true,
    };
  }
}

export class FlightAwareAdapter implements SeguimientoVueloService {
  private apiExterna: FlightAwareAPI;

  constructor(apiExterna: FlightAwareAPI) {
    this.apiExterna = apiExterna;
  }

  public obtenerEstadoVuelo(codigoVuelo: string): EstadoVuelo {
    const rawData = this.apiExterna.fetchFlightPosition(codigoVuelo);

    return {
      codigoVuelo: rawData.ident,
      ubicacionActual: {
        latitud: rawData.lat,
        longitud: rawData.lon,
      },
      estado: rawData.flight_status === "EN_ROUTE" ? "En Vuelo" : "En Tierra",
      enAire: rawData.is_airborne,
    };
  }
}
