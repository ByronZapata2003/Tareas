import { createContext, useContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../hooks/useTasks";
import { useAuth } from "./AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore"; // Agrega estos imports
import { db } from "../firebase/config"; // Asume que config.ts exporta db

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, title: string) => Promise<void>;
  toggleDone: (id: string, done: boolean) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { add, update, remove } = useTasks(); // Remueve getAll, ya no se usa
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to tasks:", error);
      setLoading(false);
    });

    return unsubscribe; // Limpia el listener al desmontar o cambiar usuario
  }, [user]);

  const addTask = async (title: string) => {
    if (!user) return;
    const tempId = `temp-${Date.now()}`;
    const newTask: Task = { id: tempId, title, done: false, userId: user.uid };
    
    setTasks(prev => [...prev, newTask]); // Optimista
    
    try {
      await add({ title, done: false, userId: user.uid });
      // El listener actualizará automáticamente con el ID real
    } catch (error) {
      setTasks(prev => prev.filter(t => t.id !== tempId));
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTask = async (id: string, title: string) => {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;
    
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t)); // Optimista
    
    try {
      await update(id, { title });
    } catch (error) {
      setTasks(prev => prev.map(t => t.id === id ? originalTask : t));
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const toggleDone = async (id: string, done: boolean) => {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;
    
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t)); // Optimista
    
    try {
      await update(id, { done });
    } catch (error) {
      setTasks(prev => prev.map(t => t.id === id ? originalTask : t));
      console.error("Error toggling task:", error);
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    const taskToRemove = tasks.find(t => t.id === id);
    if (!taskToRemove) return;
    
    setTasks(prev => prev.filter(t => t.id !== id)); // Optimista
    
    try {
      await remove(id);
    } catch (error) {
      setTasks(prev => [...prev, taskToRemove]);
      console.error("Error removing task:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, toggleDone, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used inside TaskProvider");
  return context;
}