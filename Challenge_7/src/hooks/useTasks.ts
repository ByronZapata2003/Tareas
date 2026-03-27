import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";

export interface Task {
  id?: string;
  title: string;
  done: boolean;
  userId: string;
}

export function useTasks() {
  const getAll = async (userId: string): Promise<Task[]> => {
    const snapshot = await getDocs(collection(db, "tasks"));
    const tasks: Task[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as Task;
      if (data.userId === userId) {
        tasks.push({ ...data, id: d.id });
      }
    });
    return tasks;
  };

  const add = async (task: Omit<Task, "id">) => {
    await addDoc(collection(db, "tasks"), task);
  };

  const update = async (id: string, data: Partial<Task>) => {
    await updateDoc(doc(db, "tasks", id), data);
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { getAll, add, update, remove };
}