import React from "react";
import { getDictionary, Lang } from "../dictionaries";
import { LanguageSelector } from "../../components/LanguageSelector";
import { RegistrationSuccess } from "./Success";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="relative h-screen w-screen items-center flex flex-col justify-center p-8 bg-[#E6D2C3] text-stone-700">
      <LanguageSelector lang={lang} />
      <RegistrationSuccess dict={dict} />
    </div>
  );
}
