"use client";

import React, { useState, useEffect } from "react";

interface NavigationDotsProps {
  sections: string[];
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(
              (section) => section === entry.target.id,
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(sections[index]);
    sectionElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-2 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(index)}
          className={`
            w-2 h-2 rounded-full transition-all duration-300 bg-white
            ${
              activeSection === index
                ? "scale-150 opacity-100"
                : "bg-opacity-50 hover:bg-opacity-100 hover:scale-150 hover:opacity-75 opacity-50"
            }
          `}
          aria-label={`Navigate to ${section} section`}
        />
      ))}
    </div>
  );
};
