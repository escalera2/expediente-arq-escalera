namespace Parcial1.Farmacia;
// Refactor: escalera brayan
// cura num 1: ISP / LSP - Segregación de Interfaces / Sustitución de Liskov
// Se divide la interfaz "gorda" EmpleadoDeFarmacia en contratos específicos.
// el cajero ya no tiene métodos que lanzan no soporte de una excepcion.


public interface IPedidor
{
    void RegistrarPedido(string medicamento, int cantidad);
}

public interface IAutorizador
{
    void AutorizarVentaControlada(string medicamento);
}

public interface IAjustadorPrecios
{
    void AjustarPrecio(string medicamento, decimal nuevoPrecio);
}

public interface IAuditor
{
    void VerLibroDeControlados();
}


public class Farmaceutico : IPedidor, IAutorizador, IAjustadorPrecios, IAuditor
{
    public void RegistrarPedido(string medicamento, int cantidad)
        => Console.WriteLine($"[FARM] pedido: {cantidad} x {medicamento}");

    public void AutorizarVentaControlada(string medicamento)
        => Console.WriteLine($"[FARM] venta controlada de {medicamento} autorizada");

    public void AjustarPrecio(string medicamento, decimal nuevoPrecio)
        => Console.WriteLine($"[FARM] {medicamento} ahora esta costando  {nuevoPrecio:0.00} Bs");

    public void VerLibroDeControlados()
        => Console.WriteLine("[FARM] Libro de medicamentos controlados");
}

public class Cajero : IPedidor
{
    public void RegistrarPedido(string medicamento, int cantidad)
        => Console.WriteLine($"[caja] pedido: {cantidad} x {medicamento}");
}



// cura num 2: DIP - Principio de inversión de dependencia
// Se puede abstraer del almacenamiento y la notificación en interfaces.
// GestorDePedidos ya no hace 'new' de sus dependencias si no ya entran por el  constructor.


public interface IRepositorioPedidos
{
    void GuardarPedido(string cliente, string medicamento, int cantidad, decimal total);
}

public interface INotificador
{
    void Enviar(string mensaje);
}

public class BaseDeDatosMySql : IRepositorioPedidos
{
    public void GuardarPedido(string cliente, string medicamento, int cantidad, decimal total)
        => Console.WriteLine($"[MYSQL] INSERT INTO pedidos VALUES ('{cliente}', '{medicamento}', {cantidad}, {total})");
}

public class CorreoSmtp : INotificador
{
    public void Enviar(string mensaje)
        => Console.WriteLine($"[SMTP] {mensaje}");
}

public class GestorDePedidos
{
    private readonly IRepositorioPedidos _repositorio;
    private readonly INotificador _notificador;


    public GestorDePedidos(IRepositorioPedidos repositorio, INotificador notificador)
    {
        _repositorio = repositorio;
        _notificador = notificador;
    }

    public void ProcesarPedido(string cliente, string tipoCliente, string medicamento, int cantidad, decimal precioUnitario)
    {
        decimal total = cantidad * precioUnitario;
        decimal descuento;

        switch (tipoCliente)
        {
            case "particular": descuento = 0; break;
            case "asegurado": descuento = total * 0.20m; break;
            case "convenio": descuento = total * 0.10m; break;
            default: descuento = 0; break;
        }

        decimal totalFinal = total - descuento;


        _repositorio.GuardarPedido(cliente, medicamento, cantidad, totalFinal);

        Console.WriteLine("--- COMPROBANTE ---");
        Console.WriteLine($"{cantidad} x {medicamento}");
        Console.WriteLine($"Cliente: {cliente} ({tipoCliente})");
        Console.WriteLine($"TOTAL: {totalFinal:0.00} Bs");

        _notificador.Enviar($"Su pedido de {medicamento} fue registrado, {cliente}");
    }
}

public static class Demo
{
    public static void Correr()
    {
        var repositorio = new BaseDeDatosMySql();
        var notificador = new CorreoSmtp();
        var gestor = new GestorDePedidos(repositorio, notificador);

        gestor.ProcesarPedido("Noelia", "asegurado", "Paracetamol 500mg", 2, 8.50m);
    }
}