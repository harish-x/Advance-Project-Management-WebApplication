import Header from "@/app/components/Header";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="bg-backgroundfw mt-10 rounded-t-md  ">
        <div className=" px-5  rounded flex justify-around items-center  py-2">
          <h1 className="font-semibold text-xl">Search</h1>
          <div className="flex 2/4">
            <Select>
              <SelectTrigger className="w-[180px] rounded-r-none">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light" defaultChecked>
                  Employees
                </SelectItem>
                <SelectItem value="dark">Projects</SelectItem>
                <SelectItem value="system">Tasks</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search"
              className="w-full rounded-l-none border-l-0"
            />
          </div>
        </div>
      </div>
      <div className="bg-backgroundfw rounded-b-md min-h-[60vh] mt-5"></div>
    </>
  );
};

export default page;
