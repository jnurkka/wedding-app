"use server";

import Link from "next/link";
import { Card } from "@/app/components/Card";
import { getDictionary, Lang } from "../dictionaries";
import { LanguageSelector } from "../../components/LanguageSelector";

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  return (
    <div className="relative h-screen w-screen items-center flex flex-col justify-center p-8 bg-[#E6D2C3] text-stone-700">
      <LanguageSelector lang={lang} />
      <Card>
        <h1 className="text-4xl text-red-600 mb-4">{dict.error.title}</h1>
        <p className="text-lg text-[#4A4238] mb-6">{dict.error.message}</p>
        <Link
          href="/"
          className="
            inline-block
            px-6
            py-3
            bg-red-600
            text-white
            rounded-lg
            hover:bg-red-300
            transition-colors
            duration-300
            shadow-md
            hover:shadow-lg
          "
        >
          {dict.error.back}
        </Link>
      </Card>
    </div>
  );
}
