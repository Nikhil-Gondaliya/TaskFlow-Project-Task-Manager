"use client";

import Modal from "@/component/Common/UICommonComponent/Modal";
import ProjectForm, { ProjectFormData } from "./ProjectForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  defaultValues: ProjectFormData;
  loading: boolean;
};

export default function EditProjectModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
  loading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <ProjectForm
        defaultValues={defaultValues}
        onSubmit={onSave}
        onCancel={onClose}
        submitText="Save"
        loading={loading}
      />
    </Modal>
  );
}
