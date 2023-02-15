import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  IAction,
  DESAFIOS,
  MIRAR_FRENTE,
} from '../action/types';
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

export {
  DesafioMirarIquierda,
  DesafioGuiñoDerecha,
  DesafioGuiñoIzquierda,
  DesafioSonreir,
  DesafioMirarFrente,
  DesafioMirarDerecha,
  DesafiosAction,
};
