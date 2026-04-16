import { useState, useEffect } from "react";
import Login from "./components/Login";
import CrearNodo from "./components/CrearNodo";
import TreeView from "./components/TreeView";
import { Tree } from "./models/Tree";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tree, setTree] = useState(new Tree());
  const [refresh, setRefresh] = useState(false);

  const cargarArbol = async () => {
    try {
      const ref = doc(db, "arboles", "principal");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = JSON.parse(snap.data().data);
        setTree(Object.assign(new Tree(), data));
      }
    } catch (error) {
      console.error("Error cargando árbol:", error);
    }
  };

  useEffect(() => {
    cargarArbol();
  }, [refresh]);

  return (
    <div className="app">
      <h1>Gestor de Archivos</h1>

      {!user && <Login setUser={setUser} />}

      {user && (
        <>
          <div className="user-box">
            <strong>Usuario:</strong> {user}
          </div>

          <CrearNodo
            user={user}
            tree={tree}
            refresh={() => setRefresh(!refresh)}
          />

          <TreeView node={tree.root} />
        </>
      )}
    </div>
  );
}

export default App;