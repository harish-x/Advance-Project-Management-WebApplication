import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {};

const KanbanLoading = (props: Props) => {
  return (
    <div className="flex gap-5 mt-4 px-5" >
      <Skeleton className="w-[25%] h-[50vh]  bg-backgroundfw" />
      <Skeleton className="w-[25%] h-[50vh]  bg-backgroundfw" />
      <Skeleton className="w-[25%] h-[50vh]  bg-backgroundfw" />
      <Skeleton className="w-[25%] h-[50vh]  bg-backgroundfw" />
    </div>
  );
};

export default KanbanLoading;
