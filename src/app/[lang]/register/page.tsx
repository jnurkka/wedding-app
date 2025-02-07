import React from "react";
import { getDictionary, Lang } from "../dictionaries";
import { LanguageSelector } from "../../components/LanguageSelector";
import { RegistrationSuccess } from "./Success";
import { OnePageContainer } from "@/app/components/OnePageContainer";

export default async function RegisterPage({
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
    <OnePageContainer>
      <LanguageSelector lang={lang} />
      <RegistrationSuccess dict={dict} email={email} />
    </OnePageContainer>
  );
}
