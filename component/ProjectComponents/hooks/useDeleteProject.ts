export const useDeleteProject = () => {
  const deleteProject = async (
    id: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Delete failed:", data.error);
        onError?.(data.error || "Failed to delete project");
        return;
      }

      console.log("Project deleted successfully:", id);
      onSuccess?.();
    } catch (err) {
      console.error("Delete request error:", err);
      onError?.("Network error while deleting project");
    }
  };

  return { deleteProject };
};
