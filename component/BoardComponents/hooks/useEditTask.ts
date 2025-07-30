import { Task } from "@/utils/types";

export const useEditTask = () => {
  const editTask = async (task: Task) => {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error("Failed to update task");

    return res.json();
  };

  return { editTask };
};
