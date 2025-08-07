import { Overlay } from "../Overlay";
import { useEffect, useState } from "react";
import { Dictionary } from "@/app/[lang]/types";
import { Registration } from "@/app/data";

export const Landing: React.FC<{
  start: string;
  end: string;
  dict: Dictionary;
  registration?: Registration | null;
}> = ({
  start,
  end,
  dict,
  registration,
}) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Wedding date: September 20, 2025, 13:30 (local time)
    const weddingDate = new Date("2025-09-20T11:30:00Z"); // 13:30 CEST = 11:30 UTC
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
        setDone(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setDone(true);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to interpolate values into translation string
  function interpolate(str: string, values: Record<string, number>) {
    return str.replace(/{{(\w+)}}/g, (_, k) => values[k].toString());
  }

  // Determine registration status
  const getRegistrationStatus = () => {
    if (!registration || !registration.name) {
      return dict.landing.status.no_registration;
    }

    // If no participants for Saturday, show complete status
    if (registration.people_sat === 0) {
      return dict.landing.status.complete;
    }

    const hasMenuSelections = registration.menu_selections &&
      Object.keys(registration.menu_selections).length > 0;

    if (!hasMenuSelections) {
      return dict.landing.status.no_menu_order;
    }

    return dict.landing.status.complete;
  };

  // Get the appropriate greeting based on whether we have user info
  const getGreeting = () => {
    if (registration && registration.name) {
      return dict.landing.greetingPersonal.replace('{{name}}', registration.name);
    }
    return dict.landing.greeting;
  };

  const handleStatusClick = () => {
    document.getElementById('response')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div
      id="landing"
      className="relative h-screen w-screen bg-cover bg-bottom snap-start max-sm:bg-[position:40%_center]"
      style={{ backgroundImage: "url('/jjs.webp')" }}
    >
      <Overlay />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl max-h-screen flex flex-col justify-between mt-12 max-sm:mt-8" style={{ height: 'min(70vh, 750px)' }}>
          {/* Top Section - Title, Date, Countdown */}
          <div className="flex flex-col items-center text-center">
            <h1 className="font-['Great_Vibes'] text-8xl mb-4 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-5xl">
              Jasmin & Jaakko
            </h1>
            <div className="w-32 border-t-2 border-white mb-4"></div>
            <p className="font-['Great_Vibes'] text-5xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-3xl">
              {`${start} - ${end}`}
            </p>
            <div className="mt-8">
              <span className="font-['Great_Vibes'] text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-sm:text-lg">
                {done
                  ? dict.landing.countdownDone
                  : interpolate(dict.landing.countdown, timeLeft)}
              </span>
            </div>
          </div>

          {/* Bottom Section - Registration Status Card */}
          <div className="flex justify-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/20 w-11/12 sm:w-4/5 max-w-2xl">
              {/* Greeting */}
              <h3 className="text-2xl font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-4 max-sm:text-xl text-center">
                {getGreeting()}
              </h3>

              {/* Status */}
              <div className="text-center mb-6">
                <p className="text-lg text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-sm:text-base">
                  {dict.landing.statusLabel} {getRegistrationStatus()}
                </p>
              </div>

              {/* RSVP Button */}
              <div className="text-center">
                <button
                  onClick={handleStatusClick}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-xl font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-sm:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  {dict.landing.rsvpButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
