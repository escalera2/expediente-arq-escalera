# Práctica: Patrón Builder en el Sistema Air Cargo

## Objeto Complejo Elegido

`ReservaCarga`

## Justificación

La reserva de carga integra clientes, dimensiones geométricas, tramos de ruta y tarifas económicas. Usar un constructor tradicional para este objeto requeriría demasiados parámetros posicionales.

El patrón **Builder** se nos permite armar la reserva paso a paso con una interfaz fluida (métodos que retornan `this`), calculando automáticamente el volumen ($Largo \times Ancho \times Alto$) y asegurando la integridad del objeto mediante el método guardián `.build()`.

## Ejecución

```bash
npx tsx main.ts
```
