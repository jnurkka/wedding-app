import { Overlay } from "./Overlay";

export const SectionContainer: React.FC<{
  children: React.ReactNode;
  bgColor: string;
  bgImage?: string;
  id: string;
}> = ({ id, children, bgColor, bgImage }) => {
  const className = `section relative min-h-screen w-screen items-center snap-start flex flex-col justify-center px-6 md:px-12 lg:px-16`;
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
      <div className="relative h-full w-full pt-8 pb-16">
        {children}
      </div>
    </div>
  );
};
