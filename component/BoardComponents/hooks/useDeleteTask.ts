export const useDeleteTask = () => {
  const deleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete task");

    return res.json();
  };

  return { deleteTask };
};
