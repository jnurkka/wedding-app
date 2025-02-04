"use client";
import React from "react";
import { Dictionary } from "../../types";
import { CheckEmailComponent } from "./check-email";

export const LoginFormComponent = ({
  submit,
  dict,
}: {
  submit: (email: string) => Promise<string>;
  dict: Dictionary;
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [emailSent, setEmailSent] = React.useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const status = await submit(email);
    if (status === "success") {
      setError(null);
      setEmailSent(true);
    } else if (status === "signups-not-allowed") {
      setError(dict.login.not_invited);
      setEmailSent(false);
    } else if (status === "rate-limit-exceeded") {
      setError(dict.login.rate_limit_exceeded);
      setEmailSent(false);
    } else if (status === "unknown-error") {
      setError(dict.error.message);
      setEmailSent(false);
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
      <p className="mt-2 text-center text-sm">
        {dict.login.subtitle}
      </p>
      <div className="mt-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                />
              </div>
            </div>
            {error !== null && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {dict.login.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
