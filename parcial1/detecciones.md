# P1.1 - Detección de Violaciones SOLID

| Principio     | Dónde vive                       | Por qué es una violación                                                                 |
| :------------ | :------------------------------- | :--------------------------------------------------------------------------------------- |
| **SRP**       | `GestorDePedidos.ProcesarPedido` | Hace de todo: calcula total, guarda en BD, imprime comprobante y envía correos.          |
| **OCP**       | `GestorDePedidos.ProcesarPedido` | Usa un `switch` para calcular descuentos; un cliente nuevo exige modificar la clase.     |
| **ISP / LSP** | `IEmpleadoDeFarmacia` y `Cajero` | Obliga a `Cajero` a implementar métodos que no usa y que lanzan `NotSupportedException`. |
| **DIP**       | `GestorDePedidos.ProcesarPedido` | Instancia directamente clases concretas con `new` en vez de usar interfaces.             |
