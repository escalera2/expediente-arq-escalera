# C4 del caso AIR CARGO — Sistema de Gestión de Carga Aérea (H4 - Parte B)

Este archivo contiene la documentación de arquitectura del sistema **Air Cargo**, modelada mediante los Niveles 1 y 2 del estándar C4 en sintaxis Mermaid.

---

## Nivel 1 — Contexto

Mapeo global del sistema Air Cargo, identificando los actores principales y sus integraciones con servicios externos.

```mermaid
flowchart TB
    cliente["Cliente / Importador<br>(solicita reserva y consulta flete)"]
    operador["Operador Logístico<br>(asigna vuelos y gestiona la carga)"]

    sistema["SISTEMA AIR CARGO<br>Gestión de reservas, tarificación dinámica,<br>seguimiento de vuelos y notificaciones"]

    flightaware["SDK FlightAware<br>(radar externo de vuelos)"]
    pasarela["Pasarela de Pagos Online<br>(externa)"]
    notificador["Servicio de Correo Corporativo<br>(SMTP / Email Externo)"]

    cliente -->|"solicita cotización y reserva"| sistema
    operador -->|"actualiza estado de vuelos y carga"| sistema

    sistema -->|"cobra guías y fletes"| pasarela
    sistema -->|"consulta telemetría de vuelo"| flightaware
    sistema -->|"envía alertas de llegada/vencimiento"| notificador
    notificador -->|"entrega notificación"| cliente

```

### Descripción del Entorno

* **Actores del Sistema:**
* **Cliente / Importador:** Usuario que solicita la cotización, agrega servicios adicionales a su carga y consulta el estado del envío.
* **Operador Logístico:** Usuario interno encargado del itinerario de vuelos, asignación de guías aéreas (AWB) y actualización de estados.


* **Sistemas Externos Integrados:**
* **SDK FlightAware:** Proveedor de telemetría y radar de vuelo en tiempo real.
* **Pasarela de Pagos:** Plataforma de procesamiento financiero para el cobro del flete y servicios agregados.
* **Servicio de Correo Corporativo (SMTP):** Canal externo de mensajería para el envío automático de alertas, comprobantes y guías aéreas.



---

## Nivel 2 — Contenedores

Desglose interno de los contenedores ejecutables, servicios de lógica de negocio y almacenes de datos que conforman Air Cargo.

```mermaid
flowchart TB
    cliente["Cliente / Importador"]
    operador["Operador Logístico"]

    subgraph sistema["SISTEMA AIR CARGO"]
        webapp["Aplicación Web / Portal Cargo<br>TypeScript / Node.js<br>Interfaces para reservas, cotizaciones y rastreo"]

        api["Lógica de Negocio y Tarificación<br>TypeScript<br>Cálculo de fletes, tarifas y adicionales<br>(acá viven Strategy y Decorator)"]

        bd[("Base de Datos<br>PostgreSQL / SQL<br>Reservas, AWB, estados y clientes")]

        tracking["Módulo de Tracking y Eventos<br>TypeScript<br>Observer: notifica cambios de estado<br>y vencimientos a suscriptores"]
    end

    flightaware["SDK FlightAware (externo)<br>(conectado con Adapter)"]
    notificador["Servicio de Correo Corporativo (externo)"]

    cliente --> webapp
    operador --> webapp
    webapp --> api
    api --> bd
    api -->|"solicita telemetría"| flightaware
    api -->|"publica eventos de vuelo/vencimiento"| tracking
    tracking -->|"envía correos / alertas"| notificador

```

### Mapeo de Componentes e Implementación de Patrones

* **Portal Cargo (Web App):** Interfaz cliente-servidor que expone las pantallas de gestión y cotización.
* **Lógica de Negocio y Tarificación:** Contenedor donde se ejecuta el cálculo de fletes. Integra los patrones **Strategy** (cálculo de tarifa por peso/volumen/distancia) y **Decorator** (adición dinámica de aditivos como seguros o embalaje frágil).
* **Módulo de Tracking y Eventos:** Servicio desacoplado que implementa el patrón **Observer** para emitir eventos reactivos cuando un vuelo cambia de estado o vence la reserva.
* **Integraciones Externas:** Las llamadas hacia FlightAware, Pasarela de Pagos y Correo Corporativo se aíslan mediante el patrón **Adapter**.
* **Base de Datos:** Almacén persistente estructurado para el registro de guías aéreas (AWB), reservas y clientes.
