"use client";
import React from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../boardView";
import ListView from "../ListView";
import Timeline from "../TimelineView";
import TableView from "../TableView";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  console.log(id);
  
  const [isActiveTab, setIsActiveTab] = React.useState("board");
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = React.useState(false);

  return (
    <>
      <ProjectHeader
        isActiveTab={isActiveTab}
        setIsActiveTab={setIsActiveTab}
      />
      {isActiveTab === "board" && (
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
