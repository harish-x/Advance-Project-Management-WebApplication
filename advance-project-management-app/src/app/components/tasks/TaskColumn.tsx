import { Task as TaskType } from "@/lib/features/task";
import { EllipsisVertical, Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import Task from "./Task";
type TaskColumnProps = {
  status: string;
  moveTask: (taskId: string, toStatus: string) => void;
  tasks: TaskType[];
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const TaskColumn = ({
  status,
  moveTask,
  tasks,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => {
      moveTask(item.id, status);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const taskCount = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#2563eb",
    "Work In Progress": "#059669",
    "Under Review": "#9d7706",
    "Completed": "#000000",
  };
  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 bg-backgroundfw ${
        isOver ? "bg-gray-100" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        ></div>
        <div className="flex items-center justify-between w-full bg-primary rounded-e-lg px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold w-full">
            {status}
            <span
              className={`ml-2 inline-block rounded-full p-1 text-center text-sm leading-none`}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                backgroundColor: statusColor[status],
              }}
            >
              {taskCount}
            </span>
          </h3>

          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-background"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn