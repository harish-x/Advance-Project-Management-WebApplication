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
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import Spinner from "../Spinner";
import { useUserContext } from "@/app/dashboard/UserContext";
import { useCreateTaskMutation } from "@/lib/features/task";
import { Status } from "@/lib/features/task";
import { Priority } from "@/lib/features/task";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetProjectMembersQuery } from "@/lib/features/project";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectID: string;
};

const NewTaskModal = ({ isOpen, onClose, projectID }: Props) => {
  const { userData, isLoading: isUserLoading } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    email: "",
    id:""
  });
  const { toast } = useToast();

  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    tags: "",
    status: Status.ToDO,
    priority: Priority.Low,
    points: 0,
    projectId: projectID,
    authorUserId: "",
    assignedUserID: "",
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  useEffect(() => {
    if (userData && userData.userId) {
      setData((prevData) => ({
        ...prevData,
        authorUserId: userData.userId,
        assignedUserID: value.id,
      }));
    }
  }, [userData,value]);

  const [createTask, { isSuccess, isLoading, isError }] =
    useCreateTaskMutation();
  const { data: projectMembers } = useGetProjectMembersQuery(
    projectID as string
  );
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
      .catch((error: any) => {
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
      <DialogContent className="lg:w-[50%] ">
        <DialogHeader>
          <DialogTitle className="text-secondary">Create New Task</DialogTitle>
          <DialogDescription>Click Create when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2 ">
              <div>
                <label className="text-sm text-secondary" htmlFor="name">
                  Task name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="w-full col-span-3 mt-1"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm text-secondary" htmlFor="title">
                  Title
                </label>
                <Input
                  name="title"
                  id="title"
                  className="col-span-3 mt-1"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm text-secondary" htmlFor="description">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  className="col-span-3 mt-1"
                  value={data.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm text-secondary" htmlFor="tags">
                  Tags
                </label>
                <Input
                  name="tags"
                  id="tags"
                  className="col-span-3 mt-1"
                  value={data.tags}
                  placeholder="Development,Design..."
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm text-secondary">
                  Assign to
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button className="w-full mt-1" variant="outline">
                      {" "}
                      {value.email}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                      <CommandInput placeholder="Search Members..." />
                      <CommandList>
                        <CommandEmpty>No Members found.</CommandEmpty>
                        <CommandGroup>
                          {projectMembers?.map((member) => (
                            <CommandItem
                              key={member.userId}
                              value={member.email}
                              onSelect={(currentValue) => {
                                setValue(
                                 {email:currentValue,id:member.userId}
                                );
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div>
                                  <Avatar>
                                    <AvatarImage
                                      src={member.profilePicture}
                                      alt="@shadcn"
                                    />
                                    <AvatarFallback>
                                      {member.userName
                                        .charAt(0)
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex flex-col">
                                  <span>{member.userName}</span>
                                  <span className="text-xs text-muted-foreground">{member.email}</span>
                                </div>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value.id === member.userId
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div>
                <label className="text-sm text-secondary" htmlFor="priority">
                  Priority
                </label>
                <Select
                  value={data.priority}
                  onValueChange={(e) =>
                    setData({ ...data, priority: e as Priority })
                  }
                >
                  <SelectTrigger className="w-full text-secondary mt-1">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-secondary" htmlFor="status">
                  Status
                </label>
                <Select
                  value={data.status}
                  onValueChange={(e) =>
                    setData({ ...data, status: e as Status })
                  }
                >
                  <SelectTrigger className="w-full text-secondary mt-1">
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
              </div>
              <div>
                <label className="text-sm text-secondary" htmlFor="points">
                  Points
                </label>
                <Input
                  name="points"
                  id="points"
                  placeholder="Points"
                  className="col-span-3 mt-1"
                  type="number"
                  value={data.points}
                  onChange={handleChange}
                />
              </div>

              <span className="text-secondary text-sm ">
                Pick start date to due date
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
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
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" className="w-full mt-2" variant="secondary">
              {isLoading ? <Spinner /> : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
