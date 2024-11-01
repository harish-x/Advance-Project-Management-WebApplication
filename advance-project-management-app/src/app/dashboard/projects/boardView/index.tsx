import Spinner from "@/app/components/Spinner";
import {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "@/lib/features/task";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "@/app/components/tasks/TaskColumn";

type Props = {
  id: string;
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Board = ({ id, setIsModalNewTaskOpen }: Props) => {
  const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

  const {
    isError,
    data: tasks,
    isFetching,
    isSuccess,
    isLoading,
  } = useGetAllTasksQuery({ projectId: id });

  const [updateTask, { isLoading: isLoadingUpdateTask }] =
    useUpdateTaskMutation();
  const moveTask = (taskId: string, toStatus: string) => {
    updateTask({ status: toStatus, taskId });
  };

  if (isLoading || isLoadingUpdateTask) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              moveTask={moveTask}
              tasks={tasks || []}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            />
          ))}
        </div>
      </DndProvider>
    </>
  );
};

export default Board;
