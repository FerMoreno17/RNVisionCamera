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
export const DESAFIOS_ERROR = 'DESAFIOS_ERROR';
export const SWITCH_CAMARA = 'SWITCH_CAMARA';
export const TIEMPO_CAPTURA = 'TIEMPO_CAPTURA';
export const TIEMPO_ARRANQUE = 'TIEMPO_ARRANQUE';
export const INTERVALO_FRAME = 'INTERVALO_FRAME';

export const TEXTO_MIRAR_IZQUIERDA = 'TEXTO_MIRAR_IZQUIERDA';
export const TEXTO_MIRAR_DERECHA = 'TEXTO_MIRAR_DERECHA';
export const TEXTO_MIRAR_FRENTE = 'TEXTO_MIRAR_FRENTE';
export const ALEJAR = 'ALEJAR';
export const ACERCAR = 'ACERCAR';
export const CENTRAR = 'CENTRAR';
export const REALIZAR_DESAFIO = 'REALIZAR_DESAFIO';
export const DENTRO_DE_RANGO = 'DENTRO_DE_RANGO';
export const MODAL = 'MODAL';
export const FLAG_INDICADOR = 'FLAG_INDICADOR';
