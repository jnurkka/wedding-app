import React from 'react';

export const SaveTheDate = () => {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="font-['Great_Vibes'] text-8xl mb-4 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">Jasmin & Jaakko</h1>
        <div className="w-32 border-t-2 border-white mb-4"></div>
        <p className="font-['Great_Vibes'] text-6xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">04.10.2025</p>
      </div>
    </div>
  )
}
