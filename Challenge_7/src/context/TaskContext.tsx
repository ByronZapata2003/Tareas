import { createContext, useContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../hooks/useTasks";
import { useAuth } from "./AuthContext";

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
  const { getAll, add, update, remove } = useTasks();
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getAll(user.uid);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (title: string) => {
    if (!user) return;
    const tempId = `temp-${Date.now()}`; // ID temporal único
    const newTask: Task = { id: tempId, title, done: false, userId: user.uid };
    
    // Actualiza UI inmediatamente (optimista)
    setTasks(prev => [...prev, newTask]);
    
    try {
      await add({ title, done: false, userId: user.uid });
      // Refresca para obtener ID real de Firebase (opcional, si no usas listeners)
      await fetchTasks();
    } catch (error) {
      // Revierte si falla
      setTasks(prev => prev.filter(t => t.id !== tempId));
      console.error("Error adding task:", error);
      throw error; // Opcional: para manejar en UI
    }
  };

  const updateTask = async (id: string, title: string) => {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;
    
    // Actualiza UI inmediatamente
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
    
    try {
      await update(id, { title });
    } catch (error) {
      // Revierte si falla
      setTasks(prev => prev.map(t => t.id === id ? originalTask : t));
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const toggleDone = async (id: string, done: boolean) => {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;
    
    // Actualiza UI inmediatamente
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t));
    
    try {
      await update(id, { done });
    } catch (error) {
      // Revierte si falla
      setTasks(prev => prev.map(t => t.id === id ? originalTask : t));
      console.error("Error toggling task:", error);
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    const taskToRemove = tasks.find(t => t.id === id);
    if (!taskToRemove) return;
    
    // Remueve de UI inmediatamente
    setTasks(prev => prev.filter(t => t.id !== id));
    
    try {
      await remove(id);
    } catch (error) {
      // Agrega de vuelta si falla
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