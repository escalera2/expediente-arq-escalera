# Examen Parcial 2 - Arquitectura de Software (Variante B)

## P2.1 — Justificación de Patrones

### Situación 1: Patron Observer

- **Justificación:** El módulo de socios debe notificar eventos sin acoplarse a los receptores. Sin Observer, cada vez que un nuevo módulo necesite reaccionar a vencimientos hay que modificar la clase principal de socios, violando el Principio de Abierto/Cerrado (OCP) y acoplando la lógica de negocio a canales externos (WhatsApp, Pantalla, Promociones).

### Situación 2: Patron Strategy

- **Justificación:** Se requiere encapsular algoritmos de cálculo de tarifa que varían frecuentemente y duplicados en varios módulos sin Strategy, el cálculo vive en condicionales `if/else` repartidos por el código; modificar una regla implica tocar múltiples archivos con alto riesgo de inconsistencias y violación de los principios No Te Repitas (DRY) y Abierto/Cerrado (OCP).

### Situación 3: Patron Adapter

- **Justificación:** Es necesario integrar una pasarela de pago de terceros con una interfaz incompatible (nombres en inglés, montos en centavos) que puede ser reemplazada en el futuro. Sin Adapter, el dominio dependería directamente de clases concretas del SDK externo, haciendo imposible cambiar de proveedor sin reescribir la lógica de cobro del gimnasio.

---

## P2.3 — La Conexión SOLID (Basado en la implementación de Observer)

- **principio rescatado:** principio de abierto/cerrado (OCP) y Principio de inversión de dependencias (DIP).
- **conexión concreta:** La clase `SocioSubject` depende de la abstracción `IObservadorVencimiento` (`IObservadorVencimiento[]`) y no de implementaciones concretas. esto permite agregar nuevos observadores (como `ModuloPromociones`) sin modificar una sola línea del código fuente del módulo de socios en `SocioSubject`.
