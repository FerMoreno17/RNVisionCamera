import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  DESAFIOS,
  IAction,
  MIRAR_FRENTE,
} from '../action/types';
export interface IDesafiosReducer {
  mirarFrente: {max: number; min: number};
  mirarDerecha: {max: number; min: number};
  mirarIzquierda: {max: number; min: number};
  sonreir: {max: number; min: number};
  guiñoIzquierdo: {max: number; min: number};
  guiñoDerecho: {max: number; min: number};
  value: string[];
}

const initialState = {
  mirarFrente: {max: 0, min: 0},
  mirarDerecha: {max: 0, min: 0},
  mirarIzquierda: {max: 0, min: 0},
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
    case MIRAR_FRENTE:
      return {
        ...state,
        mirarFrente: action.payload,
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
