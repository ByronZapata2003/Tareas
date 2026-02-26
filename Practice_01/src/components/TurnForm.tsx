import { useState } from "react";

interface Props {
  addTurn: (turn: string) => void;
}

function TurnForm({ addTurn }: Props) {
  const [turn, setTurn] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!turn.trim()) return;

    addTurn(turn);
    setTurn("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new turn"
        value={turn}
        onChange={(e) => setTurn(e.target.value)}
      />
      <button type="submit">Add Turn</button>
    </form>
  );
}

export default TurnForm;