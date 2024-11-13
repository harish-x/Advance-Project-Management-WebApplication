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
import { Calendar, CalendarCheck2, CalendarClockIcon, CalendarDaysIcon } from "lucide-react";
import TaskCard from "./tasks/TaskCard";
import Link from "next/link";
import TaskCardsLoading from "./loadings/TaskCardsLoading";
import ProjectCardLoading from "./loadings/ProjectCardLoading";
const HomePage = (props: Props) => {
  const { isLoading, data: projects } = useGetProjectsQuery();
  const { userData, isLoading: isUserLoading } = useUserContext();
  const [tasks, setTasks] = useState<Task[]>();

  const { data: tasksData, isLoading: istasksLoading } = useGetTaskByUserQuery(
    userData?.userId as string,
    {
      skip: !userData,
    }
  );

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData as Task[]);
    }
  }, [tasksData, isLoading]);
  const router = useRouter();
 
  return (
    <div>
      {!isLoading && projects?.length === 0 && (
        <h1 className="text-2xl font-bold text-center">No projects found</h1>
      )}
      {isLoading ? (
       <ProjectCardLoading/>
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
                  className={`p-5 rounded-sm cursor-pointer space-y-2 ${
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
                  <h2 className="text-lg font-semibold ">
                    {project.name}
                  </h2>

                  <p className="">{project.desc}</p>
                  <p className="flex  items-center gap-2">
                    <CalendarDaysIcon size={20} />
                    <strong>Start Date:</strong>{" "}
                    {format(new Date(project.startDate), "P")}
                  </p>
                  <p className="flex items-center  gap-2">
                    <CalendarClockIcon size={20} />
                    <strong>Due Date:</strong>{" "}
                    {project.DueDate ? format(new Date(project?.DueDate), "P") : "No Due Date"}
                  </p>
                  <p className="flex items-center  gap-2">
                    <CalendarCheck2 size={20}/>
                    <strong>Finished Date:</strong>{" "}
                    {project.finishedDate ?
                      format(new Date(project?.finishedDate), "P") : "Not finished yet"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {project.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {istasksLoading ? (
       <TaskCardsLoading/>
      ) : (
        <>
          {
            <div className="bg-backgroundfw rounded-md mt-5 p-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold  text-secondary">Tasks Assigned to you</h1>
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-red-200" />
                  <p>Urgent</p>
                  <div className="w-5 h-5 bg-yellow-200" />
                  <p>High</p>
                  <div className="w-5 h-5 bg-green-200" />
                  <p>Medium</p>
                  <div className="w-5 h-5 bg-blue-200" />
                  <p>Low</p>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                {tasks &&
                  tasks.map((task) => (
                    <Link key={task.id} href={`/dashboard/projects/${task.id}`}>
                      <TaskCard task={task} />
                    </Link>
                  ))}
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default HomePage;
