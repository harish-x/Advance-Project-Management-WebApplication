"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";

import { useUpdateProjectMutation } from "@/lib/features/project";
import { useToast } from "@/hooks/use-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  project: any;
};

const EditProjectModal = ({isOpen, onClose,project }: Props) => {
  const { toast } = useToast();
  const [data, setdata] = useState({
    name: project?.name,
    desc: project?.desc,
    clientName: project?.clientName,
    price: project?.price as number,
  });
  console.log(project)
  const [DueDate, setDueDate] = React.useState<Date>(
    project?.DueDate as Date
  );
  const [finishedDate, setfinishedDate] = React.useState<Date>(
    project?.finishedDate as Date );
  const [status, setStatus] = React.useState(project?.status);

  const [updateProject] = useUpdateProjectMutation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    await updateProject({ ...data, DueDate,finishedDate, status, projectId: project?.id })
      .unwrap()
      .then((data) => {
        toast({ title: "Project created successfully" });
        onClose();
      })
      .catch((error) => {
        toast({ title: error.data.message, variant: "destructive" });
      });
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
              <div>
                <label className="text-secondary text-sm" htmlFor="name">
                  Project name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="w-full col-span-3"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-secondary text-sm" htmlFor="desc">
                  Description
                </label>
                <Input
                  id="desc"
                  name="desc"
                  className="col-span-3"
                  value={data.desc}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-secondary text-sm" htmlFor="clientName">
                  Client name
                </label>
                <Input
                  id="clientName"
                  name="clientName"
                  className="col-span-3"
                  value={data.clientName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-secondary text-sm" htmlFor="price">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  className="col-span-3"
                  value={data.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-secondary text-sm">Status</label>
              <Select>
                <SelectTrigger className="w-full text-white">
                  <SelectValue placeholder="Edit Status " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Project Status</SelectLabel>
                    <SelectItem value="onGoing">on going</SelectItem>
                    <SelectItem value="hold">hold</SelectItem>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="finished">finished</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary font-sm pt-3">Edit due date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !DueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {DueDate ? (
                      format(DueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={DueDate}
                    onSelect={(day)=>setDueDate(day as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary font-sm pt-3">
                Edit finished date
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !finishedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {finishedDate ? (
                      format(finishedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={finishedDate}
                    onSelect={(day)=>setfinishedDate(day as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <DialogFooter className="mt-2">
              <Button
                type="submit"
                className="w-full mt-2"
                variant={"secondary"}
              >
                Update Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjectModal;
