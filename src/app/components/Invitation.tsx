import React from 'react';

export const SaveTheDate = () => {
  const programSections = [
    {
      day: 'Friday',
      date: '04.10.2025',
      events: [
        { time: '18:00', description: 'Welcome Dinner' },
        { time: '20:00', description: 'Evening Gathering' }
      ]
    },
    {
      day: 'Saturday',
      date: '05.10.2025',
      events: [
        { time: '14:00', description: 'Wedding Ceremony' },
        { time: '16:00', description: 'Cocktail Hour' },
        { time: '18:00', description: 'Wedding Reception & Dinner' },
        { time: '22:00', description: 'Party & Dancing' }
      ]
    },
    {
      day: 'Sunday',
      date: '06.10.2025',
      events: [
        { time: '11:00', description: 'Farewell Brunch' },
        { time: '14:00', description: 'Goodbyes' }
      ]
    }
  ];

  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll">
      {/* Landing Page */}
      <div
        className="relative h-screen w-screen bg-cover bg-center snap-start"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="font-['Great_Vibes'] text-8xl mb-4 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            Jasmin & Jaakko
          </h1>
          <div className="w-32 border-t-2 border-white mb-4"></div>
          <p className="font-['Great_Vibes'] text-6xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            04.10.2025
          </p>
        </div>
      </div>

      {/* Program Section */}
      <div
        className="relative h-screen w-screen bg-[#E6D2C3] flex flex-col justify-center items-center snap-start"
      >
        <div className="text-center mb-8">
          <h2 className="text-5xl font-['Great_Vibes'] text-[#4A4238] mb-4">
            Wedding Weekend Program
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-8 px-16">
          {programSections.map((section, index) => (
            <div
              key={index}
              className="bg-white/70 p-6 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-3xl font-['Great_Vibes'] text-[#4A4238] mb-2">
                {section.day}
              </h3>
              <p className="text-xl text-[#4A4238] mb-4">{section.date}</p>
              <ul>
                {section.events.map((event, eventIndex) => (
                  <li
                    key={eventIndex}
                    className="mb-2 text-[#4A4238]"
                  >
                    <span className="font-bold">{event.time}</span> - {event.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
