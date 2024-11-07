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
  Paperclip,
  Plus,
  SendHorizontalIcon,
  Trash2,
  XIcon,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAttachmentsMutation,
  useCreateCommentMutation,
  useDeleteAttachmentsMutation,
  useDeleteCommentsMutation,
  useGetAttachmentsQuery,
  useGetCommentsQuery,
  useGetSingleTaskQuery,
} from "@/lib/features/task";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/app/dashboard/UserContext";
import Image from "next/image";
import Spinner from "../Spinner";
import { formatDistanceToNow } from "date-fns";

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
  const [prevFile, setPrevFile] = useState<string>("");
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const { data: comments, isLoading: IsCommentsLoading } = useGetCommentsQuery(
    taskId as string
  );
  const [deleteComment] = useDeleteCommentsMutation();

  const { data: attachments, isLoading: IsAttachmentsLoading } =
    useGetAttachmentsQuery(taskId as string);
  const [addOptionsOpen, setAddOptionsOpen] = useState(false);
  const dateformat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [showDeleteButton, setShowDeleteButton] = useState<string | null>(null);
  function handlePostComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postComment({ taskId, comment });
    setComment("");
  }
  const [createAttachments, { isLoading: IsAttachmentLoading }] =
    useCreateAttachmentsMutation();
  const [deleteAttachment] = useDeleteAttachmentsMutation();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddOptionsOpen(false);
    if (!event.target.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPrevFile(reader.result as string);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      try {
        await createAttachments({ file, taskId })
          .unwrap()
          .finally(() => setPrevFile(""));
      } catch (error: any) {
        toast({ title: error.data.message, variant: "destructive" });
      }
    }
  };
  async function handleDeleteAttachment(attachmentId: string) {
    await deleteAttachment(attachmentId)
      .unwrap()
      .then(() => {
        toast({ title: "Attachment deleted successfully" });
      });
  }

  async function handleDeleteComment(commentId: string) {
    await deleteComment(commentId)
      .unwrap()
      .then(() => {
        toast({ title: "Comment deleted successfully" });
      });
  }

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
            <div className="bg-backgroundfw overflow-y-scroll">
              <div className="p-5 space-y-2">
                <p className="text-secondary font-semibold text-xl">
                  {data?.title}
                </p>
                <Popover open={addOptionsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"secondary"}
                      className="font-semibold mt-2"
                      onClick={() => setAddOptionsOpen(!addOptionsOpen)}
                    >
                      {addOptionsOpen ? (
                        <span className="flex items-center gap-2">
                          <XIcon />
                          close
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Plus />
                          Add
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border border-secondary/20 w-[150px] px-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="uploadfile"
                        className="flex items-center py-2 justify-center gap-2 rounded-md cursor-pointer  text-sm hover:bg-secondary hover:text-primary"
                      >
                        <Paperclip size={18} />
                        Attach files
                      </label>
                      <Input
                        type="file"
                        placeholder="Add a file"
                        id="uploadfile"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        variant={"ghost"}
                        className="flex justify-start"
                        onClick={() => setAddOptionsOpen(false)}
                      >
                        <MessageCircleIcon />
                        Comment
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="flex justify-start text-destructive"
                      >
                        <BadgeAlertIcon />
                        Create Issue
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <h1 className="font-medium text-lg mt-2 text-secondary">
                  Attachments
                </h1>
                <div>
                  {prevFile !== "" && (
                    <div className="relative h-32 w-32 max-w-32 ">
                      <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
                        <Spinner />
                        <span className="text-secondary font-semibold text-center">
                          Uploading...
                        </span>
                      </div>
                      <Image
                        fill
                        src={prevFile}
                        alt="image"
                        className="z-10 opacity-25 rounded"
                      />
                    </div>
                  )}
                </div>
                <div>
                  {IsAttachmentsLoading ? (
                    <Spinner />
                  ) : (
                    <ScrollArea className="max-h-[300px] h-[max-content] rounded-md border-none px-2 py-1 w-full">
                      <div className="grid grid-cols-5 place-items-center justify-items-center gap-2">
                        {attachments &&
                          attachments?.map((attachment) => (
                            <div
                              className="relative h-32 w-32 max-w-32 flex justify-center items-center bg-gray-300 rounded p-1"
                              onMouseLeave={() => {
                                setIsDeleteButtonVisible(false);
                              }}
                            >
                              <img
                                src={attachment.fileUrl}
                                alt={attachment.fileName}
                                onMouseEnter={() => {
                                  setShowDeleteButton(attachment.id);
                                  setIsDeleteButtonVisible(true);
                                }}
                                className="rounded"
                              />
                              {isDeleteButtonVisible &&
                                showDeleteButton === attachment.id &&
                                userData.userId ===
                                  attachment.uploadBy.userId && (
                                  <Button
                                    className="absolute top-2 right-2 shadow-md text-center flex flex-col items-center w-5 h-5"
                                    variant={"destructive"}
                                    onClick={() =>
                                      handleDeleteAttachment(attachment.id)
                                    }
                                  >
                                    <Trash2 />
                                  </Button>
                                )}
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
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
                  {comments && comments?.length > 0 ? (
                    <ScrollArea className="max-h-[200px] h-[max-content] rounded-md border-none px-2 py-1 w-full">
                      {IsCommentsLoading
                        ? "Loading..."
                        : comments?.map((comment) => (
                            <div
                              className="flex gap-2 items-center justify-between my-2 bg-white/10 p-2 rounded space-x-2"
                              key={comment.id}
                            >
                              <div className="flex gap-2">
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
                                    {comment?.user?.userName}{" "}
                                    <span className="text-pretty text-xs text-gray-200 opacity-70 font-extralight">
                                      {formatDistanceToNow(
                                        new Date(comment?.createdAt),
                                        {
                                          includeSeconds: true,
                                          addSuffix: true,
                                        }
                                      )}
                                    </span>
                                  </p>
                                  <p className="text-secondary">
                                    {comment?.text}
                                  </p>
                                </div>
                              </div>

                              <div className="justify-self-end">
                                {userData?.userId === comment?.user?.userId && (
                                  <Button
                                    className="bg-transparent"
                                    variant={"destructive"}
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                  >
                                    <Trash2 />
                                  </Button>
                                )}
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
