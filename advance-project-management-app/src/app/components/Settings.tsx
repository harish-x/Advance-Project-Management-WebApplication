"use client";
import { useUserContext } from "@/app/dashboard/UserContext";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, FilePenLine, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useLogOutMutation } from "@/lib/features/auth";
import { useAppDispatch } from "../store/redux";
import { logOut } from "@/lib/state";
import { useRouter } from "next/navigation";
type Props = {};

const Settings = (props: Props) => {
  const { userData, isLoading: isUserLoading } = useUserContext();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const dispatch = useAppDispatch;
  const router = useRouter();
  const [logoutfunc] = useLogOutMutation();
  async function handleLogout() {
    sessionStorage.removeItem("access");
    await logoutfunc({})
      .unwrap()
      .then(() => {
          router.push("/");
          window.location.reload();
      });
  }
  return (
    <div className="bg-backgroundfw p-5 rounded-md mt-4">
      <h1 className="text-2xl font-semibold text-center">Settings</h1>
      <div className="h-1/4 w-1/4 mx-auto mt-2 flex flex-col items-center p-3">
        <Avatar className="w-15 h-15">
          <AvatarImage src={userData?.profilePicture} alt="@shadcn" />
          <AvatarFallback>
            {userData?.userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button className="mt-2" variant="secondary">
          Change Profile
        </Button>
      </div>

      <div className="flex justify-between ">
        <div>
          <form action="" className="space-y-2">
            <div className="flex  items-center gap-2">
              <p>Name:</p>
              {!editName ? (
                <>
                  <p className="border border-secondary/20 p-2 w-48 rounded">
                    {userData?.userName}
                  </p>
                  <button type="button" onClick={() => setEditName(true)}>
                    <Pencil />
                  </button>
                </>
              ) : (
                <>
                  <Input className="w-48" defaultValue={userData?.userName} />
                  <button type="button" onClick={() => setEditName(false)}>
                    <X />
                  </button>
                  <button>
                    <Check />
                  </button>
                </>
              )}
            </div>
            <div className="flex  items-center gap-2">
              <p>Email:</p>
              {!editEmail ? (
                <>
                  <p className="border border-secondary/20 p-2 w-48 rounded">
                    {userData?.email}
                  </p>
                  <button type="button" onClick={() => setEditEmail(true)}>
                    <Pencil />
                  </button>
                </>
              ) : (
                <>
                  <Input className="w-48" defaultValue={userData?.email} />
                  <button type="button" onClick={() => setEditEmail(false)}>
                    <X />
                  </button>
                  <button>
                    <Check />
                  </button>
                </>
              )}
            </div>
          </form>
          <div className="space-y-2 mt-2">
            <div className="flex  items-center gap-2">
              <p>Team:</p>
              <p className="border border-secondary/20 p-2 w-48 rounded">
                {userData?.team?.teamName}
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <p>Role:</p>
              <p className="border border-secondary/20 p-2 w-48 rounded">
                {userData?.role}
              </p>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"}>Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-secondary/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-secondary">
                  Are you absolutely sure to logout ?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-secondary text-primary hover:bg-white"
                  onClick={handleLogout}
                >
                  logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"destructive"}>Change password</Button>
            </DialogTrigger>
            <DialogContent className="w-1/4">
              <DialogHeader>
                <DialogTitle className="text-secondary">
                  Change password
                </DialogTitle>
                <DialogDescription>
                  Make changes to your Password here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 align-middle">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="name"
                    placeholder="Password"
                    className="col-span-3 "
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="name"
                    placeholder="new password"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="username"
                    placeholder="Confirm password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant={"secondary"}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Settings;
