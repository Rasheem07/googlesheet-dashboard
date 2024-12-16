import { parse, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const parseDate = (dateStr: string) => {
  return parse(dateStr, "d-MMM-yyyy", new Date(), { locale: enUS });
};

export const getStartEndOfWeek = () => {
  return {
    startOfCurrentWeek: startOfWeek(new Date()),
    endOfCurrentWeek: endOfWeek(new Date())
  };
};

export const getStartEndOfMonth = () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  return { start, end };
};

export const getStartEndOfYear = () => {
  const start = startOfYear(new Date());
  const end = endOfYear(new Date());
  return { start, end };
};
