import {
  GUIÑO_DERECHA,
  GUIÑO_IZQUIERDA,
  MIRAR_DERECHA,
  MIRAR_IZQUIERDA,
  SONREIR,
  DESAFIOS,
  IAction,
  MIRAR_FRENTE,
  SWITCH_CAMARA,
  TIEMPO_CAPTURA,
  TIEMPO_ARRANQUE,
  INTERVALO_FRAME,
} from '../action/types';
export interface IDesafiosReducer {
  mirarFrente: {max: number; min: number};
  mirarDerecha: {max: number; min: number};
  mirarIzquierda: {max: number; min: number};
  sonreir: {max: number; min: number};
  guiñoIzquierdo: {max: number; min: number};
  guiñoDerecho: {max: number; min: number};
  value: string[];
  frontSelected: boolean;
  tiempoCaptura: number;
  intervaloFrame: number;
  tiempoArranque: number;
}

const initialState = {
  mirarIzquierda: {max: 335, min: 320},
  mirarDerecha: {max: 40, min: 25},
  mirarFrente: {max: 8, min: 352},
  guiñoIzquierdo: {max: 0.5, min: 0},
  guiñoDerecho: {max: 0.5, min: 0},
  sonreir: {max: 1, min: 0.7},
  value: ['Mirar Izquierda'],
  frontSelected: true,
  tiempoCaptura: 3,
  intervaloFrame: 25,
  tiempoArranque: 3,
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
    case TIEMPO_CAPTURA:
      return {
        ...state,
        tiempoCaptura: action.payload,
      };
    case TIEMPO_ARRANQUE:
      return {
        ...state,
        tiempoArranque: action.payload,
      };
    case INTERVALO_FRAME:
      return {
        ...state,
        intervaloFrame: action.payload,
      };
    case SWITCH_CAMARA:
      return {
        ...state,
        frontSelected: action.payload,
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
