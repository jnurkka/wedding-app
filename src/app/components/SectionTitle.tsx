export const SectionTitle: React.FC<{ value: string; color?: string }> = ({
  value,
  color,
}) => (
  <div className="text-center mb-8 mt-2 z-10">
    <h2
      className="text-5xl font-['Great_Vibes'] text-[#4A4238] max-sm:text-3xl"
      style={{ color: color ? color : "#4A4238" }}
    >
      {value}
    </h2>
  </div>
);
