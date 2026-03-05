import { ListaSimpleVehiculos } from "./estructuras/ListaSimpleVehiculos"
import { ListaDobleHistorial } from "./estructuras/ListaDobleHistorial"
import { ListaCircularDestacados } from "./estructuras/ListaCircularDestacados"
import { ListaCircularDobleInversionistas } from "./estructuras/ListaCircularDobleInversionistas"
import { Vehiculo } from "./modelos/Vehiculo"
import { Alquiler } from "./modelos/Alquiler"

export class SistemaMovilidad {
  disponibles = new ListaSimpleVehiculos()
  historial = new ListaDobleHistorial()
  destacados = new ListaCircularDestacados()
  inversionistas = new ListaCircularDobleInversionistas()

  alquilarVehiculo(id: number): void {
    const vehiculo: Vehiculo | null =
      this.disponibles.eliminar(id)

    if (vehiculo) {
      const alquiler = new Alquiler(vehiculo)
      this.historial.agregar(alquiler)
    }
  }
}