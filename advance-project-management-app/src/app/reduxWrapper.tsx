"use client";
import React from "react";
import StoreProvider from "./redux";

type Props = {};

const reduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default reduxWrapper;
