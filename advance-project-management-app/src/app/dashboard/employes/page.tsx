"use client";

import Spinner from "@/app/components/Spinner";
import { Input } from "@/components/ui/input";
import { useGetAllEmployesQuery } from "@/lib/features/auth";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideBarLoading from "@/app/components/loadings/sideBarLoading";
import TableLoading from "@/app/components/loadings/TableLoading";

type Props = {};

const page = (props: Props) => {
  const { data: employes, isLoading, isError } = useGetAllEmployesQuery();

  if (isLoading) {
    return (
      <div className=" ">
        <TableLoading/>
      </div>
    );
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="bg-backgroundfw mt-10 rounded-t-md  ">
        <Table>
          <TableCaption>A list of Employes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>S.no</TableHead>
              <TableHead>Profile picture</TableHead>
              <TableHead>Name</TableHead>
              <TableHead >Email</TableHead>
              <TableHead >Role</TableHead>
              <TableHead>Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employes?.map((employee, index) => {
              return (
                <TableRow key={employee.userId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        height={24}
                        src={`${employee.profilePicture!}`}
                        alt={`${employee.userName!}`}
                        sizes="1"
                      />
                      <AvatarFallback>
                        {employee.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{employee.userName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.team?.teamName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default page;
