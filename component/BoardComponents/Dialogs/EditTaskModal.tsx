"use client";

import Modal from "@/component/Common/UICommonComponent/Modal";
import { Task } from "@/utils/types";
import TaskForm, { TaskFormData } from "./TaskForm";

type EditTaskModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
};

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const handleSave = (data: TaskFormData) => {
    onSave({ ...task, ...data });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <TaskForm
        initialValues={task}
        onSubmit={handleSave}
        onCancel={onClose}
        submitLabel="Save"
      />
    </Modal>
  );
}
