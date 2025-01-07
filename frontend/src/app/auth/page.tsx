"use client";

import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Page() {
  const [show, setShow] = useState("");

  return (
    <div>
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => {
            if (show !== "login") {
              setShow("login");
            } else {
              setShow("");
            }
          }}
          className="bg-slate-300 text-slate-600 text-2xl p-6 rounded-3xl"
          variant="outline"
        >
          login
        </Button>
        <Button
          onClick={() => {
            if (show !== "signup") {
              setShow("signup");
            } else {
              setShow("");
            }
          }}
          className="bg-slate-300 text-slate-600 text-2xl p-6 rounded-3xl"
          variant="outline"
        >
          signup
        </Button>
      </div>
      {show === "login" ? <Login /> : show === "signup" ? <SignUp /> : null}
    </div>
  );
}
