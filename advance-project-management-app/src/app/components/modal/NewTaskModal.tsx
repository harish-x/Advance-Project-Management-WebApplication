import React, { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task as TaskType } from "@/lib/features/task";
import Spinner from "../Spinner";
import { useAppSelector } from "@/app/store/redux";
import { useUserContext } from "@/app/dashboard/UserContext";
import { useCreateTaskMutation } from "@/lib/features/task";
import { Status } from "@/lib/features/task";
import { Priority } from "@/lib/features/task";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectID: string;
};

const NewTaskModal = ({ isOpen, onClose, projectID }: Props) => {
  const { userData, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();

  // State initialization
  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    tags: "",
    status: Status.ToDO,
    priority: Priority.Low,
    points: 0,
    projectId: projectID,
    authorUserId: "", // Set to empty initially
    assignedUserID: "", // Set to empty initially
  });

  // Initialize date range with a default
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  // Update `data` with `userData` when available
  useEffect(() => {
    if (userData && userData.userId) {
      setData((prevData) => ({
        ...prevData,
        authorUserId: userData.userId,
        assignedUserID: userData.userId,
      }));
    }
  }, [userData]);

  const [createTask, { isSuccess, isLoading, isError }] =
    useCreateTaskMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!date || !data.authorUserId) {
      toast({ title: "User data is missing or invalid date range." });
      return;
    }

    await createTask({ ...data, startDate: date.from, dueDate: date.to })
      .unwrap()
      .then(() => {
        toast({ title: "Task has been created successfully" });
        onClose();
      })
      .catch((error) => {
        toast({ title: error.data.message, variant: "destructive" });
      });
  }

  if (isUserLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-secondary">Create New Task</DialogTitle>
          <DialogDescription>Click Create when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <Input
              id="name"
              name="name"
              required
              placeholder="Project Name"
              className="w-full col-span-3"
              value={data.name}
              onChange={handleChange}
            />
            <Input
              name="title"
              placeholder="Title"
              className="col-span-3"
              value={data.title}
              onChange={handleChange}
            />
            <Input
              name="description"
              placeholder="Description"
              className="col-span-3"
              value={data.description}
              onChange={handleChange}
            />
            <Input
              name="tags"
              placeholder="Tags"
              className="col-span-3"
              value={data.tags}
              onChange={handleChange}
            />
            <Select
              value={data.priority}
              onValueChange={(e) =>
                setData({ ...data, priority: e as Priority })
              }
            >
              <SelectTrigger className="w-full text-secondary">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={data.status}
              onValueChange={(e) => setData({ ...data, status: e as Status })}
            >
              <SelectTrigger className="w-full text-secondary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="Work In Progress">
                  Work In Progress
                </SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="points"
              placeholder="Points"
              className="col-span-3"
              type="number"
              value={data.points}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from
                    ? date.to
                      ? `${format(date.from, "LLL dd, y")} - ${format(
                          date.to,
                          "LLL dd, y"
                        )}`
                      : format(date.from, "LLL dd, y")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-white/40 p-0"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <span className="text-secondary font-sm py-2">
              Pick start date to due date
            </span>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" variant="secondary">
              {isLoading ? <Spinner /> : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
