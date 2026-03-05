import { NodoAlquiler } from "./NodoAlquiler"
import { Alquiler } from "../modelos/Alquiler"

export class ListaDobleHistorial {
  cabeza: NodoAlquiler | null = null
  cola: NodoAlquiler | null = null

  estaVacia(): boolean {
    return this.cabeza === null
  }

  agregar(alquiler: Alquiler): void {
    const nuevo = new NodoAlquiler(alquiler)

    if (this.estaVacia()) {
      this.cabeza = nuevo
      this.cola = nuevo
      return
    }

    this.cola!.siguiente = nuevo
    nuevo.anterior = this.cola
    this.cola = nuevo
  }

  recorrer(): Alquiler[] {
    const lista: Alquiler[] = []
    let actual = this.cabeza

    while (actual) {
      lista.push(actual.alquiler)
      actual = actual.siguiente
    }

    return lista
  }
}