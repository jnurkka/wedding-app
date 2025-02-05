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
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const email = (await searchParams).email;
  return (
    <div className="relative h-screen w-screen items-center flex flex-col justify-center p-8 bg-[#E6D2C3] text-stone-700">
      <LanguageSelector lang={lang} />
      <LoginFormComponent submit={submitLogin} dict={dict} prefilledEmail={email} />
    </div>
  );
}
