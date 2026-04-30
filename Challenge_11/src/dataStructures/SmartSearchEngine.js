import { Trie }    from './Trie.js';
import { MinHeap } from './MinHeap.js';

// ─────────────────────────────────────────────
//  SMART SEARCH ENGINE
//  Combina Trie (búsqueda por prefijo) +
//  MinHeap (Top K por popularidad)
// ─────────────────────────────────────────────
export class SmartSearchEngine {
  constructor() {
    this.trie = new Trie();
  }

  /**
   * Guarda el producto en el Trie.
   * @param {string} name        - nombre del producto
   * @param {number} popularity  - score de popularidad
   */
  insert(name, popularity) {
    this.trie.insert(name, popularity);
  }

  /**
   * Busca todos los productos que empiezan con `prefix` (Trie),
   * luego usa un MinHeap de tamaño K para quedarse
   * solo con los K más populares.
   *
   * Lógica del Top K con MinHeap:
   *  1. Por cada candidato push al heap
   *  2. Si heap.size() > k pop() (expulsa el menos popular)
   *  3. Al final el heap tiene exactamente los K mejores
   *  4. Los extraemos en orden ascendente y luego invertimos
   *     para devolver de mayor a menor popularidad
   *
   * @param {string} prefix - prefijo a buscar
   * @param {number} k      - cantidad de resultados
   * @returns {Array}       - productos ordenados por popularidad desc
   */
  searchTopK(prefix, k) {
    const candidates = this.trie.searchByPrefix(prefix);
    const heap = new MinHeap();

    for (const product of candidates) {
      heap.push(product);
      if (heap.size() > k) {
        heap.pop(); // elimina el menos popular
      }
    }

    // Vacía el heap orden ascendente invertir = desc
    const result = [];
    while (heap.size() > 0) {
      result.unshift(heap.pop());
    }

    return result;
  }
}