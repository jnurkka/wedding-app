import React from "react";
import { Card, CardContainer, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Dictionary } from "@/app/[lang]/types";

export const Questions = ({ dict }: { dict: Dictionary }) => {
  return (
    <SectionContainer id="faq" bgColor="#E6D2C3">
      <SectionTitle value={dict.faq.title} color="#4A4238" />
      <CardContainer cols={1}>
        {dict.faq.questions.map(({ question, answer }) => (
          <Card key={question}>
            <CardTitle value={question}/>
            <p>{answer}</p>
          </Card>
        ))}
      </CardContainer>
    </SectionContainer>
  );
};
