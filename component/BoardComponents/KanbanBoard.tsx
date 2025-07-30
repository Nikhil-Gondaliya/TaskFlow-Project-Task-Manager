import { useState } from "react";
import Column from "./Column";
import { Task } from "@/utils/types";
import AddTaskModal from "./Dialogs/AddTaskModal";
import Button from "../Common/UICommonComponent/Button";
import { useGetTaskList } from "./hooks/useGetTaskList";
import { useAddTask } from "./hooks/useAddTask";
import { useEditTask } from "./hooks/useEditTask";
import { useDeleteTask } from "./hooks/useDeleteTask";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

type KanbanBoardProps = {
  projectId: string;
};

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { tasks, refetchTask, setTasks } = useGetTaskList(projectId);
  const { addTask: addTaskAPI } = useAddTask();
  const { editTask: editTaskAPI } = useEditTask();
  const { deleteTask: deleteTaskAPI } = useDeleteTask();

  const [isModalOpen, setModalOpen] = useState(false);

  const addTask = async ({
    title,
    description,
    status,
    date,
  }: {
    title: string;
    description?: string;
    status: Task["status"];
    date: string;
  }) => {
    await addTaskAPI({
      title,
      description,
      status,
      date,
      projectId,
    });

    refetchTask();
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const moveTask = async (id: string, status: Task["status"]) => {
    const taskToMove = tasks.find((t) => t.id === id);
    if (!taskToMove) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );

    try {
      await editTaskAPI({ ...taskToMove, status });
      refetchTask();
    } catch (err) {
      console.error("Failed to move task:", err);
      refetchTask();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const taskId = active.id as string;
    const newStatus = over.data.current?.status as Task["status"];

    if (!newStatus) return;

    moveTask(taskId, newStatus);
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const progress = safeTasks.length
    ? Math.round(
        (safeTasks.filter((t) => t.status === "done").length /
          safeTasks.length) *
          100,
      )
    : 0;

  const editTask = async (updatedTask: Task) => {
    await editTaskAPI(updatedTask);

    refetchTask();
  };

  const deleteTask = async (id: string) => {
    await deleteTaskAPI(id);

    refetchTask();
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div>
        {!safeTasks.length ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400 px-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mb-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">No tasks created yet</p>
            <p className="text-sm text-gray-500 mt-1 mb-2">
              Click{" "}
              <span className="font-semibold">&quot;+ Add Task&quot;</span> to
              get started.
            </p>
            <Button onClick={() => setModalOpen(true)}>+ Add Task</Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="w-full sm:w-auto">
                <div className="text-sm mb-1">Progress: {progress}%</div>
                <div className="w-full sm:w-64 bg-slate-800 h-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <Button
                className="w-full sm:w-auto"
                onClick={() => setModalOpen(true)}
              >
                + Add Task
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {["todo", "inprogress", "done"].map((status) => (
                <div className="w-full md:w-1/3" key={status}>
                  <Column
                    status={status as Task["status"]}
                    tasks={safeTasks.filter((t) => t.status === status)}
                    onAddTask={addTask}
                    onMoveTask={moveTask}
                    onEditTask={editTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={addTask}
        />
      </div>
    </DndContext>
  );
}
