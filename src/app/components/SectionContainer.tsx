import { Overlay } from "./Overlay";

export const SectionContainer: React.FC<{
  children: React.ReactNode;
  bgColor: string;
  bgImage?: string;
}> = ({ children, bgColor, bgImage }) => {
  const className = `relative min-h-screen w-screen items-center snap-start flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8`;
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
    <div className={className} style={style}>
      {bgImage && <Overlay />}
      {children}
    </div>
  );
};
