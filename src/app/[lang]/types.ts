export type Dictionary = Awaited<
  ReturnType<typeof import("./dictionaries").getDictionary>
>;
