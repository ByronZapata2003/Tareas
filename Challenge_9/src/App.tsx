import { useState } from "react";
import { NaryTree, TreeNode } from "./structures/NaryTree";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import "./App.css";
import type { ReactElement } from "react";

// Build the N-ary tree with menus and submenus
const tree = new NaryTree();

const root = new TreeNode({ title: "Home", link: "/home", component: "Home" });

const about = new TreeNode({ title: "About", link: "/about", component: "About" });
const contact = new TreeNode({ title: "Contact", link: "/contact", component: "Contact" });

const products = new TreeNode({ title: "Products", link: "/products", component: "Products" });
const services = new TreeNode({ title: "Services", link: "/services", component: "Services" });
const blog = new TreeNode({ title: "Blog", link: "/blog", component: "Blog" });

// Add children to root
root.addChild(about);
root.addChild(products);
root.addChild(blog);

// Add submenus
about.addChild(contact);
products.addChild(services);

tree.setRoot(root);

// Print tree by console
console.log("--- DFS ---");
tree.dfs();
console.log("--- BFS ---");
tree.bfs();

// Map links to components
const pages: Record<string, ReactElement> = {
  "/home": <Home />,
  "/about": <About />,
  "/contact": <Contact />,
  "/products": <Products />,
  "/services": <Services />,
  "/blog": <Blog />,
};

export default function App() {
  const [selected, setSelected] = useState("/home");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        tree={tree.root}
        onSelect={setSelected}
        selected={selected}
      />
      <div style={{ padding: "30px", flex: 1 }}>
        {pages[selected]}
      </div>
    </div>
  );
}