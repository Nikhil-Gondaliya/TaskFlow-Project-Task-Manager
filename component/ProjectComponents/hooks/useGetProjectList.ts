import { ProjectDataType } from "@/utils/types";
import { useEffect, useState } from "react";

export const useGetProjectList = () => {
  const [projects, setProjects] = useState<ProjectDataType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProjects = async () => {
    setIsFetching(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      setProjects(data || []); // Adjust based on your backend response shape
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, refetchList: fetchProjects, isFetching };
};
