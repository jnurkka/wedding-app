import React from "react";
import { Card, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";

export const Budget = () => {
  return (
    <SectionContainer bgColor="#E6D2C3">
      <SectionTitle value="Budget" color="#4A4238" />
      <Card>
        <CardTitle value="Important Considerations" />
        <div className="space-y-4 text-[#4A4238]">
          <p>
            We understand that showing up itself represents a significant
            financial investment for most of you. We wanted to have a
            full-weekend celebration to make the long travel worth it, and want
            to be fully transparent about the expected costs for you.
          </p>
          <p>
            🍻 Friday: We will pay the entrance fee of 15€ and provide Bavarian Brotzeitbrettl for everyone, rest of food and drinks are on you
            <br />
            🍾 Saturday: All food and drinks are on us
            <br />
            <br />
            ✈️ Because the wedding takes place during the Oktoberfest, book your flights early to save money!
            <br />
            🎁 Please don&apos;t feel obliged to spend even more money on a
            present, you coming to celebrate with us is more than we could ask
            for! 🫶
          </p>
        </div>
      </Card>
    </SectionContainer>
  );
};
