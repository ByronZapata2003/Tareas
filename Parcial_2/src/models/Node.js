export class Node {
  constructor(nombre, tipo, creador) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.creador = creador;
    this.children = tipo === "carpeta" ? [] : null;
  }

  addChild(node) {
    if (this.tipo === "archivo") {
      alert("Un archivo no puede tener hijos");
      return;
    }
    this.children.push(node);
  }
}