import { useState } from "react";
import { Node } from "../models/Node";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function CrearNodo({ user, tree, refresh }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("carpeta");
  const [padre, setPadre] = useState("root");

  const guardarArbol = async () => {
    await setDoc(doc(db, "arboles", "principal"), {
      data: JSON.stringify(tree)
    });
  };

  const crear = async () => {
    if (!user) {
      alert("Debe iniciar sesión");
      return;
    }

    const nuevo = new Node(nombre, tipo, user);
    tree.insert(padre, nuevo);

    await guardarArbol();
    refresh();
  };

  return (
    <div className="box">
      <h3>Crear archivo / carpeta</h3>

      <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
      <input placeholder="Carpeta padre" onChange={e => setPadre(e.target.value)} />

      <select onChange={e => setTipo(e.target.value)}>
        <option value="carpeta">Carpeta</option>
        <option value="archivo">Archivo</option>
      </select>

      <button onClick={crear}>Crear</button>
    </div>
  );
}

export default CrearNodo;