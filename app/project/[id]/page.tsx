"use client";

import KanbanBoard from "@/component/BoardComponents/KanbanBoard";
import Button from "@/component/Common/UICommonComponent/Button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const route = useRouter();

  const [project, setProject] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedProject");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProject(parsed);
      } catch (e) {
        console.error("Invalid JSON in selectedProject", e);
      }
    }
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 bg-slate-900 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Project: {project?.name ?? "Loading..."}
        </h1>

        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("selectedProject");
            route.push("/dashboard");
          }}
          className="w-full sm:w-auto"
        >
          Go Back to Projects
        </Button>
      </div>

      <KanbanBoard projectId={id as string} />
    </main>
  );
}
