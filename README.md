# expediente-arq-escalera
Expediente de Arquitectura - Seguimiento de Carga (Logística)

* **Estudiante:** [Escalera brayan]
* **Materia:** Arquitectura de Software · UAB · Gestión 2026-2
* **Docente:** Ing. Josue Chura
* **Variante asignada:** Variante 3 — Logística ("Seguimiento de carga")
* 


# Documento de Entrega H1 - Sistema Cargo

* **Estudiante:** [Escalera brayan]
* **Variante:** Sistema de Reservas, Tarifarios y Control de Carga Logística Aérea

---

## 1. Información General y Variante
El presente proyecto tiene como objetivo desarrollar la arquitectura base para la plataforma **Cargo**, enfocada en la gestión comercial, operativa y tarifaria de carga aérea para agencias y aerolíneas.

---

## 2. Actores del Sistema
* **Cliente / Agente de Carga (Forwarder):** Usuario externo que consulta rutas disponibles, solicita cotizaciones, realiza reservas de capacidad de carga y da seguimiento en tiempo real al estado de sus guías aéreas (AWB).
* **Personal Operativo (Aerolínea / Agente):** Usuario interno encargado de la programación de rutas, tramos de vuelo, administración de la flota de aeronaves, ajuste de tarifarios dinámicos y registro de eventos operacionales.
* **Administrador del Sistema:** Encargado del control global de acceso, gestión de compañías (Agencias de Carga y Aerolíneas), administración de usuarios y asignación de roles (RBAC).

---

## 3. Inventario de Módulos y Responsabilidades
* **Módulo `segu` (Seguridad y Control de Acceso):** Controla las identidades de los usuarios, administración de compañías y asignación de permisos bajo el esquema RBAC.
* **Módulo `aero` (Infraestructura, Geografía y Vuelos):** Gestiona el catálogo de países, la red de aeropuertos, la tipificación y flota de aeronaves, y la generación dinámica de itinerarios e instancias de vuelo.
* **Módulo `tari` (Tarifarios y Precios Dinámicos):** Administra las matrices de tarifas por ruta, tipo de carga y rangos de peso, asegurando la vigencia temporal sin modificar transacciones pasadas.
* **Módulo `carg` (Reservas, Operaciones y Tracking):** Administra la emisión de guías aéreas (AWB), la cubicación detallada de bultos ($GW$, $VW$, propiedades apilables/giratorias), el descuento dinámico de capacidad ($kg$ y $m^3$) y el seguimiento de eventos.
* **Módulo `soli` (Solicitudes Comerciales):** Permite procesar peticiones de cotización previa antes de consolidarse en una reserva definitiva.

---

## 4. Primer Diagrama de Clases UML

