# ADR 001: Decisiones de Arquitectura y Patrones — Air Cargo

## Contexto

El sistema **Air Cargo** requiere calcular fletes dinámicos, agregar servicios adicionales opcionales, monitorear el estado de los vuelos y enviar notificaciones, integrando APIs externas sin acoplar la lógica interna.

## Decisiones Evaluadas y Adoptadas

- **ADR-01: Tarificación Dinámica con Strategy**
  - _Decisión:_ Usar el patrón **Strategy**.
  - _Razón:_ Separa los algoritmos de cálculo (peso, volumen, tarifa fija) de la clase de reserva.

- **ADR-02: Servicios Agregados con Decorator**
  - _Decisión:_ Usar el patrón **Decorator**.
  - _Razón:_ Permite envolver el envío base con servicios adicionales (seguros, embalaje frágil) dinámicamente.

- **ADR-03: Notificaciones Event-Driven con Observer**
  - _Decisión:_ Usar el patrón **Observer**.
  - _Razón:_ Desacopla la lógica de rastreo del despacho de correos corporativos (SMTP).

- **ADR-04: Integración Externa con Adapter**
  - _Decisión:_ Usar el patrón **Adapter**.
  - _Razón:_ Aísla dependencias de terceros (SDK FlightAware, Pasarela de Pagos, servidor SMTP).

- **ADR-05: Documentación de Arquitectura C4**
  - _Decisión:_ Usar Mermaid dentro de Markdown (_Diagrams as Code_).
  - _Razón:_ Permite versionar los diagramas C4 (Nivel 1 y 2) junto con el código.

## Consecuencias

- **Ventajas:** Módulos altamente desacoplados, código extensible e integración directa en el repositorio.
- **Trade-offs:** Mayor número de interfaces e indirecciones en la estructura del código.
