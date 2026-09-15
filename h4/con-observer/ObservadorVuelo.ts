export interface ObservadorVuelo {
  actualizar(codigoVuelo: string, nuevoEstado: string): void;
}