```mermaid
classDiagram
    direction TB

    namespace Módulo Seguridad {
        class Compania {
            -id_compania: Long
            -razon_social: String
            -ruc_nit: String
            -tipo_compania: String
            -estado: String
            +esAerolinea(): Boolean
            +activarCompania(): Void
        }

        class Persona {
            -id_persona: Long
            -nombres: String
            -apellidos: String
            -ci_pasaporte: String
            -email: String
            +obtenerNombreCompleto(): String
        }

        class Cuenta {
            -id_cuenta: Long
            -id_persona: Long
            -id_compania: Long
            -username: String
            -password_hash: String
            -estado: String
            +autenticar(pass: String): Boolean
            +cambiarPassword(nueva: String): Void
        }

        class Rol {
            -id_rol: Long
            -nombre_rol: String
            -descripcion: String
            +obtenerPermisos(): List
        }
    }

    namespace Módulo Infraestructura y Vuelos {
        class Pais {
            -id_pais: Long
            -codigo_iso: String
            -nombre_pais: String
            +validarIso(): Boolean
        }

        class Aeropuerto {
            -id_aeropuerto: Long
            -id_pais: Long
            -codigo_iata: String
            -nombre: String
            -ciudad: String
            +validarCodigoIata(): Boolean
        }

        class TipoAeronave {
            -id_tipo_aeronave: Long
            -modelo: String
            -categoria: String
            -capacidad_max_peso_kg: Double
            -capacidad_max_volumen_m3: Double
            +esCargoPuro(): Boolean
        }

        class Aeronave {
            -id_aeronave: Long
            -id_compania: Long
            -id_tipo_aeronave: Long
            -matricula: String
            -estado: String
            +estaOperativa(): Boolean
        }

        class VueloProgramado {
            -id_vuelo_programado: Long
            -id_compania: Long
            -id_aeronave: Long
            -id_aeropuerto_origen: Long
            -id_aeropuerto_destino: Long
            -numero_vuelo: String
            -hora_salida_programada: Time
            -dias_semana: String
            +generarInstanciaFecha(fecha: Date): InstanciaVuelo
        }

        class InstanciaVuelo {
            -id_instancia_vuelo: Long
            -id_vuelo_programado: Long
            -fecha_salida: Date
            -peso_disponible_kg: Double
            -volumen_disponible_m3: Double
            -estado_salida: String
            +tieneCupo(peso: Double, vol: Double): Boolean
            +descontarCupo(peso: Double, vol: Double): Void
            +liberarCupo(peso: Double, vol: Double): Void
        }
    }

    namespace Módulo Tarifarios {
        class Tarifario {
            -id_tarifario: Long
            -id_compania: Long
            -id_aeropuerto_origen: Long
            -id_aeropuerto_destino: Long
            -tipo_carga: String
            -vigencia_desde: Date
            -vigencia_hasta: Date
            -moneda: String
            +estaVigenteEn(fecha: Date): Boolean
            +calcularCostoBase(pesoCobrable: Double): Double
        }

        class TarifaEscala {
            -id_tarifa_escala: Long
            -id_tarifario: Long
            -peso_minimo_kg: Double
            -peso_maximo_kg: Double
            -tarifa_por_kg: Double
            -tarifa_minima_plana: Double
            +aplicaParaPeso(peso: Double): Boolean
            +calcularSubtotal(peso: Double): Double
        }

        class CargoAdicional {
            -id_cargo_adicional: Long
            -id_tarifario: Long
            -concepto: String
            -monto_fijo: Double
            -porcentaje: Double
            +calcularRecargo(montoBase: Double): Double
        }
    }

    namespace Módulo Solicitudes {
        class SolicitudCotizacion {
            -id_solicitud_cotizacion: Long
            -id_cuenta_solicitante: Long
            -id_aeropuerto_origen: Long
            -id_aeropuerto_destino: Long
            -fecha_tentativa: Date
            -peso_estimado_kg: Double
            -estado: String
            +procesarCotizacion(): Void
            +convertirAReserva(): ReservaGuia
        }
    }

    namespace Módulo Reservas y Operaciones {
        class ReservaGuia {
            -id_reserva_guia: Long
            -numero_awb: String
            -id_cuenta_remitente: Long
            -id_instancia_vuelo: Long
            -id_tarifario_aplicado: Long
            -fecha_reserva: DateTime
            -peso_bruto_total_kg: Double
            -peso_volumetrico_total_kg: Double
            -peso_cobrable_kg: Double
            -costo_flete: Double
            -costo_total: Double
            -estado_reserva: String
            +calcularPesoCobrable(factorVol: Double): Double
            +congelarTarifaHistorica(tarifario: Tarifario): Void
            +confirmarReserva(): Void
        }

        class DetalleBulto {
            -id_detalle_bulto: Long
            -id_reserva_guia: Long
            -cantidad_bultos: Int
            -alto_cm: Double
            -ancho_cm: Double
            -largo_cm: Double
            -peso_bruto_kg: Double
            -peso_volumetrico_kg: Double
            -es_turneable: Boolean
            -es_apilable: Boolean
            +calcularVolumenM3(): Double
            +calcularPesoVolumetrico(divisorIATA: Double): Double
        }

        class SeguimientoEstado {
            -id_seguimiento_estado: Long
            -id_reserva_guia: Long
            -id_aeropuerto_ubicacion: Long
            -estado_evento: String
            -fecha_hora_evento: DateTime
            -comentario: String
            +registrarEvento(estado: String): Void
        }
    }

    %% Relaciones
    Persona "1" -- "1" Cuenta : posee
    Compania "1" o-- "*" Cuenta : pertenece
    Cuenta "*" o-- "*" Rol : asignado

    Pais "1" *-- "*" Aeropuerto : contiene
    TipoAeronave "1" -- "*" Aeronave : clasifica
    Compania "1" o-- "*" Aeronave : posee
    Compania "1" o-- "*" VueloProgramado : opera
    Aeronave "1" -- "*" VueloProgramado : asignada
    Aeropuerto "1" -- "*" VueloProgramado : origen
    Aeropuerto "1" -- "*" VueloProgramado : destino
    VueloProgramado "1" *-- "*" InstanciaVuelo : genera

    Compania "1" o-- "*" Tarifario : emite
    Aeropuerto "1" -- "*" Tarifario : origen
    Aeropuerto "1" -- "*" Tarifario : destino
    Tarifario "1" *-- "*" TarifaEscala : define rangos
    Tarifario "1" *-- "*" CargoAdicional : incluye recargos

    Cuenta "1" -- "*" SolicitudCotizacion : solicita
    Aeropuerto "1" -- "*" SolicitudCotizacion : origen
    Aeropuerto "1" -- "*" SolicitudCotizacion : destino

    Cuenta "1" -- "*" ReservaGuia : crea
    InstanciaVuelo "1" -- "*" ReservaGuia : transporta
    Tarifario "1" -- "*" ReservaGuia : congela tarifa
    ReservaGuia "1" *-- "*" DetalleBulto : contiene
    ReservaGuia "1" *-- "*" SeguimientoEstado : rastrea
    Aeropuerto "1" -- "*" SeguimientoEstado : ocurre en
```

---

## 5. Atributos de Calidad Críticos y Líneas de Defensa

* **Consistencia e Integridad de Capacidad (Integridad Logística):**
  * **Línea de defensa 1 (Nivel Dominio/Clase):** La entidad `InstanciaVuelo` expone el método `tieneCupo(peso, vol)`, verificando atómicamente la disponibilidad de espacio real antes de aceptar cualquier confirmación.
  * **Línea de defensa 2 (Nivel Transaccional):** Al momento de emitir una `ReservaGuia`, la capacidad requerida es descontada inmediatamente mediante el método `descontarCupo()`, evitando sobre-reservas (*overbooking*) en vuelos de alta demanda.

* **Invariabilidad Dinámica de Tarifas (Trazabilidad Financiera Histórica):**
  * **Línea de defensa 1 (Nivel Estructural):** La entidad `ReservaGuia` congelará los valores definitivos (`peso_cobrable_kg`, `costo_flete`, `costo_total`) al momento de la emisión mediante `congelarTarifaHistorica()`.
  * **Línea de defensa 2 (Nivel Tarifario):** Las modificaciones futuras en los rangos de `TarifaEscala` o la actualización de un `Tarifario` por parte de las aerolíneas utilizan rangos de vigencia estricta (`vigencia_desde`, `vigencia_hasta`), manteniendo intactos los datos de las guías ya emitidas.
