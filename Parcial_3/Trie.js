// ============================================================
//  Trie.js — Buscador predictivo de canciones
//  Estructura de datos: Trie (Árbol de prefijos)
// ============================================================

class TrieNode {
  constructor() {
    this.children = {};   // Mapa de caracteres -> TrieNode
    this.isEndOfWord = false; // Marca si el nodo finaliza una canción
    this.songTitle = null;    // Título completo de la canción (solo en nodos finales)
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Inserta el título de una canción en el Trie.
   * Complejidad: O(n) donde n = longitud del título
   * @param {string} titulo - Título de la canción
   */
  insertar(titulo) {
    const titleLower = titulo.toLowerCase().trim();
    let nodoActual = this.root;

    for (const char of titleLower) {
      if (!nodoActual.children[char]) {
        nodoActual.children[char] = new TrieNode();
      }
      nodoActual = nodoActual.children[char];
    }

    nodoActual.isEndOfWord = true;
    nodoActual.songTitle = titulo; // Guardamos el título original
  }

  /**
   * Busca si una canción existe exactamente en el Trie.
   * Complejidad: O(n)
   * @param {string} titulo - Título a buscar
   * @returns {boolean}
   */
  buscar(titulo) {
    const titleLower = titulo.toLowerCase().trim();
    let nodoActual = this.root;

    for (const char of titleLower) {
      if (!nodoActual.children[char]) return false;
      nodoActual = nodoActual.children[char];
    }

    return nodoActual.isEndOfWord;
  }

  /**
   * Devuelve sugerencias de canciones que comienzan con el prefijo dado.
   * Complejidad: O(p + s) donde p = largo prefijo, s = nodos del subárbol
   * @param {string} prefijo
   * @returns {string[]} Lista de títulos sugeridos
   */
  sugerencias(prefijo) {
    const prefijoLower = prefijo.toLowerCase().trim();
    let nodoActual = this.root;

    // Navegar hasta el nodo del último carácter del prefijo
    for (const char of prefijoLower) {
      if (!nodoActual.children[char]) return [];
      nodoActual = nodoActual.children[char];
    }

    // Recolectar todas las palabras desde ese nodo
    const resultados = [];
    this._recolectarPalabras(nodoActual, resultados);
    return resultados;
  }

  /**
   * DFS para recolectar todas las canciones de un subárbol.
   * @param {TrieNode} nodo
   * @param {string[]} resultados
   */
  _recolectarPalabras(nodo, resultados) {
    if (nodo.isEndOfWord) {
      resultados.push(nodo.songTitle);
    }
    for (const char in nodo.children) {
      this._recolectarPalabras(nodo.children[char], resultados);
    }
  }
}

// Exportar para uso en el navegador (sin módulos ES)
if (typeof module !== "undefined") module.exports = Trie;
