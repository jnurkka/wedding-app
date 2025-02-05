import React from "react";
import { Card, CardContainer, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Dictionary } from "@/app/[lang]/types";

export const Contact = ({ dict }: { dict: Dictionary }) => {
  return (
    <SectionContainer id="contact" bgColor="#E6D2C3">
      <SectionTitle value={dict.contact.title} color="#4A4238" />
      <CardContainer cols={1}>
        {dict.contact.groups.map(({ name, people }) => (
          <Card key={name}>
            <CardTitle value={name} />
            {people.map(({ name: personName, telephone, link }) => (
              <p key={personName}>
                {personName}:{" "}
                <a className="hover:underline" href={link} target="_blank" rel="noopener noreferrer">
                  {telephone}
                </a>
              </p>
            ))}
          </Card>
        ))}
      </CardContainer>
      <footer className="absolute bottom-0 w-full py-2 text-center text-sm text-stone-900">
        Built with ❤️ (and a bit of AI) by Jaakko
      </footer>
    </SectionContainer>
  );
};
