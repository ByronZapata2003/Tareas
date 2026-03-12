export class Stack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | null {
        if (this.isEmpty()) return null;
        return this.items.pop() || null;
    }

    peek(): T | null {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
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