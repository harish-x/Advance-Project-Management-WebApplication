"use client";
import React from "react";
import { useLoginUserMutation } from "@/lib/features/auth";
import { useAppDispatch } from "../store/redux";
import { setCredentials } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [opt, setOpt] = React.useState("");
  const [isEmail, setIsEmail] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loginUser] = useLoginUserMutation();

  async function handleSubmit() {
    try {
      await loginUser({ email, password })
        .unwrap()
        .then((data) => {
          dispatch(setCredentials(data));
          toast({
            title: "Signed in successfully",
            description: "Welcome back !",
          });
        });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signed in Failed",
        description: "Email or password is incorrect",
      });
    }
  }
  function handleSendOTP() {
    setOtpSent(true);
  }

  return (
    <div className="flex flex-col gap-2 bg-opacity-80 bg-backgroundfw p-20 transition duration-150 ease-in-out rounded shadow-white/[0.25] border border-white/[0.12] w-2/3">
      <Image
        src={"/undraw_secure_login_pdn4.svg"}
        alt="logo"
        width={250}
        height={250}
        className="mx-auto"
      />
      <div className="pt-3 mx-auto">
        <span className="text-3xl font-extrabold text-purple-100 capitalize flex gap-2 items-center  ">
          <CircleUserRound size={30} /> SIGN UP
        </span>
      </div>
      <div className="py-2 flex flex-col gap-2">
        {!isEmail ? (
          <>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSubmit} variant={"secondary"}>
              Sing up
            </Button>
          </>
        ) : (
          <>
            {!otpSent ? (
              <>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant={"secondary"} onClick={handleSendOTP}>
                  Send OPT
                </Button>
              </>
            ) : (
              <div className="flex flex-col">
                <InputOTP
                  maxLength={6}
                  containerClassName="w-full mx-auto text-white"
                  value={opt}
                  onChange={(e) => setOpt(e)}
                >
                  <InputOTPGroup className="flex items-center justify-center mx-auto">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <button className="bg-transparent border-transparent text-muted hover:text-destructive mt-3 text-xs ">
                  {email} not this email ?
                </button>
              </div>
            )}
          </>
        )}
        <div className="flex items-center mt-3 justify-between">
          <Link
            className="text-muted text-xs hover:text-red-500"
            href={"/email"}
          >
            Forgot Password ?
          </Link>

          <hr className="h-px bg-gray-200 border-0 absolute dark:bg-gray-700" />
          <span className="text-muted text-sm  right-48">- or -</span>

          <button
            className="bg-transparent border-transparent text-muted text-xs hover:text-blue-500"
            onClick={() => setIsEmail(!isEmail)}
          >
            {isEmail ? "Login with password" : "Login with email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
