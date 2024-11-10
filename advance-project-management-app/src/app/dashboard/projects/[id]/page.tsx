"use client";
import React from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../boardView";
import ListView from "../ListView";
import Timeline from "../TimelineView";
import TableView from "../TableView";
import NewTaskModal from "@/app/components/modal/NewTaskModal";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  
  const [isActiveTab, setIsActiveTab] = React.useState("Kanban");
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = React.useState(false);

  return (
    <>
      <NewTaskModal
        isOpen={isModelNewTaskOpen}
        onClose={() => setIsModelNewTaskOpen(false)}
        projectID={id}
      />
      <ProjectHeader
        isActiveTab={isActiveTab}
        setIsActiveTab={setIsActiveTab}
        projectID={id}
      />
      {isActiveTab === "Kanban" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {isActiveTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {isActiveTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {isActiveTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
    </>
  );
};

export default page;
