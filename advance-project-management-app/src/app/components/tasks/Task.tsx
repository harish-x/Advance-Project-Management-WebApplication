import { Task as TaskType, useDeleteTaskMutation } from "@/lib/features/task";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import TaskDetailsModal from "../modal/TaskDetailsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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
  const [deleteTask] = useDeleteTaskMutation();
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
  async function handleDeleteTask() {
    await deleteTask(task.id)
      .unwrap()
      .then(() => {
        toast({ title: "Task has been deleted successfully" });
      })
      .catch((error) => {
        toast({ title: error.data.message, variant: "destructive" });
      });
  }
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
        className={`mb-4 rounded-md bg-background shadow  ${
          isDragging ? "opacity-100" : "opacity-50"
        }`}
      >
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
                  <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                      <Button
                        className="w-full text-destructive hover:bg-destructive hover:text-secondary"
                        variant={"ghost"}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-secondary">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove your Task from servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive"
                          onClick={handleDeleteTask}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </button>
          </div>
          <div
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="cursor-pointer"
          >
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
