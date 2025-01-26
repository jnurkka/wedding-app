import { Overlay } from "../Overlay";

export const Landing: React.FC<{ start: string; end: string }> = ({
  start,
  end,
}) => (
  <div
    className="relative h-screen w-screen bg-cover bg-center snap-start max-sm:bg-[position:40%_center]"
    style={{ backgroundImage: "url('/jjs.jpeg')" }}
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
    </div>
  </div>
);
