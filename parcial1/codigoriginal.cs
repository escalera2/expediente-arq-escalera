// PARCIAL 1 · VARIANTE A — Farmacia "San Rafael" // Sistema de pedidos de medicamentos.
El código FUNCIONA, pero su diseño tiene // 4 violaciones de principios SOLID. Tu trabajo:
encontrarlas y curar dos. namespace Parcial1.Farmacia; public interface IEmpleadoDeFarmacia
{
    void RegistrarPedido(string medicamento, int cantidad); void AutorizarVentaControlada(string
  medicamento); void AjustarPrecio(string medicamento, decimal nuevoPrecio); void
  VerLibroDeControlados();
}
public class Farmaceutico : IEmpleadoDeFarmacia
{
    public void
RegistrarPedido(string medicamento, int cantidad) => Console.WriteLine($"[FARM] Pedido:
{cantidad}
x {medicamento}"); public void AutorizarVentaControlada(string medicamento) =>
Console.WriteLine($"[FARM] Venta controlada de {medicamento} autorizada"); public void
AjustarPrecio(string medicamento, decimal nuevoPrecio) => Console.WriteLine($"[FARM]
{medicamento} ahora cuesta { nuevoPrecio:0.00}
Bs "); public void VerLibroDeControlados() =>
Console.WriteLine("[FARM] Libro de medicamentos controlados"); } public class Cajero :
IEmpleadoDeFarmacia
{
    public void RegistrarPedido(string medicamento, int cantidad) =>
Console.WriteLine($"[CAJA] Pedido: {cantidad} x {medicamento}"); public void
AutorizarVentaControlada(string medicamento) => throw new NotSupportedException("Un
cajero no autoriza controlados."); public void AjustarPrecio(string medicamento, decimal
nuevoPrecio) => throw new NotSupportedException("Un cajero no ajusta precios."); public void
VerLibroDeControlados() => throw new NotSupportedException("Un cajero no accede al libro.");
}
public class GestorDePedidos
{
    public void ProcesarPedido(string cliente, string tipoCliente,
string medicamento, int cantidad, decimal precioUnitario)
    {
        decimal total = cantidad *
precioUnitario; decimal descuento; switch (tipoCliente)
        {
            case "particular": descuento = 0; break;
            case "asegurado": descuento = total * 0.20m; break;
            case "convenio":
                descuento = total *
0.10m; break;
            default: descuento = 0; break;
        }
        decimal totalFinal = total - descuento; var
baseDeDatos = new BaseDeDatosMySql(); baseDeDatos.GuardarPedido(cliente,
medicamento, cantidad, totalFinal); Console.WriteLine("----- COMPROBANTE -----");
        Console.WriteLine($"{cantidad} x {medicamento}"); Console.WriteLine($"Cliente: {cliente}
        ({ tipoCliente})"); Console.WriteLine($"TOTAL: { totalFinal: 0.00}
        Bs"); var correo = new
CorreoSmtp(); correo.Enviar($"Su pedido de {medicamento} fue registrado, {cliente}");
    }
}
public
class BaseDeDatosMySql
{
    public void GuardarPedido(string cliente, string medicamento, int
cantidad, decimal total) => Console.WriteLine($"[MYSQL] INSERT INTO pedidos VALUES
('{cliente}', '{medicamento}', {cantidad}, { total})"); } public class CorreoSmtp { public void
Enviar (string mensaje) => Console.WriteLine($"[SMTP] {mensaje}"); } public static class Demo
{
    public static void Correr()
    {
        new GestorDePedidos().ProcesarPedido("Noelia", "asegurado",
"Paracetamol 500mg", 2, 8.50m);
    }
}