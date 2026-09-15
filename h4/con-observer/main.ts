import { SeguimientoVueloSubject } from "./SeguimientoVueloSubject";
import { NotificadorCliente, SistemaAduana } from "./ObservadoresConcretos";

const vueloOB301 = new SeguimientoVueloSubject("OB-301");

const cliente = new NotificadorCliente("contacto@importadorabolivar.com");
const aduana = new SistemaAduana();

vueloOB301.suscribir(cliente);
vueloOB301.suscribir(aduana);

vueloOB301.cambiarEstado("EN_VUELO");
vueloOB301.cambiarEstado("ATERRIZADO");
