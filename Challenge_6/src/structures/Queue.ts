 export class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;
    return this.items.shift() || null;
  }

  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  print(): T[] {
    return this.items;
  }
}