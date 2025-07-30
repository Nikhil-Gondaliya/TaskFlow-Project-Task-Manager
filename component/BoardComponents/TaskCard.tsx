import { useState } from "react";
import { Task } from "@/utils/types";
import EditTaskModal from "./Dialogs/EditTaskModal";
import DeleteConfirmModal from "../Common/DeleteConfirmModal";
import moment from "moment";
import { useDraggable } from "@dnd-kit/core";
import Button from "../Common/UICommonComponent/Button";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  task: Task;
  onMoveTask: (id: string, status: Task["status"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskCard({
  task,
  onMoveTask,
  onEditTask,
  onDeleteTask,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  return (
    <div
      className={`transition-transform ${isDragging ? "opacity-50" : ""}`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <div
        ref={setNodeRef}
        className="bg-slate-700 p-4 rounded-lg shadow-md space-y-2 text-white"
      >
        <div
          className="text-sm font-medium cursor-grab active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          {task.title}
        </div>

        {task.description && (
          <div className="text-xs text-slate-300">{task.description}</div>
        )}

        {task.date && (
          <div
            className={`text-xs ${
              moment(task.date).isBefore(moment(), "day")
                ? "text-red-400"
                : moment(task.date).isSame(moment(), "day")
                  ? "text-yellow-400"
                  : "text-slate-300"
            }`}
          >
            Due: {moment(task.date).format("YYYY-MM-DD")}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
          <div className="flex flex-wrap gap-2">
            {["todo", "in-progress", "done"]
              .filter((s) => s !== task.status)
              .map((s) => (
                <Button
                  variant="outline"
                  key={s}
                  onClick={() => onMoveTask(task.id, s as Task["status"])}
                  className="text-xs px-2 py-1 rounded"
                >
                  → {s}
                </Button>
              ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil size={16} />
            </Button>
            <Button variant="outline" onClick={() => setDeleteOpen(true)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={onEditTask}
      />

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          onDeleteTask(task.id);
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}
