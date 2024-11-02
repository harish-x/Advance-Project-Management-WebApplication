import Header from "@/app/components/Header";
import Spinner from "@/app/components/Spinner";
import TaskCard from "@/app/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Task as TaskType, useGetAllTasksQuery } from "@/lib/features/task";
import { ClipboardPlus, PlusSquareIcon } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    isError,
    data: tasks,
    isSuccess,
    isLoading,
  } = useGetAllTasksQuery({ projectId: id });

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;

  if (isSuccess) {
    return (
      <>
        <div className="px-4 pb-8">
          <div className="pt-5">
            <Header
              name="List"
              isSmallText
              buttonComponent={
                <Button
                  variant="outline"
                  onClick={() => setIsModalNewTaskOpen(true)}
                >
                  <ClipboardPlus className="mr-2 h-5 w-5" /> new task
                </Button>
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
            {tasks?.map((task: TaskType) => (
              <TaskCard
                key={task.id}
                task={task}
                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default ListView;
