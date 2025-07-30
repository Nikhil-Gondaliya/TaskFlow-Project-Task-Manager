"use client";

import { useState } from "react";
import Button from "../Common/UICommonComponent/Button";
import { ProjectFormData } from "./Dialogs/ProjectForm";
import { useAddProject } from "./hooks/useAddProject";
import { useEditProject } from "./hooks/useEditProject";
import { useDeleteProject } from "./hooks/useDeleteProject";
import { useGetProjectList } from "./hooks/useGetProjectList";
import AddProjectModal from "./Dialogs/AddProjectModal";
import EditProjectModal from "./Dialogs/EditProjectModal";
import DeleteConfirmModal from "../Common/DeleteConfirmModal";
import { ProjectCard } from "./ProjectCard";

export default function ProjectList() {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<
    null | (typeof projects)[0]
  >(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const { createProject } = useAddProject();
  const { updateProject } = useEditProject();
  const { deleteProject } = useDeleteProject();
  const { projects, refetchList, isFetching } = useGetProjectList();

  const handleFormSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    const payload = {
      name: data.name,
      description: data.description || "",
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id ?? "", payload);
      } else {
        await createProject(payload);
      }

      refetchList();
      setShowModal(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Project form error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const openEditModal = (project: (typeof projects)[0]) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingProjectId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProjectId) return;

    setLoading(true);
    try {
      await deleteProject(deletingProjectId);
      refetchList();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setDeleteOpen(false);
      setDeletingProjectId(null);
    }
  };

  return (
    <>
      {projects.length === 0 ? (
        <div className="text-center text-white/80 mb-6">
          <p className="text-lg sm:text-xl">No projects yet.</p>
          <p className="text-sm sm:text-base text-white/60">
            Click the button below to create your first project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {projects.map((project) => {
            return (
              <ProjectCard
                project={project}
                key={project.id}
                openEditModal={openEditModal}
                handleDeleteClick={handleDeleteClick}
                loading={isFetching}
              />
            );
          })}
        </div>
      )}

      <div className="flex justify-center sm:justify-start">
        <Button onClick={openNewModal}>+ Create New Project</Button>
      </div>

      <AddProjectModal
        loading={loading}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProject(null);
        }}
        onAdd={handleFormSubmit}
      />

      {editingProject && (
        <EditProjectModal
          loading={loading}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSave={handleFormSubmit}
          defaultValues={editingProject}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeletingProjectId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
