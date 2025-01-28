"use client";

import React, { Suspense, useState } from "react";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card, CardTitle } from "../Card";
import { Registration } from "@/app/data";

export const Response = ({
  registration,
  submitRegistration,
  email,
}: {
  registration?: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
  email: string;
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
        people_sat: parseInt(data.get("people_sat") || "0", 10),
        people_fr: parseInt(data.get("people_fr") || "0", 10),
        staying_sat: data.get("staying_sat") === "on",
        staying_fr: data.get("staying_fr") === "on",
        name: data.get("respondentName") as string,
        diet: data.get("diet") as string,
        comment: data.get("comment") as string,
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
              <h3 className="text-xl font-bold text-[#4A4238] mb-4 text-center">
                Your attendance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-[#4A4238] text-sm mb-2 text-center md:text-left">
                    Your email: {email}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <label className="block text-[#4A4238]">
                  <span className="block mb-2 font-semibold">Your name</span>
                  <input
                    type="text"
                    name="respondentName"
                    defaultValue={registration?.name || ""}
                    className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </label>
                <label className="block text-[#4A4238]">
                  <span className="block mb-2 font-semibold">No of people (Friday)</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    name="people_fr"
                      defaultValue={registration?.people_fr}
                      className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                    />
                  </label>
                  <label className="block text-[#4A4238]">
                    <span className="block mb-2 font-semibold">No of people (Saturday)</span>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="people_sat"
                      defaultValue={registration?.people_sat}
                      className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                    />
                  </label>
              </div>
              <h3 className="text-xl font-bold text-[#4A4238] mb-4 text-center">
                Hotel Accommodation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked={registration?.staying_fr}
                    name="staying_fr"
                    className="form-checkbox text-[#4A4238] transition-all"
                  />
                  <span className="text-left text-[#4A4238] group-hover:text-[#4A4238]/80 transition-colors">
                    Staying in the Acker Hotel on Friday
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked={registration?.staying_sat}
                    name="staying_sat"
                    className="form-checkbox text-[#4A4238] transition-all"
                  />
                  <span className="text-left text-[#4A4238] group-hover:text-[#4A4238]/80 transition-colors">
                    Staying in the Acker Hotel on Saturday
                  </span>
                </label>
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
