import { Task } from "@/utils/types";

export const useAddTask = () => {
  const addTask = async (task: Omit<Task, "id">) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error("Failed to add task");

    return res.json();
  };

  return { addTask };
};
