import { useState } from "react";
import LinkedListPage from "./pages/LinkedListPage";
import DoublyLinkedListPage from "./pages/DoublyLinkedListPage";

function App() {
  const [page, setPage] = useState<"linked" | "doubly">("linked");

  return (
    <div style={{ padding: 20 }}>
      <h1>Data Structures Project</h1>

      <button onClick={() => setPage("linked")}>
        Linked List
      </button>

      <button onClick={() => setPage("doubly")}>
        Doubly Linked List
      </button>

      <hr />

      {page === "linked" && <LinkedListPage />}
      {page === "doubly" && <DoublyLinkedListPage />}
    </div>
  );
}

export default App;