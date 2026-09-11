# Práctica: Patrón Adapter en el Sistema Air Cargo

## Sistema Externo Identificado

**API de FlightAware (AeroAPI)**

---

## ¿Por qué implementamos el patrón Adapter?

El backend de Air Cargo requiere consultar la ubicación y estado de los vuelos en tiempo real. La API de terceros (FlightAware) devuelve datos en un formato nativo propio (`ident`, `lat`, `lon`, `flight_status`).

Para evitar desacoplar y contaminar la lógica de nuestro sistema con los nombres de campos de una API externa, implementamos el patrón **Adapter**. Este actúa como un traductor intermedio: consulta a FlightAware, transforma la respuesta al formato estandarizado de nuestro dominio (`EstadoVuelo`) y aísla al backend de cambios futuros en la API de terceros.

---

## Instrucciones de Ejecución

Para verificar el funcionamiento del Adaptador, ejecuta desde la consola:

```bash
npx tsx main.ts
```
