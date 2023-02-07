export default class Desafios {
  mirarArriba: {xp: number; xn: number; yp: number; yn: number};
  mirarAbajo: {xp: number; xn: number; yp: number; yn: number};
  mirarDerecha: {xp: number; xn: number; yp: number; yn: number};
  mirarIzquierda: {xp: number; xn: number; yp: number; yn: number};
  sonreir: {max: number; min: number};
  guiñoIzquierdo: {max: number; min: number};
  guiñoDerecho: {max: number; min: number};

  constructor(params: Desafios) {
    this.mirarArriba = params.mirarArriba;
    this.mirarAbajo = params.mirarAbajo;
    this.mirarDerecha = params.mirarDerecha;
    this.mirarIzquierda = params.mirarIzquierda;
    this.sonreir = params.sonreir;
    this.guiñoIzquierdo = params.sonreir;
    this.guiñoDerecho = params.sonreir;
  }
}
