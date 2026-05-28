// ============================================================
//  MaxHeap.js — Ranking de canciones más populares
//  Estructura de datos: Montículo Máximo (Max-Heap)
// ============================================================

class MaxHeap {
  constructor() {
    // Cada elemento: { titulo, reproducciones }
    this.heap = [];
  }

  // ── Utilidades de índices ──────────────────────────────────
  _padre(i)       { return Math.floor((i - 1) / 2); }
  _hijoIzq(i)    { return 2 * i + 1; }
  _hijoDer(i)    { return 2 * i + 2; }

  _intercambiar(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Inserta una canción con sus reproducciones.
   * Complejidad: O(log n)
   * @param {string} titulo
   * @param {number} reproducciones
   */
  insertar(titulo, reproducciones) {
    this.heap.push({ titulo, reproducciones });
    this._bubbleUp(this.heap.length - 1);
  }

  /**
   * Extrae la canción con más reproducciones (la raíz).
   * Complejidad: O(log n)
   * @returns {{ titulo: string, reproducciones: number } | null}
   */
  extraerMaximo() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const maximo = this.heap[0];
    this.heap[0] = this.heap.pop();   // Mover el último a la raíz
    this._sinkDown(0);
    return maximo;
  }

  /**
   * Retorna las Top-N canciones sin modificar el heap.
   * Complejidad: O(n log n)
   * @param {number} n
   * @returns {Array}
   */
  obtenerTop(n) {
    // Copia profunda para no alterar el heap original
    const copia = new MaxHeap();
    copia.heap = this.heap.map(e => ({ ...e }));
    const resultado = [];

    for (let i = 0; i < n && copia.heap.length > 0; i++) {
      resultado.push(copia.extraerMaximo());
    }
    return resultado;
  }

  /**
   * Sube el nodo en posición i hasta su lugar correcto.
   * @param {number} i
   */
  _bubbleUp(i) {
    while (i > 0) {
      const p = this._padre(i);
      if (this.heap[p].reproducciones < this.heap[i].reproducciones) {
        this._intercambiar(p, i);
        i = p;
      } else break;
    }
  }

  /**
   * Baja el nodo en posición i hasta su lugar correcto.
   * @param {number} i
   */
  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let mayor = i;
      const izq = this._hijoIzq(i);
      const der = this._hijoDer(i);

      if (izq < n && this.heap[izq].reproducciones > this.heap[mayor].reproducciones)
        mayor = izq;
      if (der < n && this.heap[der].reproducciones > this.heap[mayor].reproducciones)
        mayor = der;

      if (mayor !== i) {
        this._intercambiar(i, mayor);
        i = mayor;
      } else break;
    }
  }

  /** Retorna el tamaño actual del heap */
  tamaño() { return this.heap.length; }

  /** Pico sin extraer */
  verMaximo() { return this.heap[0] ?? null; }
}

if (typeof module !== "undefined") module.exports = MaxHeap;
