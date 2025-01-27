"use client";

import React, { Suspense, useState } from "react";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card, CardTitle } from "../Card";
import { Registration } from "@/app/data";

export const Response = ({
  registration,
  submitRegistration,
}: {
  registration?: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target);

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const status = await submitRegistration({
        joining: data.get("joining") === "on",
        joining_fr: data.get("joining_fr") === "on",
        people: parseInt(data.get("people") || "0", 10),
        staying: data.get("staying") === "on",
        staying_fr: data.get("staying_fr") === "on",
      });
      console.log("Status:", status);
      setSubmitMessage("Your response has been saved successfully!");
    } catch (error) {
      console.error("Error submitting registration:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense
      fallback={
        <div>
          <p>Loading...</p>
        </div>
      }
    >
      <SectionContainer bgColor="#E6D2C3">
        <SectionTitle value="RSVP" color="black" />
        <Card>
          <CardTitle value="Your personal response" />
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A4238] mb-4">
                Event Attendance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registration?.joining}
                    name="joining"
                    className="form-checkbox h-5 w-5 text-[#4A4238] rounded focus:ring-[#4A4238]"
                  />
                  <span className="text-[#4A4238]">Joining on Saturday</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registration?.joining_fr}
                    name="joining_fr"
                    className="form-checkbox h-5 w-5 text-[#4A4238] rounded focus:ring-[#4A4238]"
                  />
                  <span className="text-[#4A4238]">Joining on Friday</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A4238] mb-4">
                Hotel Accommodation
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registration?.staying}
                    name="staying"
                    className="form-checkbox h-5 w-5 text-[#4A4238] rounded focus:ring-[#4A4238]"
                  />
                  <span className="text-[#4A4238]">
                    Staying in Hotel on Saturday
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registration?.staying_fr}
                    name="staying_fr"
                    className="form-checkbox h-5 w-5 text-[#4A4238] rounded focus:ring-[#4A4238]"
                  />
                  <span className="text-[#4A4238]">
                    Staying in Hotel on Friday
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A4238] mb-4">
                Number of Guests
              </h3>
              <div className="flex items-center space-x-4">
                <label className="block text-[#4A4238]">
                  Total Number of People
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={registration?.people}
                    name="people"
                    className="mt-2 block w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#4A4238]"
                  />
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-xs mx-auto bg-[#4A4238] text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#4A4238] focus:ring-opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </button>
            </div>

            {submitMessage && (
              <p
                className={`mt-4 text-center ${submitMessage.includes("error") ? "text-red-500" : "text-green-500"}`}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </Card>
      </SectionContainer>
    </Suspense>
  );
};
