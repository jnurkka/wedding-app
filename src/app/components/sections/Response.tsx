"use client";

import React, { Suspense, useState } from "react";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card } from "../Card";
import { Registration } from "@/app/data";
import { Dictionary } from "@/app/[lang]/types";
import { SubmitButton } from "@/app/components/SubmitButton";

export const Response = ({
  registration,
  submitRegistration,
  email,
  dict,
}: {
  registration?: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
  email: string;
  dict: Dictionary;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await submitRegistration({
        people_sat: parseInt((data.get("people_sat") as string) || "0", 10),
        people_fr: parseInt((data.get("people_fr") as string) || "0", 10),
        staying_sat: data.get("staying_sat") === "on",
        staying_fr: data.get("staying_fr") === "on",
        name: data.get("respondentName") as string,
        diet: data.get("diet") as string,
        comment: data.get("comment") as string,
      });
      setSubmitMessage(dict.rsvp.success);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setSubmitMessage(dict.error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitText =
    registration !== null ? dict.rsvp.update : dict.rsvp.submit;

  return (
    <Suspense
      fallback={
        <div>
          <p>Loading...</p>
        </div>
      }
    >
      <SectionContainer id="response" bgColor="#E6D2C3">
        <SectionTitle value={dict.rsvp.title} />
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <span className="block text-sm mb-2 text-center md:text-left">
              {`${dict.rsvp.email}: ${email}`}
            </span>
            {registration?.created_at && (
              <span className="block text-sm mb-2 text-center md:text-left">
                {`${dict.rsvp.created_at}: ${new Date(registration.created_at).toLocaleDateString()}`}
              </span>
            )}
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="block mb-2 font-semibold">
                  {dict.rsvp.name}
                </span>
                <input
                  type="text"
                  name="respondentName"
                  defaultValue={registration?.name || ""}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                  placeholder={dict.rsvp.name}
                  required
                />
              </label>
              <label className="block ">
                <span className="block mb-2 font-semibold">
                  {dict.rsvp.people_friday}
                </span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  name="people_fr"
                  defaultValue={registration?.people_fr}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                  placeholder={dict.rsvp.people_friday}
                />
              </label>
              <label className="block ">
                <span className="block mb-2 font-semibold">
                  {dict.rsvp.people_saturday}
                </span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  name="people_sat"
                  defaultValue={registration?.people_sat}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                  placeholder={dict.rsvp.people_saturday}
                />
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={registration?.staying_fr}
                  name="staying_fr"
                  className="form-checkbox  transition-all"
                />
                <span className="text-left  group-hover:/80 transition-colors">
                  {dict.rsvp.hotel_friday}
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={registration?.staying_sat}
                  name="staying_sat"
                  className="form-checkbox  transition-all"
                />
                <span className="text-left  group-hover:/80 transition-colors">
                  {dict.rsvp.hotel_saturday}
                </span>
              </label>
            </div>
            <label className="block ">
              <span className="block mb-2 font-semibold">{dict.rsvp.diet}</span>
              <textarea
                name="diet"
                rows={2}
                defaultValue={registration?.diet || ""}
                className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                placeholder={dict.rsvp.diet_placeholder}
              />
            </label>
            <label className="block ">
              <span className="block mb-2 font-semibold">
                {dict.rsvp.comment}
              </span>
              <textarea
                name="comment"
                defaultValue={registration?.comment || ""}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all resize-y"
                placeholder={dict.rsvp.comment_placeholder}
              />
            </label>
            {submitMessage && (
              <p
                className={`mt-4 text-center ${submitMessage.includes("error") ? "text-red-500" : "text-green-500"}`}
              >
                {submitMessage}
              </p>
            )}
            <div className="text-center">
              <SubmitButton
                isLoading={isSubmitting}
                text={submitText}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </Card>
      </SectionContainer>
    </Suspense>
  );
};
