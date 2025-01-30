import { Overlay } from "./Overlay";

export const SectionContainer: React.FC<{
  children: React.ReactNode;
  bgColor: string;
  bgImage?: string;
  id: string;
}> = ({ id, children, bgColor, bgImage }) => {
  const className = `snap-start section relative min-h-screen w-full`;
  const style = {
    backgroundColor: bgColor,
    ...(bgImage
      ? {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {}),
  };
  return (
    <div id={id} className={className} style={style}>
      {bgImage && <Overlay />}
      <div className="relative min-h-screen w-full items-center flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-8 pb-16">
        {children}
      </div>
    </div>
  );
};
