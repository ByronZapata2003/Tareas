import type { RawNodeDatum } from "react-d3-tree";

class Node {
  value: number;
  left: Node | null;
  right: Node | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}

export class BinaryTree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  insert(value: number): void {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return;

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // PreOrder: N - L - R
  preOrder(node: Node | null = this.root): void {
    if (node === null) return;
    console.log(node.value);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  // InOrder: L - N - R
  inOrder(node: Node | null = this.root): void {
    if (node === null) return;
    this.inOrder(node.left);
    console.log(node.value);
    this.inOrder(node.right);
  }

  // PostOrder: L - R - N
  postOrder(node: Node | null = this.root): void {
    if (node === null) return;
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.value);
  }

  contains(value: number): boolean {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  toD3Format(node: Node | null = this.root): RawNodeDatum | null {
    if (node === null) return null;

    const result: RawNodeDatum = {
      name: String(node.value),
    };

    const children: RawNodeDatum[] = [];

    if (node.left) {
      children.push(this.toD3Format(node.left) as RawNodeDatum);
    }
    if (node.right) {
      children.push(this.toD3Format(node.right) as RawNodeDatum);
    }
    if (children.length > 0) {
      result.children = children;
    }

    return result;
  }
}