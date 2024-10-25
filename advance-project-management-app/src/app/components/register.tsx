"use client";
import React from "react";
import { useRegisterUserMutation } from "@/lib/features/auth"; 

type Props = {};

const Register = (props: Props) => {
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [teamId, setTeamId] = React.useState("");
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();
    async function handleSubmit() {
        try {
      await registerUser({ userName, email, password }).unwrap().then(
        (data) => {
          console.log(data);
      })
      // Successful registration; local state is updated through setCredentials
    } catch (err) {
      console.error("Registration error:", err);
    }
    }
  return (
    <div>
      <div className="bg-white flex flex-col"> 
        <input type="text" placeholder="userName" onChange={(e) => setUserName(e.target.value)} />
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
              <input type="number" placeholder="teamId" onChange={(e) => setTeamId(e.target.value)} />
              <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
};

export default Register;
