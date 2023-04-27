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
  FLAG_INDICADOR,
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
  textoDesafioIzq: string;
  textoDesafioDer: string;
  textoDesafioFrente: string;
  textoAcercarse: string;
  textoAlejarse: string;
  textoCentrarse: string;
  textoRealizarDesafio: string;
  textoDentroDelRango: string;
  modal: boolean;
  valueError: string[];
  flagIndicador: boolean;
}

const initialState = {
  mirarIzquierda: {max: 335, min: 320},
  mirarDerecha: {max: 40, min: 25},
  mirarFrente: {max: 8, min: 352},
  guiñoIzquierdo: {max: 0.5, min: 0},
  guiñoDerecho: {max: 0.5, min: 0},
  sonreir: {max: 1, min: 0.7},
  value: ['Mirar Frente', 'Mirar Izquierda', 'Mirar Derecha'],
  frontSelected: true,
  tiempoCaptura: 2,
  intervaloFrame: 25,
  tiempoArranque: 1,
  textoDesafioIzq: 'Mirar hacia la izquierda',
  textoDesafioDer: 'Mirar hacia la derecha',
  textoDesafioFrente: 'Mirar hacia el frente',
  textoAcercarse: 'Acérquese al celular',
  textoAlejarse: 'Aléjese del celular',
  textoCentrarse: 'Ubíquese en la centro',
  textoRealizarDesafio: 'Realice el desafio',
  textoDentroDelRango: 'No te muevas...',
  modal: false,
  valueError: [],
  flagIndicador: false,
};

export function DesafiosReducer(
  state = initialState,
  action: IAction,
): IDesafiosReducer {
  switch (action.type) {
    case FLAG_INDICADOR:
      return {
        ...state,
        flagIndicador: action.payload,
      };
    case TEXTO_MIRAR_IZQUIERDA:
      return {
        ...state,
        textoDesafioIzq: action.payload,
      };
    case DESAFIOS_ERROR:
      return {
        ...state,
        valueError: action.payload,
      };
    case MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case TEXTO_MIRAR_DERECHA:
      return {
        ...state,
        textoDesafioDer: action.payload,
      };
    case TEXTO_MIRAR_FRENTE:
      return {
        ...state,
        textoDesafioFrente: action.payload,
      };
    case ALEJAR:
      return {
        ...state,
        textoAlejarse: action.payload,
      };
    case ACERCAR:
      return {
        ...state,
        textoAcercarse: action.payload,
      };
    case CENTRAR:
      return {
        ...state,
        textoCentrarse: action.payload,
      };
    case REALIZAR_DESAFIO:
      return {
        ...state,
        textoRealizarDesafio: action.payload,
      };
    case DENTRO_DE_RANGO:
      return {
        ...state,
        textoDentroDelRango: action.payload,
      };
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
