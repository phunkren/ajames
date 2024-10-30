import format from "date-fns/format";

export const ONE_MINUTE_IN_SECONDS = 60;

export const ONE_HOUR_IN_SECONDS = 3600;

export function formatLongDate(date: Date) {
  const formattedDate = format(date, "MMM dd, yyyy");

  return formattedDate;
}

export function formatShortDate(date: Date) {
  const formattedDate = format(date, "MMM yy");

  return formattedDate;
}
