"use client";
import Spinner from "@/app/components/Spinner";
import { useGetAllTasksQuery } from "@/lib/features/task";
import React from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type TaskTypeItem = "task" | "milestone" | "project";
const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    isError,
    data: tasks,
    isSuccess,
    isLoading,
  } = useGetAllTasksQuery({ projectId: id });
  const [displayOptions, setDisplayOptions] = React.useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  const ganttTask = React.useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate),
        end: new Date(task.dueDate!),
        name: task.title ?? "",
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItem,
        progress: (task.points as number)
          ? ((task.points as number) / 10) * 100
          : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewMode = (value: string) => {
    setDisplayOptions((prev) => ({
      ...displayOptions,
      viewMode: value as ViewMode,
    }));
  };
  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;

  if (isSuccess) {
    return (
      <div className="px-4 xl:px-6 overflow-x-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 py-5">
          <h1 className="me-2 text-lg font-bold">Project Timeline</h1>
          <div className="relative inline-block w-64">
            <Select
              value={displayOptions.viewMode}
              onValueChange={(e: string) => handleViewMode(e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme"  />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ViewMode.Day}>Day</SelectItem>
                <SelectItem value={ViewMode.Week}>Week</SelectItem>
                <SelectItem value={ViewMode.Month}>Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-hidden rounded-md bg-backgroundfw shadow ">
          <div className="timeline">
            <Gantt
              tasks={ganttTask}
              {...displayOptions}
              columnWidth={
                displayOptions.viewMode === ViewMode.Month ? 150 : 100
              }
              listCellWidth="100px"
              barBackgroundColor="#101214"
              barBackgroundSelectedColor="#101214"
            />
          </div>
          <div className="px-4 pb-5 pt-1">
            <Button onClick={() => setIsModalNewTaskOpen(true)} type="button">
              Add Task
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Timeline;
