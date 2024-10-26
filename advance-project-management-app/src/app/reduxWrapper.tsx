"use client";
import React from "react";
import StoreProvider from "./store/redux";

type Props = {};

const reduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default reduxWrapper;
