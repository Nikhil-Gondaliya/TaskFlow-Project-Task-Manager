import Button from "./UICommonComponent/Button";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm text-white space-y-4">
        <h2 className="text-lg font-bold">Delete Task</h2>
        <p className="text-sm">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>

          <Button onClick={onConfirm} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
