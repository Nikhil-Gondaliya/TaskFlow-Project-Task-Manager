import { useRouter } from "next/navigation";
import Button from "../Common/UICommonComponent/Button";
import { ProjectDataType } from "@/utils/types";
import { Pencil, Trash2 } from "lucide-react";

type ProjectCardProps = {
  project: ProjectDataType;
  openEditModal: (project: ProjectDataType) => void;
  handleDeleteClick: (id: string) => void;
  loading: boolean;
};

export const ProjectCard = ({
  project,
  openEditModal,
  handleDeleteClick,
  loading,
}: ProjectCardProps) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-4 sm:p-5 bg-white/10 rounded-xl border border-white/20 animate-pulse">
        <div className="h-6 bg-white/30 rounded w-3/4 mb-2" />
        <div className="h-4 bg-white/20 rounded w-full mb-4" />
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-8 bg-white/30 rounded" />
          <div className="h-8 w-8 bg-white/30 rounded" />
        </div>
      </div>
    );
  }

  const handleProjectClick = () => {
    router.push(`/project/${project.id}`);
    localStorage.setItem("selectedProject", JSON.stringify(project));
  };

  return (
    <div
      key={project.id}
      className="relative p-4 sm:p-5 bg-white/10 rounded-xl border border-white/20 transition group"
    >
      <div onClick={handleProjectClick} className="cursor-pointer">
        <h3 className="text-base sm:text-lg font-semibold text-white">
          {project.name}
        </h3>
        <p className="text-sm sm:text-base text-white/70 mt-1 break-words">
          {project.description}
        </p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          onClick={() => openEditModal(project)}
          variant="outline"
          className="p-2"
        >
          <Pencil size={16} />
        </Button>
        <Button
          onClick={() => handleDeleteClick(project.id ?? "")}
          variant="outline"
          className="p-2"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
