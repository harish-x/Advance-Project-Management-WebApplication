"use client";
import React from "react";
import { useRegisterUserMutation, useTestQuery } from "@/lib/features/auth";
import { useAppDispatch } from "../store/redux";
import { setCredentials } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

const Register = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [triggerTest, setTriggerTest] = React.useState(false);
  const dispatch = useAppDispatch();

  const [registerUser] = useRegisterUserMutation();

  const {
    data: testData,
    error: testError,
    isLoading: isTestLoading,
  } = useTestQuery(triggerTest ? undefined : null, {
    skip: !triggerTest, // Skip the query unless triggerTest is true
  });

  async function handleSubmit() {
    try {
      await registerUser({ userName, email, password })
        .unwrap()
        .then((data) => {
          dispatch(setCredentials(data));
        });
    } catch (err) {
      console.error("Registration error:", err);
    }
  }

  function handleTest() {
    setTriggerTest(true);
  }

  return (
    <div className="flex flex-col gap-2 bg-opacity-80 bg-backgroundfw p-20 rounded shadow-white/[0.25] border border-white/[0.12] w-2/3">
      <Image
        src={"/undraw_secure_login_pdn4.svg"}
        alt="logo"
        width={250}
        height={250}
        className="mx-auto"
      />
      <div className="py-3 mx-auto">
        <span className="text-3xl font-extrabold text-purple-100 capitalize flex gap-2 items-center  ">
          <CircleUserRound size={30} /> SIGN IN
        </span>
      </div>
      <div className="py-2 flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
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
          Submit
        </Button>
      </div>

      {isTestLoading && <p>Loading test data...</p>}
      {/* {testError && <p>Error fetching test data: {testError.message}</p>} */}
      {testData && <pre>{JSON.stringify(testData, null, 2)}</pre>}
    </div>
  );
};

export default Register;
