"use client";
import Header from "@/app/components/Header";
import { Input } from "@/components/ui/input";
import { ClockIcon, FilterIcon, FolderPlus, KanbanSquare, List, MailPlus, Settings, Share2Icon, Table, } from "lucide-react";
import React from "react";
import ModalNewProject from "@/app/components/modal/ProjectModal";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { useGetNotProjectTeamsQuery, useInviteTeamsMutation, } from "@/lib/features/project";
import { useToast } from "@/hooks/use-toast";

type Props = {
  isActiveTab: string;
  setIsActiveTab: React.Dispatch<React.SetStateAction<string>>;
  projectID: string;
};

const ProjectHeader = (props: Props) => {
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>();
  const [inviteTeams] = useInviteTeamsMutation();
  const { data: teams } = useGetNotProjectTeamsQuery(props.projectID);
  const { toast } = useToast();
  async function onHandleInviteTeam(value: string) {
    setValue(Number(value));
    setOpen(false);
    await inviteTeams({
      teamIds: [Number(value)],
      projectId: props.projectID,
    })
      .unwrap()
      .then(() => {
        toast({
          title: "Success",
          description: "Team has been invited successfully",
        });
      });
  }
  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModelNewTaskOpen}
        onClose={() => setIsModelNewTaskOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8 ">
        <Header
          name="product design"
          buttonComponent={
            <div className="flex gap-2 items-center justify-center">
              <Button
                variant="secondary"
                onClick={() => setIsModelNewTaskOpen(true)}
              >
                <FolderPlus className="mr-2 h-5 w-5" /> new project
              </Button>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant={"outline"}>
                    <MailPlus className="mr-2 h-5 w-5" /> Invite Team
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Teams..." />
                    <CommandList>
                      <CommandEmpty>No Teams found</CommandEmpty>
                      <CommandGroup>
                        {teams?.map((team) => (
                          <CommandItem
                            key={team.id}
                            value={team.id.toString()}
                            onSelect={onHandleInviteTeam}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === team.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {team.teamName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          }
        />
      </div>
      <div className="flex flex-wrap-reverse gap-2 border-y border-secondary/10 py-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Kanban"
            icon={<KanbanSquare className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<ClockIcon className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
          <TabButton
            name="Settings"
            icon={<Settings className="h-5 w-5" />}
            activeTab={props.isActiveTab}
            setActiveTab={props.setIsActiveTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-secondary hover:text-muted-foreground">
            <FilterIcon className="h-5 w-5" />
          </button>
          <button className="text-secondary hover:text-muted-foreground">
            <Share2Icon className="h-5 w-5" />
          </button>
          <div className="relative">
            <Input
              type="search"
              className="border border-secondary/10"
              placeholder="Search Tasks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type tabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ activeTab, icon, name, setActiveTab }: tabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center justify-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0  after:h-[1px] after:w-full hover:text-muted-foreground sm:px-2 lg:px-4 ${
        isActive
          ? "text-primary-foreground after:bg-secondary"
          : "text-secondary"
      } hover:text-primary-foreground`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
