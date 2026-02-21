export class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private current: Node<T> | null = null;

  add(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.current = newNode;
      return;
    }

    let temp = this.head;
    while (temp.next) {
      temp = temp.next;
    }

    temp.next = newNode;
  }

  getCurrent(): T | null {
    return this.current ? this.current.value : null;
  }

  next(): T | null {
    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  reset(): void {
    this.current = this.head;
  }
}