import { ProjectDataType } from "@/utils/types";

export const useAddProject = () => {
  const createProject = async (data: Omit<ProjectDataType, "id">) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result.project;
  };

  return { createProject };
};
