interface Props {
  currentTurn: string | null;
  nextTurn: () => void;
}

function TurnDisplay({ currentTurn, nextTurn }: Props) {
  return (
    <div>
      <h2>Current Turn:</h2>
      <h3>{currentTurn ?? "No turns available"}</h3>
      <button onClick={nextTurn}>Next Turn</button>
    </div>
  );
}

export default TurnDisplay;