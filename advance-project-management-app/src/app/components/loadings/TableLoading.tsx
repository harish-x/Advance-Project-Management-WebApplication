import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {};

const TableLoading = (props: Props) => {
  return (
    <>
      <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
          </div>
          <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
          </div>
          <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
          </div>
          <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
          </div>
          <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
          </div>
          <div className="mt-10 flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full  bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
              <Skeleton className="w-[20%] h-10   bg-backgroundfw" />
      </div>
    </>
  );
};

export default TableLoading;
