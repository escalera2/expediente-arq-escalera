import { GeneradorSecuenciaAWB } from "./GeneradorSecuenciaAWB";

const generador1 = GeneradorSecuenciaAWB.getInstance();
const awb1 = generador1.generarSiguienteAWB("999");
console.log(awb1);

const generador2 = GeneradorSecuenciaAWB.getInstance();
const awb2 = generador2.generarSiguienteAWB("999");
console.log(awb2);

console.log(generador1 === generador2);
//resultado esperado
//999-10000001
//999-10000002
//true
