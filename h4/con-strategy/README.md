# Módulo: Patrón Strategy (Air Cargo)

## Descripción y Dominio

Este módulo implementa el patrón **Strategy** para la tarificación dinámica de fletes aéreos. Elimina bloques rígidos de `if-else` encapsulando cada fórmula de cálculo de costo dentro de algoritmos independientes e intercambiables en tiempo de ejecución.

## Componentes

- **Contrato (`EstrategiaCalculoTarifa.ts`):** Interfaz que exige el método `calcularCosto(pesoKg, volumenCm3)`.
- **Estrategias Concretas (`EstrategiasConcretas.ts`):**
  - `TarifaEstandar`: Cobra una cuota base estándar por kilogramo.
  - `TarifaExpress`: Suma un recargo de prioridad por despacho rápido.
  - `TarifaRefrigerada`: Calcula un costo adicional en función del volumen en cámara fría.
- **Contexto (`CalculadoraFlete.ts`):** Mantiene la referencia a la estrategia activa y delega la ejecución del cálculo.

## Comando de Ejecución

```bash
npx tsx main.ts
Salida Esperada en Consola
Costo Tarifa Estándar: $350
Costo Tarifa Express: $750
Costo Tarifa Refrigerada: $508
```
