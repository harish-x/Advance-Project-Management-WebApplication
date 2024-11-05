"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import {
  BadgeAlertIcon,
  CalendarClockIcon,
  Calendar as CalendarIcon,
  MessageCircleIcon,
  MessageCircleOff,
  Paperclip,
  Plus,
  SendHorizontalIcon,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateProjectMutation } from "@/lib/features/project";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAttachmentsMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetSingleTaskQuery,
} from "@/lib/features/task";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/app/dashboard/UserContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  taskId: string;
};

const TaskDetailsModal = ({ isOpen, onClose, taskId }: Props) => {
  const { toast } = useToast();
  const { userData, isLoading: isUserLoading } = useUserContext();
  const { data } = useGetSingleTaskQuery(taskId as string);
  const [comment, setComment] = useState<string>("");
  const [postComment] = useCreateCommentMutation();
  const { data: comments, isLoading: IsCommentsLoading } = useGetCommentsQuery(
    taskId as string
  );
  const dateformat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  function handlePostComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postComment({ taskId, comment });
    setComment("");
  }
  const [createAttachments] = useCreateAttachmentsMutation();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      try {
        // Call the mutation with file and taskId
        await createAttachments({ file, taskId }).unwrap();
        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] min-w-[80%] min-h-[80vh]  flex flex-col">
          <DialogHeader className="h-[20px]">
            <DialogTitle className="text-secondary">
              {data?.name.toLocaleUpperCase()}
            </DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-rows-1 grid-cols-2 gap-4 mt-5">
            <div className="bg-backgroundfw">
              <div className="p-5 space-y-2">
                <p className="text-secondary font-semibold text-xl">
                  {data?.title}
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"secondary"}
                      className="font-semibold mt-2"
                    >
                      <Plus />
                      Add
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border border-secondary/20 w-[150px] px-2">
                    <div className="flex flex-col gap-1">
                      <Input
                        type="file"
                        placeholder="Add a file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button variant={"ghost"} className="flex justify-start">
                        <MessageCircleIcon />
                        Comment
                      </Button>
                      <Button variant={"ghost"} className="flex justify-start">
                        <BadgeAlertIcon />
                        Create Issue
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <h1 className="font-medium text-lg mt-2 text-secondary">
                  Description
                </h1>
                <p className="text-secondary">
                  {data?.description ?? "No Description..."}
                </p>
                <Separator />
                <h1 className="font-medium text-lg mt-2 text-secondary">
                  Comments
                </h1>
                <form
                  onSubmit={handlePostComment}
                  className="flex gap-2 items-center"
                >
                  <Avatar>
                    <AvatarImage src={userData?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>
                      {userData?.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button className="bg-transparent" variant={"outline"}>
                    <SendHorizontalIcon />
                  </Button>
                </form>
                <div>
                  {comments && comments.length > 0 ? (
                    <div>
                      <div className=" rounded-md border border-secondary/20 px-2 w-full">
                        {IsCommentsLoading
                          ? "Loading..."
                          : comments?.map((comment) => (
                              <div
                                className="flex gap-2 items-center my-2 bg-white/10 p-2 rounded space-x-2 "
                                key={comment.id}
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={comment?.user?.profilePicture}
                                    alt="@shadcn"
                                  />
                                  <AvatarFallback className="text-secondary">
                                    {comment?.user?.userName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-center">
                                  <p className="text-secondary">
                                    {comment?.user?.userName}
                                  </p>
                                  <p className="text-secondary">
                                    {comment?.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  ) : comments && comments?.length > 3 ? (
                    <ScrollArea className="h-[200px] rounded-md border border-secondary/20 p-4 w-full">
                      {IsCommentsLoading
                        ? "Loading..."
                        : comments?.map((comment) => (
                            <div
                              className="flex gap-2 items-center my-2 bg-white/10 p-2 rounded space-x-2"
                              key={comment.id}
                            >
                              <Avatar>
                                <AvatarImage
                                  src={comment?.user?.profilePicture}
                                  alt="@shadcn"
                                />
                                <AvatarFallback className="text-secondary">
                                  {comment?.user?.userName
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col justify-center">
                                <p className="text-secondary">
                                  {comment?.user?.userName}
                                </p>
                                <p className="text-secondary">
                                  {comment?.text}
                                </p>
                              </div>
                            </div>
                          ))}
                    </ScrollArea>
                  ) : (
                    <p className="text-secondary border border-secondary/20 p-2 rounded">
                      No comments
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className=" min-h-[300px] flex flex-col justify-between border  border-white/20 rounded p-2">
              <div className="flex text-secondary flex-col">
                <h1 className="px-2 font-semibold text-lg">Details</h1>
                <Separator />
                <div className="grid grid-rows-1 grid-cols-2 gap-4 mt-3 px-4">
                  <p className="text-secondary flex items-center">Assignee</p>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={data?.assignee?.profilePicture}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {data?.assignee?.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{data?.assignee?.userName}</p>
                  </div>
                  <p className="text-secondary flex items-center">
                    Assigned By
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={data?.author?.profilePicture}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {data?.author?.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{data?.author?.userName}</p>
                  </div>
                  <p className="text-secondary flex items-center">
                    Created Date
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <p>
                      {data?.startDate
                        ? dateformat.format(new Date(data?.startDate))
                        : "No date"}
                    </p>
                  </div>
                  <p className="text-secondary flex items-center">Due Date</p>
                  <div className="flex items-center gap-2">
                    <CalendarClockIcon />
                    <p className="text-center">
                      {data?.dueDate
                        ? dateformat.format(new Date(data?.dueDate))
                        : "No Due date"}
                    </p>
                  </div>
                  <p className="text-secondary flex items-center">Points</p>
                  <div className="flex items-center gap-2">
                    <p className="text-center">{data?.points}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetailsModal;
