"use client";

import React from "react";
import { submit } from "@/app/login/actions";
import { LoginFormComponent } from "./components/form";
import { CheckEmailComponent } from "./components/check-email";

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [emailSent, setEmailSent] = React.useState<boolean>(false);

  const handleSubmit = async (email: string) => {
    const response = await submit(email);
    if (response.status === "error") {
      if (response.error === "Signups not allowed for otp") {
        setError(
          "This email has not been invited. Please check your input or contact us to invite you to the wedding.",
        );
      } else {
        setError(
          "Something went wrong. Please try again later or contact us if the problem persists.",
        );
      }
    } else {
      setError(null);
      setEmailSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {!emailSent ? (
        <LoginFormComponent error={error} submit={handleSubmit} />
      ) : (
        <CheckEmailComponent />
      )}
    </div>
  );
}
