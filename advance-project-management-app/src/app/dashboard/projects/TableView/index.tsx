import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useGetAllTasksQuery } from "@/lib/features/task";
import Spinner from "@/app/components/Spinner";
import { Task as TaskType } from "@/lib/features/task";
import {format} from "date-fns"

type Props = {
  id: string;
  setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {

      const {
        isError,
        data: tasks,
        isLoading,
      } = useGetAllTasksQuery({ projectId: id });
    if (isLoading) return <Spinner />;

    if (isError) return <div>Error</div>;
    return (
      <>
        <Table>
          <TableCaption> This is a list of all Tasks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead >Tags</TableHead>
              <TableHead >Start Date</TableHead>
              <TableHead >Due Date</TableHead>
              <TableHead >Status</TableHead>
              <TableHead >Created by</TableHead>
              <TableHead >Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task: TaskType) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell >{task.tags}</TableCell>
                    <TableCell >{format(new Date(task.stateDate), "P")   }</TableCell>
                    <TableCell >{ task.dueDate && format(new Date(task.dueDate), "P")}</TableCell>
                    <TableCell >{task.status}</TableCell>
                    <TableCell >{task.author?.userName}</TableCell>
                    <TableCell >{task.assignee?.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
};

export default TableView;
