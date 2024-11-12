"use client";
import {
  Task,
  useGetAllTasksQuery,
  useGetTaskByUserQuery,
} from "@/lib/features/task";
import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "@/lib/features/project";
import Spinner from "./Spinner";
type Props = {};
import { format, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/dashboard/UserContext";
import { Badge } from "@/components/ui/badge";
import { CalendarClockIcon, CalendarDaysIcon } from "lucide-react";
const HomePage = (props: Props) => {
  const { isLoading, data: projects } = useGetProjectsQuery();
  const { userData, isLoading: isUserLoading } = useUserContext();
  const [tasks, setTasks] = useState<Task[]>();


  const { data: tasksData, isLoading: istasksLoading } = useGetTaskByUserQuery(
    userData?.userId as string,
    {
      skip: !userData, // Use skip instead of enabled
    }
  );

  useEffect(() => {
    if (tasksData) {
     
      setTasks(tasksData as Task[]);
    }
  }, [tasksData, isLoading]);
  const router = useRouter();
  // const taskSplits = task?.tags ? task.tags.split(",") : [];
  function taskSplits(task: Task) {
    return task?.tags ? task.tags.split(",") : [];
  }
  return (
    <div>
      {!isLoading && projects?.length === 0 && (
        <h1 className="text-2xl font-bold text-center">No projects found</h1>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-backgroundfw rounded-md mt-5 p-5">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold  text-secondary">Projects</h1>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-indigo-200" />
                <p>on going</p>
                <div className="w-5 h-5 bg-orange-200" />
                <p>pending</p>
                <div className="w-5 h-5 bg-teal-200" />
                <p>finished</p>
                <div className="w-5 h-5 bg-gray-300" />
                <p>hold</p>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className={`p-5 rounded-sm cursor-pointer ${
                    project.status === "onGoing"
                      ? "bg-indigo-200 text-indigo-700"
                      : project.status === "pending"
                      ? "bg-orange-200 text-orange-700"
                      : project.status === "finished"
                      ? "bg-teal-200 text-teal-700"
                      : project.status === "hold"
                      ? "bg-gray-300 text-gray-700"
                      : "bg-backgroundfw text-white"
                  }`}
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <h2 className="text-lg font-semibold text-primary-foreground">
                    {project.name}
                  </h2>

                  <p className="text-gray-500">{project.desc}</p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {format(new Date(project.startDate), "P")}
                  </p>
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {project.DueDate && format(new Date(project?.DueDate), "P")}
                  </p>
                  <p>
                    <strong>Finished Date:</strong>{" "}
                    {project.finishedDate &&
                      format(new Date(project?.finishedDate), "P")}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    {project.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {istasksLoading ? (
        <Spinner />
      ) : (
        <>
            {
              tasks &&
              tasks.map((task, i) => {
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
                      {taskSplits(task).map((tag) => (
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
              })
              
          }
        </>
      )}
    </div>
  );
};

export default HomePage;
