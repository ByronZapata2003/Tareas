import { Alquiler } from "../modelos/Alquiler"

export class NodoAlquiler {
  alquiler: Alquiler
  siguiente: NodoAlquiler | null
  anterior: NodoAlquiler | null

  constructor(alquiler: Alquiler) {
    this.alquiler = alquiler
    this.siguiente = null
    this.anterior = null
  }
}