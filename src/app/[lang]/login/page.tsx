import React from "react";
import { submit } from "@/app/[lang]/login/actions";
import { LoginFormComponent } from "./components/form";
import { getDictionary, Lang } from "../dictionaries";
import { LanguageSelector } from "../../components/LanguageSelector";

async function submitLogin(email: string): Promise<string> {
  "use server";
  const response = await submit(email);
  if (response.status === "error") {
    if (response.error === "Signups not allowed for otp") {
      return "signups-not-allowed";
    } else if (response.error === "email rate limit exceeded") {
      return "rate-limit-exceeded";
    } else {
      return "unknown-error";
    }
  } else {
    return "success";
  }
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LanguageSelector lang={lang} />
      <LoginFormComponent submit={submitLogin} dict={dict} />
    </div>
  );
}
