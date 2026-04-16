import { Node } from "./Node";

export class Tree {
  constructor() {
    this.root = new Node("root", "carpeta", "sistema");
  }

  findNode(nombre, current = this.root) {
    if (current.nombre === nombre) return current;

    if (current.children) {
      for (let child of current.children) {
        const found = this.findNode(nombre, child);
        if (found) return found;
      }
    }

    return null;
  }

  insert(nombrePadre, nodo) {
    const parent = this.findNode(nombrePadre);

    if (!parent) {
      alert("Carpeta padre no encontrada");
      return;
    }

    parent.addChild(nodo);
  }
}