"use client";

import { Accommodation } from "../components/sections/Accomodation";
import { Budget } from "../components/sections/Budget";
import { Landing } from "../components/sections/Landing";
import { Location } from "../components/sections/Location";
import { Program } from "../components/sections/Program";
import { Response } from "../components/sections/Response";
import { TravelInfo } from "../components/sections/TravelInfo";
import { Registration } from "../data";
import { NavigationDots } from "../components/NavigationDots";
import { Dictionary } from "../[lang]/types";
import { Lang } from "../[lang]/dictionaries";
import { LanguageSelector } from "../components/LanguageSelector";
import { Questions } from "../components/sections/Questions";
import { Contact } from "../components/sections/Contact";

export const SaveTheDate = ({
  registration,
  submitRegistration,
  email,
  dict,
  lang,
}: {
  registration: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
  email: string;
  dict: Dictionary;
  lang: Lang;
}) => {
  const sectionIds = [
    "landing",
    "program",
    "location",
    "accommodation",
    "travel-info",
    "budget",
    "response",
    "faq",
    "contact",
  ];

  return (
    <div className="text-stone-700">
      <NavigationDots sections={sectionIds} />
      <LanguageSelector lang={lang} />
      <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll relative">
        <Landing start="19.09." end="21.09.2025" dict={dict} />
        <Program dict={dict} />
        <Location dict={dict} />
        <Accommodation dict={dict} />
        <TravelInfo dict={dict} />
        <Budget dict={dict} />
        <Response
          registration={registration}
          submitRegistration={submitRegistration}
          email={email}
          dict={dict}
        />
        <Questions dict={dict} />
        <Contact dict={dict} />
      </div>
    </div>
  );
};
