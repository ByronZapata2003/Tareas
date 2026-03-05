import { NodoVehiculo } from "./NodoVehiculo"
import { Vehiculo } from "../modelos/Vehiculo"

export class ListaCircularDestacados {
  cabeza: NodoVehiculo | null = null

  estaVacia(): boolean {
    return this.cabeza === null
  }

  agregar(vehiculo: Vehiculo): void {
    const nuevo = new NodoVehiculo(vehiculo)

    if (this.estaVacia()) {
      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      return
    }

    let actual = this.cabeza
    while (actual!.siguiente !== this.cabeza) {
      actual = actual!.siguiente
    }

    actual!.siguiente = nuevo
    nuevo.siguiente = this.cabeza
  }

  avanzar(): void {
    if (!this.estaVacia()) {
      this.cabeza = this.cabeza!.siguiente
    }
  }

  obtenerActual(): Vehiculo | null {
    if (this.estaVacia()) return null
    return this.cabeza!.vehiculo
  }
}