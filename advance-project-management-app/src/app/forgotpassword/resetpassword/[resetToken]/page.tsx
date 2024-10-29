"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useResetPasswordMutation } from "@/lib/features/auth";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/app/components/Spinner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const page = () => {
  const [password, setPassword] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const params = useParams<{ resetToken: string }>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      password !== ConfirmPassword ||
      password === "" ||
      ConfirmPassword === ""
    ) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    await resetPassword({ password, resetToken: params.resetToken })
      .unwrap()
      .then(() => {
        toast({ title: "Email sent successfully" });
        router.push("/");
      })
      .catch((error) =>
        toast({ title: error.data.message, variant: "destructive" })
      );
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className=" bg-opacity-80 bg-backgroundfw transition duration-150 ease-in-out rounded shadow-white/[0.25] border border-white/[0.12] w-1/3 h-2/4 relative">
        <div className="flex justify-center flex-col gap-3 w-[80%] h-[100%]  mx-auto ">
          <div>
            <h1 className="text-3xl font-bold text-secondary">
              Reset Password
            </h1>
          </div>
          <div>
            <form
              className="space-y-3 flex flex-col mt-4 "
              onSubmit={handleSubmit}
            >
              <Input
                type="password"
                placeholder="enter your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="confirm your new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="" variant={"secondary"} type="submit">
                {isLoading ? <Spinner /> : "submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
