import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  IAction,
  DESAFIOS,
  MIRAR_FRENTE,
  SWITCH_CAMARA,
  TIEMPO_CAPTURA,
  INTERVALO_FRAME,
  TIEMPO_ARRANQUE,
  TEXTO_MIRAR_IZQUIERDA,
  TEXTO_MIRAR_DERECHA,
  TEXTO_MIRAR_FRENTE,
  ALEJAR,
  ACERCAR,
  CENTRAR,
  REALIZAR_DESAFIO,
  DENTRO_DE_RANGO,
  MODAL,
  DESAFIOS_ERROR,
} from '../action/types';

const TextoMirarIzq = (value: string): IAction => ({
  type: TEXTO_MIRAR_IZQUIERDA,
  payload: value,
});
const TextoMirarDer = (value: string): IAction => ({
  type: TEXTO_MIRAR_DERECHA,
  payload: value,
});
const TextoMirarFrente = (value: string): IAction => ({
  type: TEXTO_MIRAR_FRENTE,
  payload: value,
});
const TextoAlejar = (value: string): IAction => ({
  type: ALEJAR,
  payload: value,
});
const ModalS = (value: boolean): IAction => ({
  type: MODAL,
  payload: value,
});
const TextoMAcercar = (value: string): IAction => ({
  type: ACERCAR,
  payload: value,
});
const TextoCentrar = (value: string): IAction => ({
  type: CENTRAR,
  payload: value,
});
const TextoRealizarDesa = (value: string): IAction => ({
  type: REALIZAR_DESAFIO,
  payload: value,
});
const TextoMDentroDelRango = (value: string): IAction => ({
  type: DENTRO_DE_RANGO,
  payload: value,
});

const TiempoCaptura = (value: number): IAction => ({
  type: TIEMPO_CAPTURA,
  payload: value,
});
const IntervaloFrame = (value: number): IAction => ({
  type: INTERVALO_FRAME,
  payload: value,
});
const TiempoArranque = (value: number): IAction => ({
  type: TIEMPO_ARRANQUE,
  payload: value,
});
const DesafioMirarIquierda = (value: {max: number; min: number}): IAction => ({
  type: MIRAR_IZQUIERDA,
  payload: value,
});
const DesafioMirarDerecha = (value: {max: number; min: number}): IAction => ({
  type: MIRAR_DERECHA,
  payload: value,
});
const DesafioMirarFrente = (value: {max: number; min: number}): IAction => ({
  type: MIRAR_FRENTE,
  payload: value,
});
const DesafioSonreir = (value: {max: number; min: number}): IAction => ({
  type: SONREIR,
  payload: value,
});
const DesafioGuiñoIzquierda = (value: {max: number; min: number}): IAction => ({
  type: GUIÑO_IZQUIERDA,
  payload: value,
});
const DesafioGuiñoDerecha = (value: {max: number; min: number}): IAction => ({
  type: GUIÑO_DERECHA,
  payload: value,
});
const DesafiosAction = (value: string[]): IAction => ({
  type: DESAFIOS,
  payload: value,
});
const DesafiosActionError = (value: string[]): IAction => ({
  type: DESAFIOS_ERROR,
  payload: value,
});
const SwitchCamaraAction = (value: boolean): IAction => ({
  type: SWITCH_CAMARA,
  payload: value,
});
export {
  DesafiosActionError,
  DesafioMirarIquierda,
  DesafioGuiñoDerecha,
  DesafioGuiñoIzquierda,
  DesafioSonreir,
  DesafioMirarFrente,
  DesafioMirarDerecha,
  DesafiosAction,
  SwitchCamaraAction,
  TiempoCaptura,
  IntervaloFrame,
  TiempoArranque,
  TextoMirarIzq,
  TextoMirarDer,
  TextoMirarFrente,
  TextoAlejar,
  TextoMAcercar,
  TextoCentrar,
  TextoRealizarDesa,
  TextoMDentroDelRango,
  ModalS,
};
