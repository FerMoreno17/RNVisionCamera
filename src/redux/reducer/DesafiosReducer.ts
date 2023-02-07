import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_ABAJO,
  MIRAR_ARRIBA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  DESAFIOS,
  IAction,
} from '../action/types';
export interface IDesafiosReducer {
  mirarArriba: {xp: number; xn: number; yp: number; yn: number};
  mirarAbajo: {xp: number; xn: number; yp: number; yn: number};
  mirarDerecha: {xp: number; xn: number; yp: number; yn: number};
  mirarIzquierda: {xp: number; xn: number; yp: number; yn: number};
  sonreir: {max: number; min: number};
  guiñoIzquierdo: {max: number; min: number};
  guiñoDerecho: {max: number; min: number};
  value: string[];
}

const initialState = {
  mirarArriba: {xp: 0, xn: 0, yp: 0, yn: 0},
  mirarAbajo: {xp: 0, xn: 0, yp: 0, yn: 0},
  mirarDerecha: {xp: 0, xn: 0, yp: 0, yn: 0},
  mirarIzquierda: {xp: 0, xn: 0, yp: 0, yn: 0},
  sonreir: {max: 0, min: 0},
  guiñoIzquierdo: {max: 0, min: 0},
  guiñoDerecho: {max: 0, min: 0},
  value: ['Mirar Izquierda'],
};

export function DesafiosReducer(
  state = initialState,
  action: IAction,
): IDesafiosReducer {
  switch (action.type) {
    case DESAFIOS:
      return {
        ...state,
        value: action.payload,
      };
    case MIRAR_ARRIBA:
      return {
        ...state,
        mirarArriba: action.payload,
      };
    case MIRAR_ABAJO:
      return {
        ...state,
        mirarAbajo: action.payload,
      };
    case MIRAR_DERECHA:
      return {
        ...state,
        mirarDerecha: action.payload,
      };
    case MIRAR_IZQUIERDA:
      return {
        ...state,
        mirarIzquierda: action.payload,
      };
    case SONREIR:
      return {
        ...state,
        sonreir: action.payload,
      };
    case GUIÑO_DERECHA:
      return {
        ...state,
        guiñoDerecho: action.payload,
      };
    case GUIÑO_IZQUIERDA:
      return {
        ...state,
        guiñoIzquierdo: action.payload,
      };
    default:
      return state;
  }
}
