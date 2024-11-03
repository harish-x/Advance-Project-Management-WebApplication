"use client";
import Spinner from "@/app/components/Spinner";
import { useGetAllTasksQuery } from "@/lib/features/task";
import React from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetProjectsQuery } from "@/lib/features/project";
import Header from "@/app/components/Header";

type TaskTypeItem = "task" | "milestone" | "project";
const Timeline = () => {
  const {
    isError,
    data: projects,
    isSuccess,
    isLoading,
  } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = React.useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  console.log(projects);

  const ganttTask = React.useMemo(() => {
    return (
      projects
        ?.filter((project) => project.startDate && project.finishedDate)
        .map((project) => ({
          start: new Date(project.startDate),
          end: new Date(project.finishedDate!),
          name: project.name ?? "",
          id: `Project-${project.id}`,
          type: "project" as TaskTypeItem,
          progress: 50,
          isDisabled: false,
        })) || []
    );
  }, [projects]);

  const handleViewMode = (value: string) => {
    setDisplayOptions((prev) => ({
      ...displayOptions,
      viewMode: value as ViewMode,
    }));
  };
  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;
  if (!ganttTask || ganttTask.length === 0)
    return (
      <div className="text-center font-bold text-2xl h-[calc(100vh-80px)] flex items-center justify-center ">
        No projects available
      </div>
    );
  if (isSuccess) {
    return (
      <div className="max-w-full p-8">
        <div className="flex items-center justify-between gap-2 py-5">
          <Header name="Projects Timeline" />
          <h1 className="me-2 text-lg font-bold">Project Timeline</h1>
          <div className="relative inline-block w-64">
            <Select
              value={displayOptions.viewMode}
              onValueChange={(e: string) => handleViewMode(e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
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
        </div>
      </div>
    );
  }
};

export default Timeline;
