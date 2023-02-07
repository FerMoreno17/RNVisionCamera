export interface IAction {
  type: string;
  [key: string]: any;
}

export const MIRAR_ARRIBA = 'MIRAR_ARRIBA';
export const MIRAR_ABAJO = 'MIRAR_ABAJO';
export const MIRAR_DERECHA = 'MIRAR_DERECHA';
export const MIRAR_IZQUIERDA = 'MIRAR_IZQUIERDA';
export const SONREIR = 'SONREIR';
export const GUIÑO_DERECHA = 'GUIÑO_DERECHA';
export const GUIÑO_IZQUIERDA = 'GUIÑO_IZQUIERDA';
export const DESAFIOS = 'DESAFIOS';
