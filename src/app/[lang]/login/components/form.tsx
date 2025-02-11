"use client";
import React from "react";
import { Dictionary } from "../../types";
import { CheckEmailComponent } from "./check-email";
import { SubmitButton } from "@/app/components/SubmitButton";

export const LoginFormComponent = ({
  submit,
  dict,
  prefilledEmail,
}: {
  submit: (email: string, password?: string) => Promise<string>;
  dict: Dictionary;
  prefilledEmail?: string;
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [emailSent, setEmailSent] = React.useState<boolean>(false);
  const [askForPassword, setAskForPassword] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEmailSent(false);
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password =
        askForPassword === true
          ? (formData.get("password") as string)
          : undefined;
      const status = await submit(email, password);
      if (status === "success") {
        setAskForPassword(false);
        setEmailSent(true);
      } else if (status === "signups-not-allowed") {
        setAskForPassword(true);
      } else if (status === "rate-limit-exceeded") {
        setError(dict.login.rate_limit_exceeded);
      } else if (status === "unknown-error") {
        setError(dict.error.message);
      } else if (status === "wrong-password") {
        setError(dict.login.wrong_password);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : dict.error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (emailSent) {
    return <CheckEmailComponent dict={dict} />;
  }
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-bold">
        {dict.login.title}
      </h2>
      <p className="mt-2 text-center text-sm">{dict.login.subtitle}</p>
      <div className="mt-8">
        <div className="bg-white py-8 px-4 shadow rounded-md sm:px-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-stone-600 text-stone-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm bg-gray-50"
                  placeholder={dict.login.email}
                  defaultValue={prefilledEmail}
                />
              </div>
            </div>
            {askForPassword && (
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  {dict.login.password_info}
                </p>
                <input
                  id="password"
                  name="password"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-stone-600 text-stone-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm bg-gray-50"
                  placeholder={dict.login.password}
                />
              </div>
            )}
            {error !== null && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <SubmitButton
                isLoading={isLoading}
                text={dict.login.submit}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
