import { Task } from "@/utils/types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  status: Task["status"];
  tasks: Task[];
  onAddTask: (task: {
    title: string;
    status: Task["status"];
    date: string;
  }) => void;
  onMoveTask: (id: string, status: Task["status"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const statusTitles = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function Column({
  status,
  tasks,
  onMoveTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col w-full min-w-[250px] max-w-full bg-white/10 p-4 rounded-xl border border-white/20 overflow-hidden"
    >
      <h2 className="text-lg font-semibold mb-4 text-white">
        {statusTitles[status]}
      </h2>

      <div className="space-y-3 mb-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
