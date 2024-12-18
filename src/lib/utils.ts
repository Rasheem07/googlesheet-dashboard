import { clsx, type ClassValue } from "clsx"
import { startOfDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const RANGE_OPTIONS = {
  last_7_days: {
    label: "Last 7 Days",
    startDate: startOfDay(subDays(new Date(), 6)),
    endDate: null,
  },
  last_30_days: {
    label: "Last 30 Days",
    startDate: startOfDay(subDays(new Date(), 29)),
    endDate: null,
  },
  last_90_days: {
    label: "Last 90 Days",
    startDate: startOfDay(subDays(new Date(), 89)),
    endDate: null,
  },
  last_365_days: {
    label: "Last 365 Days",
    startDate: startOfDay(subDays(new Date(), 364)),
    endDate: null,
  },
  all_time: {
    label: "All Time",
    startDate: null,
    endDate: null,
  },
};


export function convertPriceToEnglish(price: string): string {
  // Step 1: Check if price is a valid string
  if (typeof price !== 'string' || price.trim() === "") {
    return "0"; // Return "0" or handle as necessary
  }

  // Step 2: Remove the Arabic currency symbol (د.إ.)
  const priceWithoutSymbol = price.replace(/د\.إ\./g, '').trim();

  // Step 3: Replace Arabic numerals (٠١٢٣٤٥٦٧٨٩) with English numerals (0123456789)
  const arabicToEnglishNumbers: { [key: string]: string } = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9"
  };

  const priceInEnglish = priceWithoutSymbol.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (match) => arabicToEnglishNumbers[match as keyof typeof arabicToEnglishNumbers]);

  // Step 4: Replace Arabic comma with English comma or period (as appropriate)
  return priceInEnglish.replace(/,/g, ''); // Remove commas if needed, or handle them differently
}


