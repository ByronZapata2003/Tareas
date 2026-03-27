import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import Navbar from "../components/Navbar";
import { Container, Form, Button, ListGroup, Badge, Spinner } from "react-bootstrap";
import "../styles/main.scss";

export default function TasksScreen() {
  const { tasks, loading, addTask, updateTask, toggleDone, removeTask } = useTaskContext();
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTask(newTitle.trim());
    setNewTitle("");
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingTitle.trim()) return;
    await updateTask(id, editingTitle.trim());
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <>
      <Navbar />
      <Container className="tasks-container">
        <h2 className="tasks-title">My Tasks</h2>

        <div className="tasks-form">
          <Form.Control
            placeholder="New task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button variant="dark" onClick={handleAdd}>Add</Button>
        </div>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="tasks-empty">No tasks yet. Add one above!</p>
        ) : (
          <ListGroup className="mt-3">
            {tasks.map((task) => (
              <ListGroup.Item key={task.id} className="task-item">
                {editingId === task.id ? (
                  <div className="task-edit">
                    <Form.Control
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task.id!)}
                    />
                    <Button size="sm" variant="success" onClick={() => handleSaveEdit(task.id!)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <div className="task-row">
                    <div className="task-left">
                      <Form.Check
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(task.id!, !task.done)}
                      />
                      <span className={task.done ? "task-done" : ""}>{task.title}</span>
                      {task.done && <Badge bg="success">Done</Badge>}
                    </div>
                    <div className="task-actions">
                      <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(task.id!, task.title)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => removeTask(task.id!)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
}