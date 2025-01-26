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
            We have reserved a contingency in the hotel right next to the party location for a nightly rate of <strong>144€ for two people in the standard room</strong>, including breakfast buffet.
          </p>
          <p>
            You can <strong>cancel your booking for free</strong> until 2 weeks before the wedding in case you can't make it.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="mailto:rezeption@dasacker.de?subject=Jasmin%20%26%20Jaakko%20Wedding%20Reservation&body=Please%20adjust%20the%20email%20according%20to%20your%20needs%20-%20the%20hotel%20belongs%20to%20the%20same%20company%20that%20helps%20us%20organise%20the%20wedding%2C%20and%20they%20will%20happily%20help%20accommodate%20your%20needs.%0A%0A---%0A%0ADear%20Acker%20Hotel%20Team%2C%0A%0AI%20would%20like%20to%20book%20a%20room%20for%20the%20wedding%20of%20Jasmin%20and%20Jaakko%20on%20September%2020th%2C%202025%20with%20the%20following%20requirements%3A%0A%0APersons%3A%202%0ANights%3A%202%0A%0APlease%20respond%20with%20a%20reservation%20confirmation.%0A%0ABest%20regards%2C%0A%0A---%0AThis%20email%20was%20autogenerated%20with%20a%20template%20provided%20by%20Jaakko%20%26%20Jasmin.%20If%20there%20are%20any%20issues%20with%20the%20email%2C%20please%20let%20Jaakko%20know%20via%20email%20(jaakko%40nurkka.me)."
              className="bg-[#4A4238] text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Reserve a room via email
            </a>
          </div>
          <p className="text-sm">
            You can also contact the hotel directly via telephone: <a href="tel:+49 8431 90766 0" className="text-[#4A4238] hover:underline">+49 8431 90766 0</a>
          </p>
          <p className="text-xs mt-6">
            You are free to choose an alternative accommodation if you'd like. Please let us know if you do, so that we can inform the hotel about our reduced need for the contingency.
          </p>
        </div>
      </Card>
    </SectionContainer>
  );
};