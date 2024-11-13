import React from "react";
import { Task as TaskType } from "@/lib/features/task";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar1Icon,
  CalendarClockIcon,
  CalendarDaysIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  task: TaskType;
  setIsModalNewTaskOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskCard = ({ task, setIsModalNewTaskOpen }: Props) => {
  const taskSplits = task.tags ? task.tags.split(",") : [];
  return (
    <div
    
      className={`mb-3 rounded-lg p-4 shadow-sm space-y-1 ${
        task.priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : task.priority === "High"
          ? "bg-yellow-200 text-yellow-700 "
          : task.priority === "Medium"
          ? "bg-green-200 text-green-700 "
          : task.priority === "Low"
          ? "bg-blue-200 text-blue-700 "
          : "bg-backgroundfw text-white "
      } `}
    >
      
      <p>
        <strong>Task: </strong> {task.title}
      </p>
      <p>
        <strong>Despription:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Priority: </strong> {task.priority}
      </p>
      <p>
        <strong>Tags: </strong>{" "}
        {taskSplits.map((tag) => (
          <Badge key={tag.length} className="mx-1">
            {tag}
          </Badge>
        ))}
      </p>
      <p className="flex items-center gap-2">
        <strong className="flex items-center gap-2">
          <CalendarDaysIcon size={16} />
          Start Date:{" "}
        </strong>{" "}
        {task.startDate
          ? format(new Date(task.startDate), "P")
          : "No start date provided"}
      </p>
      <p className="flex items-center gap-2">
        <strong className="flex items-center gap-2">
          <CalendarClockIcon size={16} /> Due Date:{" "}
        </strong>{" "}
        {task.dueDate
          ? format(new Date(task.dueDate), "P")
          : "No start Due provided"}
      </p>
      <p>
        <strong>Status: </strong>{" "}
        <Badge
          variant={
            task.status === "To Do"
              ? "todo"
              : task.status === "Work In Progress"
              ? "wip"
              : task.status === "Under Review"
              ? "review"
              : task.status === "Completed"
              ? "done"
              : "default"
          }
        >
          {task.status}
        </Badge>
      </p>
      <p>
        <strong>Author: </strong> {task.author?.userName}
      </p>
      <p>
        <strong>Assigned To: </strong> {task.assignee?.userName}
      </p>
    </div>
  );
};

export default TaskCard;
