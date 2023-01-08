import format from "date-fns/format";

export const ONE_HOUR_IN_SECONDS = 3600;

export function formatLongDate(date: Date) {
  const formattedDate = format(date, "MMMM do, yyyy");

  return formattedDate;
}

export function formatShortDate(date: Date) {
  const formattedDate = format(date, "dd/MM/yyyy");

  return formattedDate;
}
