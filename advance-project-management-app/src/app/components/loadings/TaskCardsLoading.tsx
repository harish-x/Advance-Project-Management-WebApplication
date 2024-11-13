import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {};

const TaskCardsLoading = (props: Props) => {
  return (
    <div className="flex flex-col  bg-backgroundfw mt-5 p-5">
      <h1 className="text-2xl font-bold ">Tasks Assigned to you</h1>
      <div className="mt-4 flex gap-5">
      <Skeleton className="w-1/4 h-[30vh] bg-background rounded" />
      <Skeleton className="w-1/4 h-[30vh] bg-background rounded" />
      <Skeleton className="w-1/4 h-[30vh] bg-background rounded" />
      <Skeleton className="w-1/4 h-[30vh] bg-background rounded" />
      </div>
    </div>
  );
};

export default TaskCardsLoading;
