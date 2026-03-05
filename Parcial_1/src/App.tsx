import { useEffect, useState } from "react"
import { SistemaMovilidad } from "./SistemaMovilidad"
import { Vehiculo } from "./modelos/Vehiculo"
import { Alquiler } from "./modelos/Alquiler"
import "./App.css"

const sistema = new SistemaMovilidad()

function App() {
  const [disponibles, setDisponibles] = useState<Vehiculo[]>([])
  const [historial, setHistorial] = useState<Alquiler[]>([])
  const [destacado, setDestacado] = useState<Vehiculo | null>(null)

  useEffect(() => {
    sistema.disponibles.agregar(new Vehiculo(1, "Toyota", "Yaris", 150.000))
    sistema.disponibles.agregar(new Vehiculo(2, "Kia", "Rio", 130.000))
    sistema.disponibles.agregar(new Vehiculo(3, "Mazda", "3", 160.000))
    sistema.disponibles.agregar(new Vehiculo(4, "Honda", "Civic", 180.000))
    sistema.disponibles.agregar(new Vehiculo(5, "Nissan", "Sentra", 130.000))

    setDisponibles(sistema.disponibles.recorrer())
    setDestacado(sistema.destacados.obtenerActual())
  }, [])

  const alquilar = (id: number) => {
    sistema.alquilarVehiculo(id)
    setDisponibles(sistema.disponibles.recorrer())
    setHistorial(sistema.historial.recorrer())
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      sistema.destacados.avanzar()
      setDestacado(sistema.destacados.obtenerActual())
    }, 5000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div>
      <h1>Vehículos Disponibles</h1>
      {disponibles.map(v => (
        <div key={v.id}>
          {v.marca} {v.modelo}
          <button onClick={() => alquilar(v.id)}>Alquilar</button>
        </div>
      ))}

      <h1>Historial</h1>
      {historial.map((h, i) => (
        <div key={i}>
          {h.vehiculo.marca} - {h.fecha.toString()}
        </div>
      ))}

      <h1>Vehículo Destacado</h1>
      {destacado && (
        <div>
          {destacado.marca} {destacado.modelo}
        </div>
      )}
    </div>
  )
}

export default App