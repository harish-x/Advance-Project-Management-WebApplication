"use client";
import React from "react";
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
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Search,
  FolderSymlink,
  Folder,
  House,
} from "lucide-react";
import { useGetProjectsQuery } from "@/lib/features/project";
import { Project as ptojectsInterface } from "@/lib/features/project";
import Spinner from "./Spinner";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/dashboard/UserContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {};

const Leftbar = (props: Props) => {
  const { isLoading, data: projects } = useGetProjectsQuery();
  const pathname = usePathname();
  const router = useRouter();
  const { userData, isLoading: isUserLoading } = useUserContext();

  return (
    <div>
      <Sidebar className=" py-2">
        <SidebarHeader>
          <SidebarMenuBadge>
            {(userData?.role as string)?.toUpperCase()}
          </SidebarMenuBadge>
        </SidebarHeader>
        {/* //*******************group 1****************************** */}
        <SidebarContent>
          <SidebarGroup className="mt-2">
            <div className="border border-dotted rounded p-2 flex justify-around">
              <p className="font-semibold">{userData?.team?.teamName}</p>
              <Users />
            </div>
          </SidebarGroup>
          {/* //*******************group 2****************************** */}
          <SidebarGroup className="space-y-2">
            <SidebarMenuButton
              className="mt-3"
              isActive={pathname === "/dashboard"}
              onClick={() => router.push("/dashboard/")}
            >
              <div className=" flex px-2 items-center space-x-5">
                <House />
                <p className="font-semibold">Home</p>
              </div>
            </SidebarMenuButton>
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
                              className="py-2"
                              href={`/dashboard/projects/${item.id}`}
                              isActive={
                                pathname === `/dashboard/projects/${item.id}`
                              }
                            >
                              <Folder /> {item.name}
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
            <SidebarMenuButton
              className="mt-3"
              onClick={() => router.push("/dashboard/timeline")}
              isActive={pathname === "/dashboard/timeline"}
            >
              <div className=" flex px-2 items-center space-x-5">
                <Activity />
                <p className="font-semibold">Timeline</p>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton
              className="mt-3"
              onClick={() => router.push("/dashboard/employes")}
              isActive={pathname === "/dashboard/employes"}
            >
              <div className=" flex px-2 items-center space-x-5">
                <UserRound />
                <p className="font-semibold">Employes</p>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton
              className="mt-3"
              onClick={() => router.push("/dashboard/search")}
              isActive={pathname === "/dashboard/search"}
            >
              <div className=" flex items-center px-2 space-x-5">
                <Search />
                <p className="font-semibold">Search</p>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton
              className="mt-3"
              onClick={() => router.push("/dashboard/settings")}
              isActive={pathname === "/dashboard/settings"}
            >
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
                    <User /> {userData?.userName}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] bg-backgroundfw rounded-md"
                >
                  <DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full" variant={"ghost"}>
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-secondary">
                            Are you absolutely sure to logout
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                  <Separator className="w-[90%] border-secondary/20 mx-auto" />
                  <DropdownMenuItem></DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant={"ghost"}
                      className="w-full"
                      onClick={() => router.push("/dashboard/settings")}
                    >
                      Account
                    </Button>
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
