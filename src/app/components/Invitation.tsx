import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

export const SaveTheDate = () => {
  const programSections = [
    {
      day: 'Friday',
      date: '04.10.2025',
      fullDate: 'Friday, September 19th',
      events: [
        { time: '15:00', description: 'Check-in Hotel' },
        { time: '18:00', description: 'Oktoberfest Party' }
      ]
    },
    {
      day: 'Saturday',
      date: '05.10.2025',
      fullDate: 'Saturday, September 20th',
      events: [
        { time: '13:00', description: 'Wedding Ceremony' },
        { time: '02:00', description: 'Afterparty' },
      ]
    },
    {
      day: 'Sunday',
      date: '06.10.2025',
      fullDate: 'Sunday, September 21st',
      events: [
        { time: '09:00', description: 'Brunch' },
        { time: '11:00', description: 'Check-out Hotel' }
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
          <h1 className="font-['Great_Vibes'] text-8xl mb-4 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-5xl">
            Jasmin & Jaakko
          </h1>
          <div className="w-32 border-t-2 border-white mb-4"></div>
          <p className="font-['Great_Vibes'] text-6xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-4xl">
            04.10.2025
          </p>
        </div>
      </div>

      {/* Program Section */}
      <div
        className="relative min-h-screen w-screen bg-[#E6D2C3] flex flex-col justify-start md:justify-center items-center snap-start px-6 md:px-12 lg:px-16 pb-8 pt-8"
      >
        <div className="text-center mb-8 mt-2">
          <h2 className="text-5xl font-['Great_Vibes'] text-[#4A4238] max-sm:text-3xl">
            Weekend Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl md:max-h-none">
          {programSections.map((section, index) => (
            <div
              key={index}
              className="bg-white/70 p-8 rounded-xl shadow-lg text-center min-w-[250px] w-full"
            >
              <h3 className="text-3xl font-['Great_Vibes'] text-[#4A4238] mb-2 max-sm:text-2xl">
                {section.fullDate}
              </h3>
              <ul>
                {section.events.map((event, eventIndex) => (
                  <li
                    key={eventIndex}
                    className="mb-2 text-[#4A4238] max-sm:text-base"
                  >
                    <span className="font-bold">{event.time}</span> - {event.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div
        className="relative h-screen w-screen bg-cover bg-center snap-start"
        style={{ backgroundImage: "url('/acker-alm.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <div className="bg-white/70 p-8 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-5xl font-['Great_Vibes'] text-[#4A4238] mb-4 max-sm:text-3xl">
              Location
            </h2>
            <div className="flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-[#4A4238] mr-2 text-2xl" />
              <p className="text-[#4A4238] text-lg">
                Am Machinenring, 866
                <br />
                Neuburg an der Donau
              </p>
            </div>
            <Link
              href="https://maps.app.goo.gl/xt5eNL8YHXWdX9BJ7"
              target="_blank"
              className="flex items-center justify-center text-[#4A4238] hover:text-opacity-70 transition-colors"
            >
              <FaExternalLinkAlt className="mr-2" />
              Open in Google Maps
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
