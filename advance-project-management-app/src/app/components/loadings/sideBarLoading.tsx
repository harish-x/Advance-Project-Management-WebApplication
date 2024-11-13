import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const SideBarLoading = (props: Props) => {
    return (
        <>
            <Skeleton className="w-full h-5  bg-backgroundfw" />
            <Skeleton className="w-full h-5 rounded bg-backgroundfw " />
            <Skeleton className="w-full h-5 rounded bg-backgroundfw " />
            <Skeleton className="w-full h-5 rounded bg-backgroundfw " />
            <Skeleton className="w-full h-5 rounded bg-backgroundfw " />

        </>
  )
};

export default SideBarLoading;
