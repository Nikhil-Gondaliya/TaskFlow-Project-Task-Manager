"use client";

import Modal from "@/component/Common/UICommonComponent/Modal";
import ProjectForm, { ProjectFormData } from "./ProjectForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onAdd: (data: ProjectFormData) => void;
};

export default function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
  loading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <ProjectForm
        onSubmit={onAdd}
        onCancel={onClose}
        submitText="Create"
        loading={loading}
      />
    </Modal>
  );
}
