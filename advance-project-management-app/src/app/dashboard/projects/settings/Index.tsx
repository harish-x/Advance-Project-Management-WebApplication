import {
  useDeleteProjectMutation,
  useGetProjectQuery,
} from "@/lib/features/project";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarClock, CalendarIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import EditProjectModal from "@/app/components/modal/EditProjectModal";

type Props = {
  id: string;
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectSettings = (props: Props) => {
  const { data: project } = useGetProjectQuery(props.id);
  const [deleteProject] = useDeleteProjectMutation();
  const [open, setOpen] = React.useState(false);
  const route = useRouter();
  async function handleDeleteProject() {
    await deleteProject(project?.id)
      .unwrap()
      .then(() => route.push("/dashboard"));
  }
  return (
    <>
      <EditProjectModal isOpen={open} onClose={() => setOpen(false)} project={ project} />
      <div className="bg-backgroundfw rounded-md mt-5">
        <h1 className="font-semibold text-xl px-4 py-2">Project Settings</h1>
        <div className="flex justify-between items-center px-5 py-5">
          <div className="space-y-3">
            <p>
              {" "}
              <strong>Project Name:</strong> {project?.name}
            </p>
            <p>
              <strong>Description:</strong>
              {project?.desc}
            </p>
            <p>
              <strong>Client Name:</strong>
              {project?.clientName}
            </p>
            <p className="flex space-x-1">
              <CalendarIcon />
              <strong>Start Date:</strong>&nbsp;
              {project?.startDate && format(new Date(project.startDate), "P")}
            </p>

            <p className="flex space-x-1">
              <CalendarClock />
              <strong>Due Date:</strong>&nbsp;
              {project?.DueDate && format(new Date(project.DueDate), "P")}
            </p>

            <p className="flex space-x-1">
              <CalendarCheck />
              <strong>Finished Date:</strong>&nbsp;
              {project?.finishedDate &&
                format(new Date(project.finishedDate), "P")}
            </p>
            <p>
              <strong>Price: </strong>
              {project?.price}
            </p>
            <p>
              <strong>Status:</strong>
              {project?.status}
            </p>
            <p>
              <strong>Project Teams:</strong>
              {project?.projectTeams &&
                project.projectTeams.map((team: any, index: number) =>
                  (team.team.teamName as string).concat(
                    project.projectTeams.length - 1 === index ? " " : ", "
                  )
                )}
            </p>
          </div>

          <div className="space-x-2 self-start">
            <Button variant="outline" onClick={() => setOpen(true)}>
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-secondary/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-destructive">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    project from database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-red-500"
                    onClick={handleDeleteProject}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSettings;
