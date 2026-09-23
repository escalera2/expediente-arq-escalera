# Detecciones SOLID — Esqueleto Comedor Universitario

1. **Single Responsibility Principle (SRP):** La clase `GestorDePedidos` va asumiendo  múltiples responsabilidades y calcula los precios que seria la logica de negocio y  guarda en la base de datos (persistencia) y imprimiria/envía notificaciones por correo y en comunicación.
2. **Open/Closed Principle (OCP):** El cálculo de tarifas usa un `switch`  basado en cadenas (`"estandar"`, `"vegetariano"`, `"beca"`). Si se añade o se modifica un tipo de menú, se debe editar la clase modificando el código existente.
3. **Dependency Inversion Principle (DIP):** `GestorDePedidos` instancia directamente las dependencias concretas (`new BaseDeDatosComedor()` y `new CorreoUniversitario()`) con `new`, acoplaria el flujo a implementaciones concretas o rigifas en lugar de abstraerlas tras interfaces.
