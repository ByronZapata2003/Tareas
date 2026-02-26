export class CircularNode<T> {
  value: T;
  next: CircularNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class CircularLinkedList<T> {
  private head: CircularNode<T> | null = null;
  private current: CircularNode<T> | null = null;

  add(value: T): void {
    const newNode = new CircularNode(value);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode; // circular reference
      this.current = newNode;
      return;
    }

    let temp = this.head;
    while (temp.next !== this.head) {
      temp = temp.next!;
    }

    temp.next = newNode;
    newNode.next = this.head;
  }

  next(): T | null {
    if (!this.current) return null;

    this.current = this.current.next;
    return this.current?.value ?? null;
  }

  getCurrent(): T | null {
    return this.current ? this.current.value : null;
  }
}