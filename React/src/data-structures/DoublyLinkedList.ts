export class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private current: DoublyNode<T> | null = null;

  visit(value: T): void {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.current = newNode;
      return;
    }

    newNode.prev = this.current;

    if (this.current) {
      this.current.next = newNode;
    }

    this.current = newNode;
  }

  back(): T | null {
    if (this.current?.prev) {
      this.current = this.current.prev;
      return this.current.value;
    }
    return null;
  }

  forward(): T | null {
    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  getCurrent(): T | null {
    return this.current ? this.current.value : null;
  }
}