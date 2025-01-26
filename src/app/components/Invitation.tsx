import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaExternalLinkAlt, FaPlane, FaTrain, FaCar } from 'react-icons/fa';

export const SaveTheDate = () => {
  const programSections = [
    {
      day: 'Friday',
      date: '19.09.2025',
      fullDate: 'Friday, September 19th',
      events: [
        { time: '15:00', description: 'Check-in Hotel' },
        { time: '18:00', description: 'Oktoberfest Party' }
      ]
    },
    {
      day: 'Saturday',
      date: '20.09.2025',
      fullDate: 'Saturday, September 20th',
      events: [
        { time: '13:00', description: 'Wedding Ceremony' },
        { time: '02:00', description: 'Afterparty' },
      ]
    },
    {
      day: 'Sunday',
      date: '21.09.2025',
      fullDate: 'Sunday, September 21st',
      events: [
        { time: '09:00', description: 'Brunch' },
        { time: '11:00', description: 'Check-out Hotel' }
      ]
    }
  ];

  const travelOptions = [
    {
      origin: 'Finland',
      methods: [
        {
          icon: <FaPlane className="text-[#4A4238] mr-2" />,
          description: 'Flight from HKI to MUC (2,5h)',
          link: 'https://www.google.com/travel/flights/s/6Hxh57QEeQEJfaTU6'
        },
        {
          icon: <FaTrain className="text-[#4A4238] mr-2" />,
          description: 'Public transport from MUC to Neuburg (ca. 1,5h)',
          link: 'https://maps.app.goo.gl/9YiMe5BNR8eTEdGw7'
        },
        {
          icon: <FaCar className="text-[#4A4238] mr-2" />,
          description: 'Drive from MUC by rental car (50min)',
          link: 'https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49'
        }
      ]
    },
    {
      origin: 'München',
      methods: [
        {
          icon: <FaTrain className="text-[#4A4238] mr-2" />,
          description: 'Public transport from Hauptbahnhof (ca. 1,5h)',
          link: 'https://maps.app.goo.gl/1hGFLBeLyw2tLVWG7'
        },
        {
          icon: <FaCar className="text-[#4A4238] mr-2" />,
          description: 'Drive (ca. 1h)',
          link: 'https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49'
        }
      ]
    },
    {
      origin: 'Bielefeld',
      methods: [
        {
          icon: <FaTrain className="text-[#4A4238] mr-2" />,
          description: 'Public transport (ca. 6-7h)',
          link: 'https://maps.app.goo.gl/xhzMtynWqJrVGpW89'
        },
        {
          icon: <FaCar className="text-[#4A4238] mr-2" />,
          description: 'Drive (ca. 5,5h)',
          link: 'https://maps.app.goo.gl/qfbRgyVoiKLH1vxMA'
        }
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
            { `${ programSections[0].date} - ${programSections[2].date}` }
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
        className="relative min-h-screen w-screen bg-cover bg-center flex flex-col items-center snap-start px-6 md:px-12 lg:px-16 pb-8 pt-8"
        style={{ backgroundImage: "url('/acker-alm.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center w-full mb-8 mt-2">
          <h2 className="text-5xl font-['Great_Vibes'] text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-3xl">
            Location
          </h2>
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 px-6 min-h-[500px]">
          {/* Venue Details Card */}
          <div className="bg-white/70 p-8 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-['Great_Vibes'] text-[#4A4238] mb-4 max-sm:text-2xl">
              Acker Alm & Hotel
            </h2>
            <div className="flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-[#4A4238] mr-2 text-2xl" />
              <Link
                href="https://maps.app.goo.gl/xt5eNL8YHXWdX9BJ7"
                target="_blank"
                className="text-[#4A4238] text-lg hover:underline flex items-center"
              >
                Am Machinenring
                <br />
                86633, Neuburg an der Donau
                <FaExternalLinkAlt className="ml-2 text-sm" />
              </Link>
            </div>
            <div className="text-[#4A4238] text-base space-y-2 mb-4">
              <p>
                Wedding ceremony, party location (both Friday and Saturday) and accomondation for everyone in one place
              </p>
              <p>
                1 minute walking distance between hotel and party location
              </p>
              <p>
                <Link
                  href="https://maps.app.goo.gl/6yNbatiLMjMrRTQ57"
                  target="_blank"
                  className="ml-1 hover:underline"
                >2km to the beautiful old town of Neuburg on the Danube river <FaExternalLinkAlt className="ml-1 inline text-sm" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Information Section */}
      <div
        className="relative min-h-screen w-screen bg-[#E6D2C3] flex flex-col justify-start md:justify-center items-center snap-start px-6 md:px-12 lg:px-16 pb-8 pt-8"
      >
        <div className="text-center mb-8 mt-2">
          <h2 className="text-5xl font-['Great_Vibes'] text-[#4A4238] max-sm:text-3xl">
            How to Get There
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl md:max-h-none">
          {travelOptions.map((travelOption, index) => (
            <div
              key={index}
              className="bg-white/70 p-8 rounded-xl shadow-lg text-center min-w-[250px] w-full"
            >
              <h3 className="text-3xl font-['Great_Vibes'] text-[#4A4238] mb-2 max-sm:text-2xl">
                From {travelOption.origin}
              </h3>
              <ul>
                {travelOption.methods.map((method, methodIndex) => (
                  <li
                    key={methodIndex}
                    className="mb-2 text-[#4A4238] max-sm:text-base flex items-center justify-center"
                  >
                    {method.icon}
                    {method.link ? (
                      <Link
                        href={method.link}
                        target="_blank"
                        className="hover:underline flex items-center"
                      >
                        {method.description}
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </Link>
                    ) : (
                      <span>{method.description}</span>
                    )}
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
