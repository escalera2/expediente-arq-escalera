# Práctica: Patrón Singleton en el Sistema Air Cargo

## Candidato Identificado

**`GeneradorSecuenciaAWB`** (Generador de Secuencia de Guías AWB)

---

## ¿Por qué implementamos el patrón Singleton?

Implementamos el patrón Singleton mediante el `GeneradorSecuenciaAWB` para resolver un problema crítico de integridad de datos: la emisión de números de guía aérea correlativos sin duplicación.

En un entorno concurrente donde múltiples usuarios realizan reservas en simultáneo, tener varias instancias del generador causaría colisiones de numeración (dos guías diferentes con el mismo código AWB). El patrón Singleton restringe la creación a una única instancia global con un constructor privado, asegurando que cada solicitud de nuevo AWB pase por el mismo contador centralizado y se mantenga la secuencia de manera consistente y segura en todo el sistema.

---

## Estructura del Código

- **`GeneradorSecuenciaAWB.ts`**: Implementa el patrón Singleton mediante un constructor privado, un atributo estático (`instance`) y un método de acceso global (`getInstance()`).
- **`main.ts`**: Script de prueba que demuestra que múltiples llamadas reutilizan la misma instancia en memoria y mantienen el correlativo global sin duplicados.

---

## Instrucciones de Ejecución

Para verificar el funcionamiento del Singleton, ejecuta desde la consola:

```bash
npx tsx main.ts
Resultado esperado
999-10000001
999-10000002
true

```
