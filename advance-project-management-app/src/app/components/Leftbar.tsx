"use client";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Users,
  User,
  ChevronUp,
  FolderKanban,
  Settings,
  Activity,
  UserRound,
} from "lucide-react";
import React from "react";
import { useGetProjectsQuery } from "@/lib/features/project";
import { Project as ptojectsInterface } from "@/lib/features/project";
import Spinner from "./Spinner";
import { usePathname } from "next/navigation";


type Props = {};

const Leftbar = (props: Props) => {
  const {
    isError,
    isLoading,
    isSuccess,
    data: projects,
  } = useGetProjectsQuery();
  const pathname = usePathname();


  return (
    <div>
      <Sidebar className=" py-2">
        <SidebarHeader>
          <SidebarMenuBadge>Team Lead</SidebarMenuBadge>
        </SidebarHeader>
        {/* //*******************group 1****************************** */}
        <SidebarContent>
          <SidebarGroup className="mt-2">
            <div className="border border-dotted rounded p-2 flex justify-around">
              <p className="font-semibold">Developers</p>
              <Users />
            </div>
          </SidebarGroup>
          {/* //*******************group 2****************************** */}
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex px-2 space-x-5">
                        <FolderKanban />
                        <p className="font-semibold text-lg">Projects</p>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        projects?.map((item: ptojectsInterface) => (
                          <SidebarMenuSubItem key={item.id}>
                            <SidebarMenuSubButton
                              href={`/dashboard/projects/${item.id}`}
                              isActive={
                                pathname === `/dashboard/projects/${item.id}`
                              }
                            >
                              {item.name}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
          {/* *****************************group 3******************************* */}
          <SidebarGroup className="mt-2">
            <SidebarMenuButton className="mt-3">
              <div className=" flex px-2 items-center space-x-5">
                <Activity />
                <p className="font-semibold">Timeline</p>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton className="mt-3">
              <div className=" flex px-2 items-center space-x-5">
                <UserRound />
                <p className="font-semibold">Employees</p>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton className="mt-3">
              <div className=" flex items-center px-2 space-x-5">
                <Settings />
                <p className="font-semibold">Settings</p>
              </div>
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarContent>

        {/* //*******************************************************footer****************************************** */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default Leftbar;
