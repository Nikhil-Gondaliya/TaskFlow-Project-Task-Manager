import { ProjectDataType } from "@/utils/types";

export const useEditProject = () => {
  const updateProject = async (
    id: string,
    data: Omit<ProjectDataType, "id">,
  ) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result.project;
  };

  return { updateProject };
};
