````markdown
# Práctica C4: Principios SOLID (S - Single Responsibility & O - Open/Closed)

## 1. Identificación y Solución de Clase Gorda (Principio S - SRP)

### El Antes (Diseño con Clase Gorda)

En el modelo inicial legado (`treserva`), la clase `ReservaGuia` acumulaba múltiples responsabilidades violando el principio de **Single Responsibility (SRP)**:

- Gestión física de bultos (dimensiones, cubicaje $GW/VW$, apilabilidad).
- Lógica financiera (cálculo de precios, tarifas y sobrecargas).
- Seguimiento de estado y auditoría.

```mermaid
classDiagram
    class ReservaGuia_GORDA {
        -numero_awb: String
        -alto_cm: Double
        -ancho_cm: Double
        -tarifa_por_kg: Double
        -historial_eventos: String
        +calcularVolumenM3()
        +calcularPesoVolumetrico()
        +calcularCostoTotal()
        +registrarEvento()
    }
```
````

### El Después (Refactorización SRP Aplicada)

Se eliminó la clase gorda distribuyendo las responsabilidades en entidades especializadas con una sola razón para cambiar:

```mermaid
classDiagram
    class ReservaGuia {
        -numero_awb: String
        -costo_total: Double
        -estado_reserva: String
        +congelarTarifaHistorica()
        +confirmarReserva()
    }

    class DetalleBulto {
        -alto_cm: Double
        -ancho_cm: Double
        -largo_cm: Double
        +calcularVolumenM3()
        +calcularPesoVolumetrico()
    }

    class Tarifario {
        -vigencia_desde: Date
        +calcularCostoBase()
    }

    class SeguimientoEstado {
        -estado_evento: String
        +registrarEvento()
    }

    ReservaGuia "1" *-- "*" DetalleBulto
    Tarifario "1" -- "*" ReservaGuia
    ReservaGuia "1" *-- "*" SeguimientoEstado

```

---

## 2. Justificación de los Principios Aplicados

- **Principio S (Single Responsibility):** Cada clase tiene una sola área de impacto (`DetalleBulto` para Bodega, `Tarifario` para Finanzas, `SeguimientoEstado` para Atención al Cliente y `ReservaGuia` para la Operación del Contrato).
- **Principio O (Open/Closed):** Las tarifas y recargos pueden extenderse añadiendo nuevos tipos en `CargoAdicional` o escalas en `TarifaEscala` sin alterar la estructura base de `ReservaGuia`.

```

```
