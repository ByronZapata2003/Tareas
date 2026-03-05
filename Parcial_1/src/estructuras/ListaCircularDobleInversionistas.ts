import { NodoInversionista } from "./NodoInversionista"
import { Inversionista } from "../modelos/Inversionista"

export class ListaCircularDobleInversionistas {
  cabeza: NodoInversionista | null = null

  estaVacia(): boolean {
    return this.cabeza === null
  }

  agregar(inversionista: Inversionista): void {
    const nuevo = new NodoInversionista(inversionista)

    if (this.estaVacia()) {
      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      nuevo.anterior = nuevo
      return
    }

    const ultimo = this.cabeza!.anterior!

    ultimo.siguiente = nuevo
    nuevo.anterior = ultimo

    nuevo.siguiente = this.cabeza
    this.cabeza!.anterior = nuevo
  }
}