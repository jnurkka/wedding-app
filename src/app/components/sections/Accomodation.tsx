import React from "react";
import { SectionContainer } from "../SectionContainer";
import { Card, CardTitle } from "../Card";
import { SectionTitle } from "../SectionTitle";

export const Accommodation = () => {
  return (
    <SectionContainer bgImage="/hotel-interior.jpg" bgColor="white">
    <SectionTitle value="Accommodation" color="white" />
    <Card>
      <CardTitle value="Acker Hotel" />
        <div className="space-y-4 text-[#4A4238]">
          <p>
            We have reserved a contingency in the hotel right next to the party location for a special price of <strong>144€ per night</strong> for two people in the standard room, including a fantastic breakfast buffet.
          </p>
          <p>
            You can <strong>cancel your booking for free</strong> until 2 weeks before the wedding in case you can't make it.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="mailto:hotel@example.com?subject=Wedding%20Guest%20Reservation&body=Dear%20Hotel%20Team,%0A%0AI%20would%20like%20to%20book%20a%20double%20room%20for%20the%20wedding%20on%20September%2019-21,%202025.%0A%0AThank%20you."
              className="bg-[#4A4238] text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Reserve a room via email
            </a>
          </div>
          <p className="text-sm mt-4">
            Feel free to choose an alternative accommodation if you'd prefer.
          </p>
        </div>
      </Card>
    </SectionContainer>
  );
};