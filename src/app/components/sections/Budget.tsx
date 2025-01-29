import React from "react";
import { Card, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Dictionary } from "@/app/[lang]/types";

export const Budget = ({dict}: {dict: Dictionary}) => {
  return (
    <SectionContainer id="budget" bgColor="#E6D2C3">
      <SectionTitle value={dict.budget.title} color="#4A4238" />
      <Card>
        <div className="space-y-4 text-[#4A4238]">
          <p>
            {dict.budget.description}
          </p>
          <CardTitle value={dict.budget.subtitle} />
          <p className="text-left">
            {dict.budget.friday}
            <br />
            {dict.budget.saturday}
            <br />
            <br />
            {dict.budget.flights}
            <br />
            {dict.budget.presents}
          </p>
        </div>
      </Card>
    </SectionContainer>
  );
};
