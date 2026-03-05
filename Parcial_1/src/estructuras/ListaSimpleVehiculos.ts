import { NodoVehiculo } from "./NodoVehiculo"
import { Vehiculo } from "../modelos/Vehiculo"

export class ListaSimpleVehiculos {
  cabeza: NodoVehiculo | null = null

  estaVacia(): boolean {
    return this.cabeza === null
  }

  agregar(vehiculo: Vehiculo): void {
    const nuevo = new NodoVehiculo(vehiculo)

    if (this.estaVacia()) {
      this.cabeza = nuevo
      return
    }

    let actual: NodoVehiculo = this.cabeza!

    while (actual.siguiente !== null) {
      actual = actual.siguiente
    }

    actual.siguiente = nuevo
  }

  buscar(id: number): Vehiculo | null {
    let actual = this.cabeza

    while (actual !== null) {
      if (actual.vehiculo.id === id) {
        return actual.vehiculo
      }
      actual = actual.siguiente
    }

    return null
  }

  eliminar(id: number): Vehiculo | null {
    if (this.cabeza === null) return null

    if (this.cabeza.vehiculo.id === id) {
      const eliminado = this.cabeza
      this.cabeza = this.cabeza.siguiente
      return eliminado.vehiculo
    }

    let actual: NodoVehiculo = this.cabeza

    while (
      actual.siguiente !== null &&
      actual.siguiente.vehiculo.id !== id
    ) {
      actual = actual.siguiente
    }

    if (actual.siguiente !== null) {
      const eliminado = actual.siguiente
      actual.siguiente = eliminado.siguiente
      return eliminado.vehiculo
    }

    return null
  }

  recorrer(): Vehiculo[] {
    const lista: Vehiculo[] = []
    let actual = this.cabeza

    while (actual) {
      lista.push(actual.vehiculo)
      actual = actual.siguiente
    }

    return lista
  }
}