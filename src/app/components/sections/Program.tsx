import { Dictionary } from "@/app/[lang]/types";
import { Card, CardContainer, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";

export const Program = ({dict}: {dict: Dictionary}) => {
  const programSections = [
    {
      fullDate: dict.weekdays.Friday,
      events: [
        { time: "15:00", description: dict.program.checkin },
        { time: "18:00", description: dict.program.party },
      ],
    },
    {
      fullDate: dict.weekdays.Saturday,
      events: [
        { time: "13:00", description: dict.program.wedding },
        { time: "02:00", description: dict.program.lightsout },
      ],
    },
    {
      fullDate: dict.weekdays.Sunday,
      events: [
        { time: "09:00", description: dict.program.brunch },
        { time: "11:00", description: dict.program.checkout },
      ],
    },
  ];
  return (
  <SectionContainer id="program" bgColor="#6C808C" bgImage="/acker-alm.webp">
    <SectionTitle value={dict.program.title} color="white" />
    <CardContainer cols={3}>
      {programSections.map((section, index) => (
        <Card key={index}>
          <CardTitle value={section.fullDate} />
          <ul>
            {section.events.map((event, eventIndex) => (
              <li
                key={eventIndex}
                className="mb-2 text-[#4A4238] max-sm:text-base"
              >
                <span className="font-bold">{event.time}</span> -{" "}
                {event.description}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </CardContainer>
  </SectionContainer>
);
}