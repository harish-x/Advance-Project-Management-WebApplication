import React from "react";
import Leftbar from "../components/Leftbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "../components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <Leftbar />
        <main className="w-full">
           <Navbar/>
          <div className="flex flex-col  sm:px-10 px-5">
             <SidebarTrigger />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
