"use client";

import Modal from "../../Common/UICommonComponent/Modal";
import TaskForm, { TaskFormData } from "./TaskForm";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: TaskFormData) => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <TaskForm
        onSubmit={(data) => {
          onAdd(data);
          onClose();
        }}
        onCancel={onClose}
        submitLabel="Add Task"
      />
    </Modal>
  );
}
