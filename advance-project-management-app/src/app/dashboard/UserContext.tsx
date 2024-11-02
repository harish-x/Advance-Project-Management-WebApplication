"use client";
import React, { createContext, useContext } from "react";
import { useCheckUserQuery } from "@/lib/features/auth";

interface UserContextType {
  isLoading: boolean;
  isError: boolean;
  userData: any | null; // Adjust type according to your user data structure
  isUserSuccess: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: userData, // Directly use the fetched data
    isError,
    isLoading,
    isSuccess: isUserSuccess,
  } = useCheckUserQuery();

  return (
    <UserContext.Provider
      value={{ isLoading, isError, userData, isUserSuccess }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
