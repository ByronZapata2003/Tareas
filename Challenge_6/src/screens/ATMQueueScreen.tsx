import React, { useState } from "react";
import { Queue } from "../structures/Queue";
import type { Person } from "../data/personData";
import { MOCK_PEOPLE } from "../data/personData";

const atmQueue = new Queue<Person>();
MOCK_PEOPLE.forEach((person) => atmQueue.enqueue(person));

export default function ATMQueueScreen() {
  const [people, setPeople] = useState<Person[]>(
    [...atmQueue.print()].sort(
      (a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime()
    )
  );
  const [name, setName] = useState("");
  const [withdrawal, setWithdrawal] = useState("");

  const refreshList = () => {
    setPeople(
      [...atmQueue.print()].sort(
        (a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime()
      )
    );
  };

  const handleAdd = () => {
    if (!name || !withdrawal) {
      alert("Please fill all fields");
      return;
    }

    const newPerson: Person = {
      name,
      withdrawal: Number(withdrawal),
      arrivalDate: new Date().toISOString(),
    };

    atmQueue.enqueue(newPerson);
    refreshList();
    setName("");
    setWithdrawal("");
  };

  const handleDequeue = () => {
    atmQueue.dequeue();
    refreshList();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Challenge 05 - ATM Queue</h1>
      <p>People in queue: {atmQueue.size()} | Empty: {atmQueue.isEmpty() ? "Yes" : "No"}</p>
      <p>Next: {atmQueue.peek()?.name ?? "Nobody"}</p>

      <div style={{ border: "1px solid #ccc", padding: "16px", margin: "20px 0", borderRadius: "8px" }}>
        <h2>Add person to queue</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Withdrawal amount"
            type="number"
            value={withdrawal}
            onChange={(e) => setWithdrawal(e.target.value)}
            style={inputStyle}
          />
          <p style={{ fontSize: "12px", color: "#888" }}>
            * Arrival date is assigned automatically by the system
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleAdd} style={btnStyle}>Enqueue</button>
            <button onClick={handleDequeue} style={{ ...btnStyle, backgroundColor: "#e74c3c" }}>
              Dequeue
            </button>
          </div>
        </div>
      </div>

      <h2>Queue (sorted by arrival date)</h2>
      {people.length === 0 ? (
        <p>The queue is empty</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Withdrawal</th>
              <th style={thStyle}>Arrival Date</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index} style={{ backgroundColor: index === 0 ? "#d4edda" : "white" }}>
                <td style={tdStyle}>{index === 0 ? "NEXT" : index + 1}</td>
                <td style={tdStyle}>{person.name}</td>
                <td style={tdStyle}>${person.withdrawal}</td>
                <td style={tdStyle}>{new Date(person.arrivalDate).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const btnStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
};