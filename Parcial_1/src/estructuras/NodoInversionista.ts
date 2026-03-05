import { Inversionista } from "../modelos/Inversionista"

export class NodoInversionista {
  inversionista: Inversionista
  siguiente: NodoInversionista | null
  anterior: NodoInversionista | null

  constructor(inversionista: Inversionista) {
    this.inversionista = inversionista
    this.siguiente = null
    this.anterior = null
  }
}