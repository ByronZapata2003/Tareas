export interface MenuItem {
  title: string;
  link: string;
  component: string;
}

export class TreeNode {
  data: MenuItem;
  children: TreeNode[];

  constructor(data: MenuItem) {
    this.data = data;
    this.children = [];
  }

  addChild(child: TreeNode): void {
    this.children.push(child);
  }
}

export class NaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  setRoot(node: TreeNode): void {
    this.root = node;
  }

  // DFS - Depth First Search
  dfs(node: TreeNode | null = this.root): void {
    if (node === null) return;
    console.log(node.data.title);
    node.children.forEach((child) => this.dfs(child));
  }

  // BFS - Breadth First Search
  bfs(): void {
    if (this.root === null) return;
    const queue: TreeNode[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      console.log(current.data.title);
      current.children.forEach((child) => queue.push(child));
    }
  }
}