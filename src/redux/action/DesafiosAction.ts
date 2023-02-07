import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_ABAJO,
  MIRAR_ARRIBA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  IAction,
  DESAFIOS,
} from '../action/types';
const DesafioMirarIquierda = (value: {
  xp: number;
  xn: number;
  yp: number;
  yn: number;
}): IAction => ({
  type: MIRAR_IZQUIERDA,
  payload: value,
});
const DesafioMirarDerecha = (value: {
  xp: number;
  xn: number;
  yp: number;
  yn: number;
}): IAction => ({
  type: MIRAR_DERECHA,
  payload: value,
});
const DesafioMirarArriba = (value: {
  xp: number;
  xn: number;
  yp: number;
  yn: number;
}): IAction => ({
  type: MIRAR_ARRIBA,
  payload: value,
});
const DesafioMirarAbajo = (value: {
  xp: number;
  xn: number;
  yp: number;
  yn: number;
}): IAction => ({
  type: MIRAR_ABAJO,
  payload: value,
});
const DesafioSonreir = (value: {
  xp: number;
  xn: number;
  yp: number;
  yn: number;
}): IAction => ({
  type: SONREIR,
  payload: value,
});
const DesafioGuiñoIzquierda = (value: string[]): IAction => ({
  type: GUIÑO_IZQUIERDA,
  payload: value,
});
const DesafioGuiñoDerecha = (value: string[]): IAction => ({
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
  DesafioMirarAbajo,
  DesafioMirarArriba,
  DesafioMirarDerecha,
  DesafiosAction,
};
