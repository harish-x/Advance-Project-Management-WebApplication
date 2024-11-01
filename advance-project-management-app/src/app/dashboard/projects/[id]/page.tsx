"use client";
import React from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../boardView";
import ListView from "../ListView";

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
    </>
  );
};

export default page;
