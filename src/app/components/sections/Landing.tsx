import { Overlay } from "../Overlay";
import { useEffect, useState } from "react";
import { Dictionary } from "@/app/[lang]/types";

export const Landing: React.FC<{ start: string; end: string; dict: Dictionary }> = ({
  start,
  end,
  dict,
}) => {
  // Wedding date: September 20, 2025, 13:30 (local time)
  const weddingDate = new Date("2025-09-20T11:30:00Z"); // 13:30 CEST = 11:30 UTC
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [done, setDone] = useState(false);

  useEffect(() => {
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

  return (
    <div
      id="landing"
      className="relative h-screen w-screen bg-cover bg-bottom snap-start max-sm:bg-[position:40%_center]"
      style={{ backgroundImage: "url('/jjs.webp')" }}
    >
      <Overlay />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="font-['Great_Vibes'] text-8xl mb-4 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-5xl">
          Jasmin & Jaakko
        </h1>
        <div className="w-32 border-t-2 border-white mb-4"></div>
        <p className="font-['Great_Vibes'] text-5xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] max-sm:text-3xl">
          {`${start} - ${end}`}
        </p>
        <div className="mt-32">
          <span className="font-['Great_Vibes'] text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-sm:text-lg">
            {done
              ? dict.landing.countdownDone
              : interpolate(dict.landing.countdown, timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};
