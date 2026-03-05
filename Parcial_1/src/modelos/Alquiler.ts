import { Vehiculo } from "./Vehiculo"

export class Alquiler {
  vehiculo: Vehiculo
  fecha: Date

  constructor(vehiculo: Vehiculo) {
    this.vehiculo = vehiculo
    this.fecha = new Date()
  }
}