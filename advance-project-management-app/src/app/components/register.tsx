"use client";
import React from "react";
import { useRegisterUserMutation, useTestQuery } from "@/lib/features/auth";
import { useAppDispatch } from "../store/redux";
import { setCredentials } from "@/lib/state";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [triggerTest, setTriggerTest] = React.useState(false);
  const dispatch = useAppDispatch();

  const [registerUser] = useRegisterUserMutation();
  
  // Initialize useTestQuery without skipping
  const { data: testData, error: testError, isLoading: isTestLoading } = useTestQuery(triggerTest ? undefined : null, {
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
    setTriggerTest(true); // Set to true to trigger the query
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-500 w-2/3">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <Button color="red" className="text-black" variant={"secondary"} onClick={handleTest}>
        Test
      </Button>

      {isTestLoading && <p>Loading test data...</p>}
      {/* {testError && <p>Error fetching test data: {testError.message}</p>} */}
      {testData && <pre>{JSON.stringify(testData, null, 2)}</pre>}
    </div>
  );
};

export default Register;
