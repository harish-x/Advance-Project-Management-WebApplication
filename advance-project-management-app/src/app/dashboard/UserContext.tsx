"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCheckUserQuery } from "@/lib/features/auth";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Spinner from "../components/Spinner";

interface UserContextType {
  isLoading: boolean;
  isError: boolean;
  userData: any | null;
  isUserSuccess: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: UserData,
    isError,
    isLoading,
    isSuccess: isUserSuccess,
    refetch,
  } = useCheckUserQuery();
  const [userData, setUserData] = useState(UserData);
  const router = useRouter();

  useEffect(() => {
    if (isUserSuccess && UserData) {
      setUserData(UserData);
    } else if (!isUserSuccess && !isLoading) {
      router.push("/");
    }
  }, [isUserSuccess, UserData, isLoading, router]);

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center"><Spinner/></div>;
  }

  return (
    <UserContext.Provider
      value={{ isLoading, isError, userData, isUserSuccess }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
