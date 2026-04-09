import { useState } from "react";
import Tree from "react-d3-tree";
import { BinaryTree } from "../structures/BinaryTree";

const tree = new BinaryTree();
const initialNumbers = [10, 5, 15, 3, 7, 12, 20];
initialNumbers.forEach((n) => tree.insert(n));

export default function BinaryTreeScreen() {
  const [treeData, setTreeData] = useState(tree.toD3Format());
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleInsert = () => {
    const num = Number(inputValue);
    if (isNaN(num) || inputValue === "") {
      alert("Enter a valid number");
      return;
    }
    tree.insert(num);
    setTreeData(tree.toD3Format());
    setInputValue("");
  };

  const handleSearch = () => {
    const num = Number(searchValue);
    if (isNaN(num) || searchValue === "") {
      alert("Enter a valid number");
      return;
    }
    const found = tree.contains(num);
    setSearchResult(
      found ? `✓ ${num} is in the tree` : `✗ ${num} is not in the tree`
    );
  };

  const handlePreOrder = () => {
    console.log("--- PreOrder (N-L-R) ---");
    tree.preOrder();
  };

  const handleInOrder = () => {
    console.log("--- InOrder (L-N-R) ---");
    tree.inOrder();
  };

  const handlePostOrder = () => {
    console.log("--- PostOrder (L-R-N) ---");
    tree.postOrder();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Challenge 08 - Binary Tree</h1>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Initial values inserted: {initialNumbers.join(", ")}
      </p>

      {/* Insert */}
      <div style={cardStyle}>
        <h3>Insert a number</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="number"
            placeholder="Enter a number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            style={inputStyle}
          />
          <button onClick={handleInsert} style={btnStyle}>
            Insert
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={cardStyle}>
        <h3>Search a value</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="number"
            placeholder="Enter a number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={inputStyle}
          />
          <button onClick={handleSearch} style={btnStyle}>
            Search
          </button>
        </div>
        {searchResult && (
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            {searchResult}
          </p>
        )}
      </div>

      {/* Traversals — print by console */}
      <div style={cardStyle}>
        <h3>Print traversals — open console F12</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={handlePreOrder} style={btnStyle}>
            PreOrder
          </button>
          <button onClick={handleInOrder} style={btnStyle}>
            InOrder
          </button>
          <button onClick={handlePostOrder} style={btnStyle}>
            PostOrder
          </button>
        </div>
      </div>

      {/* react-d3-tree */}
      <div style={cardStyle}>
        <h3>Tree visualization — react-d3-tree</h3>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          You can also verify the structure at visualgo.net/en/bst
        </p>
        <div style={{ width: "100%", height: "500px" }}>
          {treeData && (
            <Tree
              data={treeData}
              orientation="vertical"
              translate={{ x: 400, y: 60 }}
              collapsible={false}
              pathFunc="straight"
            />
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "16px",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
  width: "200px",
};

const btnStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};