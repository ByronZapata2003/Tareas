import { Vehiculo } from "../modelos/Vehiculo"

export class NodoVehiculo {
  vehiculo: Vehiculo
  siguiente: NodoVehiculo | null

  constructor(vehiculo: Vehiculo) {
    this.vehiculo = vehiculo
    this.siguiente = null
  }
}