export const OnePageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#E6D2C3]">
        <div className="relative min-h-screen w-full items-center flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-8 pb-16">
          {children}
        </div>
      </div>
    </div>
  );
};
