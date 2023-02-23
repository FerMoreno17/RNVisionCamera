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
} from '../action/types';
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

const SwitchCamaraAction = (value: boolean): IAction => ({
  type: SWITCH_CAMARA,
  payload: value,
});
export {
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
};
