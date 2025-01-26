export const Overlay: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className="absolute inset-0 bg-black opacity-40">{children}</div>;
