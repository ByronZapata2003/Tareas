function TreeView({ node }) {
  return (
    <ul>
      <li>
        {node.tipo === "carpeta" ? "📁" : "📄"} 
        {node.nombre} - {node.creador}
      </li>

      {node.children &&
        node.children.map((child, index) => (
          <TreeView key={index} node={child} />
        ))}
    </ul>
  );
}

export default TreeView;