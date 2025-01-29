export const CardContainer: React.FC<{
  children: React.ReactNode;
  cols: number;
}> = ({ children, cols }) => {
  const colClasses =
    {
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
    }[cols] || "lg:grid-cols-1";

  return (
    <div
      className={`grid grid-cols-1 ${colClasses} gap-8 w-full mx-auto place-items-center max-w-7xl md:max-h-none`}
    >
      {children}
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white/80 z-10 p-8 rounded-xl shadow-lg text-center min-w-[250px] w-full min-h-full max-w-2xl">
    {children}
  </div>
);

export const CardTitle: React.FC<{ value: string }> = ({ value }) => (
  <h3 className="text-3xl font-['Great_Vibes'] text-[#4A4238] mb-2 max-sm:text-2xl">
    {value}
  </h3>
);
