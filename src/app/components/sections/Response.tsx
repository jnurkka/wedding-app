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
  const [peopleSat, setPeopleSat] = useState(registration?.people_sat || 0);

  // Clear success message when form changes
  const handleFormChange = () => {
    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const people_sat = parseInt((data.get("people_sat") as string) || "0", 10);

      // Validate menu selections for each participant
      for (let i = 0; i < people_sat; i++) {
        const appetizer = data.get(`participant_${i}_appetizer`) as string;
        const main = data.get(`participant_${i}_main`) as string;

        if (!appetizer || appetizer === "") {
          setSubmitMessage(`Please select an appetizer for participant ${i + 1}`);
          setIsSubmitting(false);
          return;
        }

        if (!main || main === "") {
          setSubmitMessage(`Please select a main course for participant ${i + 1}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Collect menu selections for each participant
      const menu_selections: { [participantIndex: number]: { name?: string; appetizer?: string; main?: string } } = {};
      for (let i = 0; i < people_sat; i++) {
        const participantName = data.get(`participant_${i}_name`) as string;
        const appetizer = data.get(`participant_${i}_appetizer`) as string;
        const main = data.get(`participant_${i}_main`) as string;
        if (participantName || appetizer || main) {
          menu_selections[i] = {
            name: participantName || undefined,
            appetizer: appetizer || undefined,
            main: main || undefined,
          };
        }
      }

      await submitRegistration({
        people_sat,
        people_fr: parseInt((data.get("people_fr") as string) || "0", 10),
        staying_sat: data.get("staying_sat") === "on",
        staying_fr: data.get("staying_fr") === "on",
        name: data.get("respondentName") as string,
        diet: data.get("diet") as string,
        comment: data.get("comment") as string,
        menu_selections: Object.keys(menu_selections).length > 0 ? menu_selections : undefined,
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

  // Menu options
  const appetizerOptions = [
    { value: "", label: "Select..." },
    { value: "finnish_salmon_soup", label: `🐟 ${dict.menu.form.finnish_salmon_soup}` },
    { value: "vegetarian_soup", label: `🥬 ${dict.menu.form.vegetarian_soup}` },
  ];

  const mainOptions = [
    { value: "", label: "Select..." },
    { value: "braised_beef", label: `🐮 ${dict.menu.form.braised_beef}` },
    { value: "saibling_filet", label: `🐟 ${dict.menu.form.saibling_filet}` },
    { value: "stuffed_schlutzkrapfen", label: `🥬 ${dict.menu.form.stuffed_schlutzkrapfen}` },
  ];

  // Generate participant rows for menu selection
  const renderParticipantMenuSelections = () => {
    if (peopleSat === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#4A4238] border-b border-stone-300 pb-2">
          {dict.rsvp.menu_selection}
        </h3>
        <p className="text-sm text-stone-600 mb-4">
          {dict.rsvp.menu_selection_description}{" "}
          <button
            type="button"
            onClick={() => {
              document.getElementById('menu-info')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="text-[#4A4238] underline hover:text-[#4A4238]/80 transition-colors cursor-pointer"
          >
            {dict.rsvp.menu_selection_link}
          </button>
        </p>
        {Array.from({ length: peopleSat }, (_, i) => (
          <div key={i} className="bg-[#E6D2C3] p-4 rounded-lg space-y-3">
            <div className="space-y-3">
              <label className="block">
                <input
                  type="text"
                  name={`participant_${i}_name`}
                  defaultValue={
                    i === 0
                      ? registration?.name || registration?.menu_selections?.[i]?.name || ""
                      : registration?.menu_selections?.[i]?.name || ""
                  }
                  placeholder={dict.rsvp.participant_name_placeholder}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all text-sm"
                  required
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="block mb-2 text-sm font-medium">
                  {dict.menu.vorspeise.title}
                </span>
                <select
                  name={`participant_${i}_appetizer`}
                  defaultValue={registration?.menu_selections?.[i]?.appetizer || ""}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all text-sm"
                  required
                >
                  {appetizerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block mb-2 text-sm font-medium">
                  {dict.menu.hauptspeise.title}
                </span>
                <select
                  name={`participant_${i}_main`}
                  defaultValue={registration?.menu_selections?.[i]?.main || ""}
                  className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all text-sm"
                  required
                >
                  {mainOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
            <span className="block text-sm mb-2 text-center md:text-left">
              {`${dict.rsvp.email}: ${email}`}
            </span>
            {registration?.created_at && (
              <span className="block text-sm mb-2 text-center md:text-left">
                {`${dict.rsvp.created_at}: ${new Date(registration.created_at).toLocaleDateString('de-DE')}`}
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

              {/* Inline people count section */}
              <div className="space-y-3">
                <span className="block font-semibold">{dict.rsvp.number_of_people}</span>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block mb-2 text-sm">
                      {dict.rsvp.people_friday}
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      name="people_fr"
                      defaultValue={registration?.people_fr}
                      className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="block mb-2 text-sm">
                      {dict.rsvp.people_saturday}
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      name="people_sat"
                      defaultValue={registration?.people_sat}
                      onChange={(e) => {
                        setPeopleSat(parseInt(e.target.value) || 0);
                        handleFormChange();
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#4A4238] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A4238]/50 transition-all"
                    />
                  </label>
                </div>
              </div>

              {/* Compact hotel section */}
              <div className="space-y-3">
                <span className="block font-semibold">{dict.rsvp.staying_in_hotel}</span>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={registration?.staying_fr}
                      name="staying_fr"
                      className="form-checkbox transition-all"
                    />
                    <span className="text-left group-hover:text-opacity-80 transition-colors">
                      {dict.rsvp.hotel_friday}
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={registration?.staying_sat}
                      name="staying_sat"
                      className="form-checkbox transition-all"
                    />
                    <span className="text-left group-hover:text-opacity-80 transition-colors">
                      {dict.rsvp.hotel_saturday}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Menu Selection Section */}
            {renderParticipantMenuSelections()}

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
