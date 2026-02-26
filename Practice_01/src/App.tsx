import { useEffect, useRef, useState } from "react";
import { CircularLinkedList } from "./data-structures/CircularLinkedList";
import TurnForm from "./components/TurnForm";
import TurnDisplay from "./components/TurnDisplay";

function App() {
  const listRef = useRef(new CircularLinkedList<string>());
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);

  const addTurn = (turn: string) => {
    listRef.current.add(turn);

    // If it's the first turn added
    if (!currentTurn) {
      setCurrentTurn(listRef.current.getCurrent());
    }
  };

  const nextTurn = () => {
    const next = listRef.current.next();
    if (next) {
      setCurrentTurn(next);
    }
  };

  // Requirement: useEffect when current turn changes
  useEffect(() => {
    if (currentTurn) {
      alert(`Now serving: ${currentTurn}`);
    }
  }, [currentTurn]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🏦 Turner System (Circular List)</h1>

      <TurnForm addTurn={addTurn} />
      <hr />
      <TurnDisplay currentTurn={currentTurn} nextTurn={nextTurn} />
    </div>
  );
}

export default App;