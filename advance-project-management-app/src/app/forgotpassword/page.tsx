"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForgotPasswordMutation, } from "@/lib/features/auth";
import { useToast } from "@/hooks/use-toast";
import Spinner from "../components/Spinner";
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await forgotPassword({ email })
      .unwrap()
      .then(() => toast({ title: "Email sent successfully" }))
      .catch((error) =>
        toast({ title: error.data.message, variant: "destructive" })
      );
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className=" bg-opacity-80 bg-backgroundfw transition duration-150 ease-in-out rounded shadow-white/[0.25] border border-white/[0.12] w-1/3 h-2/4 relative">
        <button className="absolute top-2 left-3 bg-white/10 hover:bg-white/20 transition duration-150 ease-in-out rounded-full p-1 text-white" type="button" onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <div className="flex justify-center flex-col gap-3 w-[80%] h-[100%]  mx-auto ">
          <div>
            <h1 className="text-3xl font-bold text-secondary">
              Forgot Password
            </h1>
          </div>
          <div>
            <form
              className="space-y-2 flex flex-col mt-4 "
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
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
