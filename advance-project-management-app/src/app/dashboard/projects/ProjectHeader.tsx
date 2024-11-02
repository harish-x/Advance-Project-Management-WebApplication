"use client";
import Header from "@/app/components/Header";
import { Input } from "@/components/ui/input";
import { ClockIcon, FilterIcon, Grid3X3, List, PlusSquareIcon, Share2Icon, Table } from "lucide-react";
import React from "react";
import ModalNewProject from "@/app/components/modal/ProjectModal";
import { Button } from "@/components/ui/button";

type Props = {
  isActiveTab: string;
  setIsActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const ProjectHeader = (props: Props) => {
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = React.useState(false);
  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModelNewTaskOpen}
        onClose={() => setIsModelNewTaskOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8 ">
        <Header
          name="product design"
          buttonComponent={
            <Button variant="secondary"
              onClick={() => setIsModelNewTaskOpen(true)}
            >
              <PlusSquareIcon className="mr-2 h-5 w-5" /> new project
            </Button>
          }
        />
      </div>
      <div className="flex flex-wrap-reverse gap-2 border-y border-secondary/10 py-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="board"
            icon={<Grid3X3 className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<ClockIcon className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-secondary hover:text-muted-foreground">
            <FilterIcon className="h-5 w-5" />
          </button>
          <button className="text-secondary hover:text-muted-foreground">
            <Share2Icon className="h-5 w-5" />
          </button>
          <div className="relative">
            <Input
              type="search"
              className="border border-secondary/10"
              placeholder="Search Tasks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type tabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ activeTab, icon, name, setActiveTab }: tabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center justify-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0  after:h-[1px] after:w-full hover:text-muted-foreground sm:px-2 lg:px-4 ${
        isActive ? "text-primary-foreground after:bg-secondary" : "text-secondary"
      } hover:text-primary-foreground`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
