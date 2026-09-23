# Patrón Seleccionado — Observer (Comedor Universitario "Sabor Andino")

## 1. Requerimiento que lo exige
Cuando un pedido ya queda preparado, el estudiante debe de recibir un aviso.

## 2. Patrón Aplicado
**Observer (Observador)**.

## 3. Justificacion
- **Por qué ESE:** esta permitiendo desacoplar el objeto que cambia de estado (`Pedido`) del envio o destinatarios del aviso (estudiantes por Correo, SMS o notificación). El pedido solo notifica el evento ocurrido `"preparado"`, y todos los observadores suscritos van reaccionando automáticamente.
- **Qué pasa sin él:** El objeto `Pedido` se tendría que instanciar y tener que conocer directamente la clase de correo/notificación (`new CorreoUniversitario().Enviar(...)`)y asi violando los principios SRP y DIP y que  además de obligar a modificar la clase del pedido cada vez que se agregue un nuevo canal de notificación.

## 4. Diseño del Código
```csharp
public interface IObservadorPedido
{
    void OnPedidoPreparado(int pedidoId, string estudiante);
}

public class NotificadorCorreoEstudiante : IObservadorPedido
{
    public void OnPedidoPreparado(int pedidoId, string estudiante)
    {
        Console.WriteLine($"[AVISO CORREO] ¡Hola {estudiante}! Tu pedido #{pedidoId} está PREPARADO para recoger.");
    }
}

public class PedidoSubject
{
    private readonly List<IObservadorPedido> _observadores = new();
    public int Id { get; set; }
    public string Estudiante { get; set; }

    public void Suscribir(IObservadorPedido observador) => _observadores.Add(observador);

    public void CambiarEstadoAPreparado()
    {
        Console.WriteLine($"[ESTADO] Pedido #{Id} cambió a PREPARADO.");
        Notificar();
    }

    private void Notificar()
    {
        foreach (var obs in _observadores)
            obs.OnPedidoPreparado(Id, Estudiante);
    }
}
