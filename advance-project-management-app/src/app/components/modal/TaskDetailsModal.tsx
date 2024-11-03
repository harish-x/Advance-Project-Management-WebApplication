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

  isOpen: boolean;
  onClose: () => void;
  name?: string;
};

const TaskDetailsModal = ({  isOpen, onClose }: Props) => {
  const { toast } = useToast();
 

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] min-w-[80%] min-h-[80%]">
          <DialogHeader>
            <DialogTitle className="text-secondary">Create Project</DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
         kcvdhnvkjdnkvndsfknvkdf
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetailsModal;
