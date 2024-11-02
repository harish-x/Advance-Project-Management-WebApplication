"use client";
import React, { useState } from "react";
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
import { useCreateProjectMutation } from "@/lib/features/project";
import { useToast } from "@/hooks/use-toast";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name?: string;
};

const NewProjectModal = ({ children, isOpen, onClose }: Props) => {
  const { toast } = useToast();
  const [data, setdata] = useState({
    name: "",
    desc: "",
    clientName: "",
    price: 0,
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 5),
  });

  const [createProject, { isSuccess, isLoading, isError }] =
    useCreateProjectMutation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(data);
    console.log(date);

    if (!date) {
      return;
    }
    await createProject({ ...data, startDate: date.from, DueDate: date?.to })
      .unwrap()
      .then((data) => {
        toast({ title: "Project created successfully" });
        onClose();
      }).catch((error) => {
        toast({ title: error.data.message, variant: "destructive" });
      })
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-secondary">Create Project</DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 ">
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
                id="username"
                name="desc"
                placeholder="Description"
                className="col-span-3"
                value={data.desc}
                onChange={handleChange}
              />

              <Input
                id="desc"
                name="clientName"
                placeholder="client Name"
                className="col-span-3"
                value={data.clientName}
                onChange={handleChange}
              />

              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                className="col-span-3"
                value={data.price}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary font-sm py-2">
                Pick start date to due date
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
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
            <DialogFooter className="mt-2">
              <Button type="submit" variant={"secondary"}>
                Create Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProjectModal;
