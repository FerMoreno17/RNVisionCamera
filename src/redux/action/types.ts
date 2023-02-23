export interface IAction {
  type: string;
  [key: string]: any;
}

export const MIRAR_FRENTE = 'MIRAR_FRENTE';
export const MIRAR_DERECHA = 'MIRAR_DERECHA';
export const MIRAR_IZQUIERDA = 'MIRAR_IZQUIERDA';
export const SONREIR = 'SONREIR';
export const GUIÑO_DERECHA = 'GUIÑO_DERECHA';
export const GUIÑO_IZQUIERDA = 'GUIÑO_IZQUIERDA';
export const DESAFIOS = 'DESAFIOS';
export const SWITCH_CAMARA = 'SWITCH_CAMARA';
export const TIEMPO_CAPTURA = 'TIEMPO_CAPTURA';
export const TIEMPO_ARRANQUE = 'TIEMPO_ARRANQUE';
export const INTERVALO_FRAME = 'INTERVALO_FRAME';
