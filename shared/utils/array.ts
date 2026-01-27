export const sortLocale = (
  array: string[] | undefined,
  order: "asc" | "desc" = "asc"
) => {
  if (!array) return undefined;
  return [...array].sort((a, b) =>
    order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
};
