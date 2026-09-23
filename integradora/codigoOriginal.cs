// INTEGRADORA · VARIANTE A — Comedor Universitario "Sabor Andino"
// Esqueleto del sistema de pedidos del comedor. FUNCIONA, pero fue escrito de apuro:
// tiene 3 violaciones SOLID. Es la materia prima de tu parte 2.

namespace Integradora.Comedor;

public class GestorDePedidos
{
    public void ProcesarPedido(string estudiante, string tipoMenu, int cantidad)
    {
        decimal precioBase;
        switch (tipoMenu)
        {
            case "estandar":
                precioBase = 12;
                break;
            case "vegetariano":
                precioBase = 14;
                break;
            case "beca":
                precioBase = 5;
                break;
            default:
                precioBase = 12;
                break;
        }
        decimal total = precioBase * cantidad;

        var baseDeDatos = new BaseDeDatosComedor();
        baseDeDatos.GuardarPedido(estudiante, tipoMenu, cantidad, total);

        Console.WriteLine("----- VALE DE COMEDOR -----");
        Console.WriteLine($"{estudiante}: {cantidad} x menú {tipoMenu}");
        Console.WriteLine($"TOTAL: {total:0.00} Bs");

        var correo = new CorreoUniversitario();
        correo.Enviar($"Pedido registrado: {cantidad} x {tipoMenu}, {estudiante}");
    }
}

public class BaseDeDatosComedor
{
    public void GuardarPedido(string estudiante, string menu, int cantidad, decimal total)
        => Console.WriteLine($"[BD] INSERT INTO pedidos VALUES ('{estudiante}', '{menu}', {cantidad}, {total})");
}

public class CorreoUniversitario
{
    public void Enviar(string mensaje) => Console.WriteLine($"[CORREO] {mensaje}");
}

public static class Demo
{
    public static void Correr()
    {
        new GestorDePedidos().ProcesarPedido("Noelia", "vegetariano", 2);
    }
}
