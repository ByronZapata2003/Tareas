import type { TreeNode } from "../structures/NaryTree";

interface Props {
  node: TreeNode;
  onSelect: (link: string) => void;
  selected: string;
}

function SidebarNode({ node, onSelect, selected }: Props) {
  return (
    <div>
      <div
        onClick={() => onSelect(node.data.link)}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: selected === node.data.link ? "#3498db" : "transparent",
          color: selected === node.data.link ? "white" : "#ccc",
          borderRadius: "4px",
          marginBottom: "4px",
        }}
      >
        {node.data.title}
      </div>

      {node.children.length > 0 && (
        <div style={{ paddingLeft: "16px" }}>
          {node.children.map((child, index) => (
            <SidebarNode
              key={index}
              node={child}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  tree: TreeNode | null;
  onSelect: (link: string) => void;
  selected: string;
}

export default function Sidebar({ tree, onSelect, selected }: SidebarProps) {
  if (!tree) return null;

  return (
    <div style={sidebarStyle}>
      <h3 style={{ color: "white", marginBottom: "20px", fontSize: "16px" }}>
        Menu
      </h3>
      <SidebarNode node={tree} onSelect={onSelect} selected={selected} />
    </div>
  );
}

const sidebarStyle: React.CSSProperties = {
  width: "220px",
  minHeight: "100vh",
  backgroundColor: "#2c3e50",
  padding: "20px 12px",
};