import { parse } from "date-fns";
import { enUS } from "date-fns/locale";

export const parseDate = (dateStr: string): Date | null => {
  try {
    const date = parse(dateStr, "d/MMM/yyyy", new Date(), { locale: enUS });

    return date;
  } catch (error) {
    console.error(`Failed to parse date: ${dateStr}`, error);
    return null;
  }
};
