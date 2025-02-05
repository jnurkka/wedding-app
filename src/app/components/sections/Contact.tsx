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
                <a className="hover:underline" href={link}>
                  {telephone}
                </a>
              </p>
            ))}
          </Card>
        ))}
      </CardContainer>
    </SectionContainer>
  );
};
