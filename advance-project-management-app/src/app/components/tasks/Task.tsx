import { Task as TaskType } from "@/lib/features/task";
import {
  EllipsisVertical,
  MessageSquareMore,
  Paperclip,
  Plus,
} from "lucide-react";
import { useDrag } from "react-dnd";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import TaskDetailsModal from "../modal/TaskDetailsModal";

type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging,
    }),
  }));
  const taskSplits = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = task.comments && task.comments.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const priorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
          ? "bg-yellow-200 text-yellow-700"
          : priority === "Medium"
          ? "bg-green-200 text-green-700"
          : priority === "Low"
          ? "bg-blue-200 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <>
      <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskId={task.id}
      />
      <div
        ref={(instance) => {
          drag(instance);
        }}
        className={`mb-4 rounded-md bg-background shadow cursor-pointer ${
          isDragging ? "opacity-100" : "opacity-50"
        }`}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {task.attachments && task.attachments.length > 0 && (
          <Image
            src={`${task.attachments[0].fileUrl}`}
            alt={`${task.attachments[0].fileName}`}
            width={400}
            height={200}
            className="h-auto w-full rounded-t-md"
          />
        )}
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {task.priority && priorityTag({ priority: task.priority })}
              {taskSplits.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full px-2 py-1 text-xs font-semibold text-white bg-purple-500"
                >
                  {tag}
                </div>
              ))}
            </div>
            <button className="flex p-1 flex-shrink-0 items-center  rounded-full justify-center hover:bg-backgroundfw  ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-secondary/10 py-2 ">
                  <DropdownMenuItem>Create Issue</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-red-500">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </button>
          </div>

          <div className="my-3 justify-between">
            <h3 className="text-md font-bold">{task.title}</h3>
            {typeof task.points === "number" && (
              <div className="text-xs font-bold">{task.points} pts</div>
            )}
          </div>
          <div className="mb-2 text-xs tex-gray-500">
            {formattedStartDate && <span>{formattedStartDate}-</span>}
            {formattedDueDate && <span>{formattedDueDate}</span>}
          </div>

          <p className="text-sm text-secondary/80">{task.description}</p>
          <div className="mt-4 border-t border-gray-200/25" />
          <div className="mt-3 flex items-center justify-between ">
            <div className="flex -space-x-[6px] overflow-hidden">
              {task.assignee && (
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={`${task.assignee.profilePicture!}`}
                    alt={`${task.assignee.userName!}`}
                    sizes="1"
                  />
                  <AvatarFallback color="brown">
                    {task.assignee.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              {task.author && (
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    height={24}
                    src={`${task.author.profilePicture!}`}
                    alt={`${task.author.userName!}`}
                    sizes="1"
                  />
                  <AvatarFallback>
                    {task.author.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex items-center text-gray-500 space-x-2">
              <MessageSquareMore size={16} />
              <p className="text-sm text-secondary/80">{numberOfComments}</p>
              <Paperclip size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
