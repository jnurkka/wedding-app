import { Card, CardContainer, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";

const programSections = [
  {
    day: "Friday",
    date: "19.09.2025",
    fullDate: "Friday, September 19th",
    events: [
      { time: "15:00", description: "Check-in Hotel" },
      { time: "18:00", description: "Oktoberfest Party" },
    ],
  },
  {
    day: "Saturday",
    date: "20.09.2025",
    fullDate: "Saturday, September 20th",
    events: [
      { time: "13:30", description: "Wedding Ceremony" },
      { time: "02:00", description: "Lights out" },
    ],
  },
  {
    day: "Sunday",
    date: "21.09.2025",
    fullDate: "Sunday, September 21st",
    events: [
      { time: "09:00", description: "Brunch" },
      { time: "11:00", description: "Check-out Hotel" },
    ],
  },
];

export const Program = () => (
  <SectionContainer id="program" bgColor="#6C808C" bgImage="/acker-alm.webp">
    <SectionTitle value="Program Highlights" color="white" />
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
