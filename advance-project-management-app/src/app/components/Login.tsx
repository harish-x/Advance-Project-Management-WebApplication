"use client";
import React, { useEffect } from "react";
import {
  useCheckUserQuery,
  useLoginUserMutation,
  useLoginWithOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/features/auth";
import { useAppDispatch } from "@/app/store/redux";
import { setCredentials } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isEmail, setIsEmail] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loginUser, { isLoading: isLoginLoading, isSuccess }] =
    useLoginUserMutation();
  const [loginWithOtp, { isLoading: isLoginWithOtpLoading }] =
    useLoginWithOtpMutation();
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const {
    isError,
    data: UserData,
    isLoading,
    isSuccess: isUserSuccess,
  } = useCheckUserQuery();
  useEffect(() => {
    if (isUserSuccess) {
      dispatch(setCredentials(UserData));

      toast({
        title: "Signed in successfully",
        description: "Welcome back !",
      });
      router.push("/dashboard");

    }
  },[isUserSuccess,isLoading,UserData]);
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
          router.push("/dashboard");
        });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signed in Failed",
        description: "Email or password is incorrect",
      });
    }
  }
  async function handleSendOTP() {
    await loginWithOtp({ email }).unwrap();
    setOtpSent(true);
  }

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);
  async function handleVerifyOTP() {
    try {
      await verifyOtp({ email, otp })
        .unwrap()
        .then((data) => {
          dispatch(setCredentials(data));
          toast({
            title: "Signed in successfully",
            description: "Welcome back !",
          });
          router.push("/dashboard");
        });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signed in Failed",
        description: "Email or password is incorrect",
      });
    }
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
          <div
            className={`flex flex-col gap-2 ${
              isEmail ? "hidden" : "block"
            } transition-all duration-300 transform ${
              isEmail ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
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
            <Button
              onClick={handleSubmit}
              variant={"secondary"}
              disabled={isLoginLoading}
              className="relative"
            >
              {isLoginLoading ? (
                <div className="w-5 absolute h-5">
                  <Spinner />
                </div>
              ) : (
                "Sing up"
              )}
            </Button>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-2 ${
              !isEmail ? "hidden" : "block"
            } transition-all duration-300 transform ${
              !isEmail ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {!otpSent ? (
              <>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant={"secondary"}
                  onClick={handleSendOTP}
                  disabled={isLoginWithOtpLoading}
                >
                  {isLoginWithOtpLoading ? <Spinner /> : "Send otp"}
                </Button>
              </>
            ) : (
              <div className="flex flex-col">
                <InputOTP
                  maxLength={6}
                  containerClassName="w-full mx-auto text-white"
                  value={otp}
                  onChange={(e) => setOtp(e)}
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
          </div>
        )}
        <div className="flex items-center mt-3 justify-between">
          <Link
            className="text-muted text-xs hover:text-red-500"
            href={"/forgotpassword"}
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
