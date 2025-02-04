import React from "react";
import { SectionContainer } from "../SectionContainer";
import { Card, CardTitle } from "../Card";
import { SectionTitle } from "../SectionTitle";
import { Dictionary } from "@/app/[lang]/types";

export const Accommodation = ({ dict }: { dict: Dictionary }) => {
  return (
    <SectionContainer
      id="accommodation"
      bgImage="/hotel-interior.webp"
      bgColor="white"
    >
      <SectionTitle value={dict.accommodation.title} color="white" />
      <Card>
        <CardTitle value="Acker Hotel" />
        <div className="space-y-4 text-[#4A4238]">
          <p>{dict.accommodation.price}</p>
          <p>{dict.accommodation.cancel}</p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href={`mailto:rezeption@dasacker.de?cc=jaakko+wedding@nurkka.me&subject=${dict.accommodation.reservation.subject}&body=${dict.accommodation.reservation.body}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              {dict.accommodation.book}
            </a>
          </div>
          <p className="text-sm">
            {dict.accommodation.contact}
            <a
              href="tel:+49 8431 90766 0"
              className="hover:underline"
            >
              +49 8431 90766 0
            </a>
          </p>
          <p className="text-xs mt-6">{dict.accommodation.alternative}</p>
        </div>
      </Card>
    </SectionContainer>
  );
};
