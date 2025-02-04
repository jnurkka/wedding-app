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
        {dict.contact.persons.map(({ name, title, telephone, link }) => (
          <Card key={name}>
            <CardTitle value={name} />
            {title && <p>{title}</p>}
            <a href={link}>{`☎️: ${telephone}`}</a>
          </Card>
        ))}
      </CardContainer>
    </SectionContainer>
  );
};
