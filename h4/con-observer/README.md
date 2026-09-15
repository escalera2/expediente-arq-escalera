# Módulo: Patrón Observer

## Descripción y Dominio

Este módulo implementa el patrón **Observer** para gestionar eventos en tiempo real. Cuando la telemetría de un avión cambia de estado (ej: de `EN_VUELO` a `ATERRIZADO`), el sujeto notifica de forma reactiva y desacoplada a múltiples sistemas interesados.

## Componentes

- **Contrato (`ObservadorVuelo.ts`):** Interfaz que define el método `actualizar()`.
- **Observadores (`ObservadoresConcretos.ts`):**
  - `NotificadorCliente`: Envía alertas al correo del importador.
  - `SistemaAduana`: Prepara la documentación fiscal al detectar novedades del vuelo.
- **Sujeto (`SeguimientoVueloSubject.ts`):** Administra la lista de suscriptores (`.suscribir()`) y dispara las notificaciones automáticas (`.notificar()`).

## Comando de Ejecución

```bash
npx tsx main.ts
Salida Esperada en Consola
[RADAR DE VUELO]: Cambio detectado para vuelo OB-301 -> EN_VUELO
[EMAIL CLIENTE -> contacto@importadorabolivar.com]: El vuelo OB-301 cambió a estado: "EN_VUELO".
[SISTEMA ADUANA]: Notificación recibida para OB-301. Estado: "EN_VUELO". Preparando manifiesto de carga.

[RADAR DE VUELO]: Cambio detectado para vuelo OB-301 -> ATERRIZADO
[EMAIL CLIENTE -> contacto@importadorabolivar.com]: El vuelo OB-301 cambió a estado: "ATERRIZADO".
[SISTEMA ADUANA]: Notificación recibida para OB-301. Estado: "ATERRIZADO". Preparando manifiesto de carga.
```
