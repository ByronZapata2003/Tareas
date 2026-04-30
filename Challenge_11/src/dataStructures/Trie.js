// ─────────────────────────────────────────────
//  TRIE NODE
// ─────────────────────────────────────────────
export class TrieNode {
  constructor() {
    this.children = {};       // mapa: char → TrieNode
    this.isEndOfWord = false; // true si aquí termina un producto
    this.product = null;      // { name, popularity }
  }
}

// ─────────────────────────────────────────────
//  TRIE
// ─────────────────────────────────────────────
export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Recorre la palabra carácter por carácter.
   * Crea nodos donde no existan.
   * Marca isEndOfWord = true y guarda el producto al final.
   */
  insert(name, popularity) {
    let current = this.root;

    for (const char of name.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    current.isEndOfWord = true;
    current.product = { name, popularity };
  }

  /**
   * Navega hasta el nodo del último carácter del prefijo.
   * Desde ahí hace DFS para recolectar todos los productos.
   * Retorna [] si el prefijo no existe en el Trie.
   */
  searchByPrefix(prefix) {
    let current = this.root;

    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }

    const results = [];
    this._collectAll(current, results);
    return results;
  }

  // DFS recursivo: acumula todos los productos del subárbol
  _collectAll(node, results) {
    if (node.isEndOfWord) {
      results.push(node.product);
    }
    for (const child of Object.values(node.children)) {
      this._collectAll(child, results);
    }
  }
}