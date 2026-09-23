// Refactor: <escalera choque kevin brayan>
// Corrección de principios solid (SRP, OCP y DIP) para el Comedor Universitario "Sabor Andino"
using Integradora.Comedor;
Demo.Correr();
namespace Integradora.Comedor;

public interface IRepositorioPedidos
{
    void GuardarPedido(string estudiante, string menu, int cantidad, decimal total);
}

public interface INotificador
{
    void Enviar(string mensaje);
}

public class BaseDeDatosComedor : IRepositorioPedidos
{
    public void GuardarPedido(string estudiante, string menu, int cantidad, decimal total)
        => Console.WriteLine($"[BD] INSERT INTO pedidos VALUES ('{estudiante}', '{menu}', {cantidad}, {total})");
}

public class CorreoUniversitario : INotificador
{
    public void Enviar(string mensaje) => Console.WriteLine($"[CORREO] {mensaje}");
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

    public void ProcesarPedido(string estudiante, string tipoMenu, int cantidad)
    {
        decimal precioBase = ObtenerPrecioMenu(tipoMenu);
        decimal total = precioBase * cantidad;

        _repositorio.GuardarPedido(estudiante, tipoMenu, cantidad, total);

        Console.WriteLine("----- VALE DE COMEDOR -----");
        Console.WriteLine($"{estudiante}: {cantidad} x menú {tipoMenu}");
        Console.WriteLine($"TOTAL: {total:0.00} Bs");

        _notificador.Enviar($"Pedido registrado: {cantidad} x {tipoMenu}, {estudiante}");
    }

    private decimal ObtenerPrecioMenu(string tipoMenu) => tipoMenu.ToLower() switch
    {
        "estandar" => 12m,
        "vegetariano" => 14m,
        "beca" => 5m,
        _ => 12m
    };
}

public static class Demo
{
    public static void Correr()
    {
        IRepositorioPedidos bd = new BaseDeDatosComedor();
        INotificador correo = new CorreoUniversitario();

        var gestor = new GestorDePedidos(bd, correo);
        gestor.ProcesarPedido("Noelia", "vegetariano", 2);
    }
}