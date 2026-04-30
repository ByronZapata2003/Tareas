// ─────────────────────────────────────────────
//  MIN-HEAP
//  Heap mínimo basado en la propiedad "popularity"
//  Se usa para mantener el Top K más populares:
//  Mantenemos K elementos y expulsamos el menor
// ─────────────────────────────────────────────
export class MinHeap {
  constructor() {
    this.heap = []; // array interno que representa el árbol completo
  }

  // ── Helpers ────────────────────────────────
  size()  { return this.heap.length; }
  peek()  { return this.heap[0] || null; }    // mínimo sin extraer
  toArray() { return [...this.heap]; }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // ── Insertar ───────────────────────────────
  /**
   * Agrega el producto al final del array y lo sube
   * hasta su posición correcta (percolateUp).
   */
  push(product) {
    this.heap.push(product);
    this._percolateUp(this.heap.length - 1);
  }

  // ── Extraer mínimo ─────────────────────────
  /**
   * Intercambia la raíz con el último elemento,
   * elimina el último (era la raíz = mínimo),
   * y baja el nuevo elemento raíz (percolateDown).
   */
  pop() {
    if (this.size() === 0) return null;

    const min  = this.heap[0];
    const last = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = last;
      this._percolateDown(0);
    }

    return min;
  }

  // ── Percolate Up ───────────────────────────
  /**
   * Sube el nodo en posición i mientras sea menor
   * que su padre mantiene la propiedad de min-heap.
   */
  _percolateUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].popularity > this.heap[i].popularity) {
        this._swap(parent, i);
        i = parent;
      } else {
        break;
      }
    }
  }

  // ── Percolate Down ─────────────────────────
  /**
   * Baja el nodo en posición i mientras sea mayor
   * que alguno de sus hijos mantiene la propiedad de min-heap.
   */
  _percolateDown(i) {
    const n = this.size();

    while (true) {
      let smallest = i;
      const left   = 2 * i + 1;
      const right  = 2 * i + 2;

      if (left  < n && this.heap[left].popularity  < this.heap[smallest].popularity) smallest = left;
      if (right < n && this.heap[right].popularity < this.heap[smallest].popularity) smallest = right;

      if (smallest !== i) {
        this._swap(smallest, i);
        i = smallest;
      } else {
        break;
      }
    }
  }
}