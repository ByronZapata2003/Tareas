// ============================================================
//  Graph.js — Recomendación de canciones relacionadas
//  Estructura de datos: Grafo No Dirigido (lista de adyacencia)
// ============================================================

class Graph {
  constructor() {
    // Map<string, Set<string>> — cada canción apunta a sus vecinos
    this.adyacencia = new Map();
  }

  /**
   * Agrega un nodo (canción) al grafo si no existe.
   * @param {string} cancion
   */
  agregarCancion(cancion) {
    if (!this.adyacencia.has(cancion)) {
      this.adyacencia.set(cancion, new Set());
    }
  }

  /**
   * Conecta dos canciones con una arista bidireccional.
   * Complejidad: O(1)
   * @param {string} cancion1
   * @param {string} cancion2
   */
  conectar(cancion1, cancion2) {
    this.agregarCancion(cancion1);
    this.agregarCancion(cancion2);
    this.adyacencia.get(cancion1).add(cancion2);
    this.adyacencia.get(cancion2).add(cancion1); // No dirigido
  }

  /**
   * Retorna las canciones directamente relacionadas (vecinos).
   * Complejidad: O(1)
   * @param {string} cancion
   * @returns {string[]}
   */
  obtenerRelacionadas(cancion) {
    if (!this.adyacencia.has(cancion)) return [];
    return Array.from(this.adyacencia.get(cancion));
  }

  /**
   * BFS — Recomendaciones hasta cierta profundidad (niveles de similitud).
   * Complejidad: O(V + E)
   * @param {string} inicio  - Canción de origen
   * @param {number} niveles - Profundidad de búsqueda
   * @returns {string[]}     - Canciones alcanzadas (sin la canción de inicio)
   */
  recomendarBFS(inicio, niveles = 2) {
    if (!this.adyacencia.has(inicio)) return [];

    const visitados = new Set([inicio]);
    const cola = [{ cancion: inicio, nivel: 0 }];
    const recomendaciones = [];

    while (cola.length > 0) {
      const { cancion, nivel } = cola.shift();
      if (nivel >= niveles) continue;

      for (const vecino of this.adyacencia.get(cancion)) {
        if (!visitados.has(vecino)) {
          visitados.add(vecino);
          recomendaciones.push(vecino);
          cola.push({ cancion: vecino, nivel: nivel + 1 });
        }
      }
    }
    return recomendaciones;
  }

  /**
   * Devuelve todos los nodos y aristas del grafo (para visualización).
   * @returns {{ nodos: string[], aristas: [string, string][] }}
   */
  obtenerEstructura() {
    const nodos = Array.from(this.adyacencia.keys());
    const aristas = [];
    const vistas = new Set();

    for (const [nodo, vecinos] of this.adyacencia.entries()) {
      for (const vecino of vecinos) {
        const clave = [nodo, vecino].sort().join("--");
        if (!vistas.has(clave)) {
          vistas.add(clave);
          aristas.push([nodo, vecino]);
        }
      }
    }
    return { nodos, aristas };
  }

  /** Verifica si existe conexión directa entre dos canciones */
  estanConectadas(c1, c2) {
    return this.adyacencia.has(c1) && this.adyacencia.get(c1).has(c2);
  }
}

if (typeof module !== "undefined") module.exports = Graph;
