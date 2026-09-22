export class ReservaCarga {
  constructor(
    public cliente: string,
    public pesoKg: number,
    public volumenCm3: number,
    public origen: string,
    public destino: string,
    public codigoVuelo: string,
    public costoTotal: number,
  ) {}
}
