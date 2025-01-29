'use client'

import { useEffect } from 'react';
import { Accommodation } from "../components/sections/Accomodation";
import { Budget } from "../components/sections/Budget";
import { Landing } from "../components/sections/Landing";
import { Location } from "../components/sections/Location";
import { Program } from "../components/sections/Program";
import { Response } from "../components/sections/Response";
import { TravelInfo } from "../components/sections/TravelInfo";
import { Registration } from "../data";
import { NavigationDots } from "../components/NavigationDots";
import { Dictionary } from '../[lang]/types';

export const SaveTheDate = ({
  registration,
  submitRegistration,
  email,
  dict
}: {
  registration: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
  email: string;
  dict: Dictionary;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sectionIds = [
    'landing',
    'program',
    'location',
    'accommodation',
    'travel-info',
    'budget',
    'response'
  ];

  return (
    <>
    <NavigationDots sections={sectionIds} />
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll relative">
      <Landing  start="19.09." end="21.09.2025" />
      <Program  dict={dict} />
      <Location dict={dict} />
      <Accommodation  dict={dict} />
      <TravelInfo dict={dict} />
      <Budget  dict={dict} />
      <Response
        registration={registration}
        submitRegistration={submitRegistration}
        email={email}
        dict={dict}
      />
    </div>
    </>
  );
};
