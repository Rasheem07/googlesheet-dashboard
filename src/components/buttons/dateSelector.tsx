"use client";
import React, { memo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar"; // Ensure this is the shadcn/ui Calendar
import { DateRange } from "react-day-picker"; // Assuming this is needed if you're using the same DateRange type
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useTranslations } from "next-intl";
import { enGB, ar } from "date-fns/locale"; // Import locales from date-fns

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};


const DateSelector = memo(function DateSelector({}: Props) {
  const { dateRange, setDateRange, setselectedDatesRange } =
    useAnalyticsContext();
  const [selectedTime, setSelectedTime] = useState("month");

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setselectedDatesRange(time);
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
      setSelectedTime("custom");
      setselectedDatesRange("custom");
    }
  };

  const t = useTranslations("analytics");

  // Get the current locale (this could be dynamic based on your setup)
  const currentLocale = t("languages.arabic") === "arabic" ? enGB : ar; // Using Arabic or English locale from date-fns

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-gray-300 hover:bg-sidebar py-1.5 rounded-md px-4 outline-none w-full">
        {selectedTime === "week"
          ? t("buttons.currentWeek")
          : selectedTime === "month"
          ? t("buttons.currentMonth")
          : selectedTime === "year"
          ? t("buttons.currentYear")
          : selectedTime == "all"
          ? t("buttons.allTime")
          : `${t(
              "buttons.customDate"
            )} - ${dateRange.from?.toLocaleDateString()} to ${dateRange.to?.toLocaleDateString()}`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] cursor-pointer">
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleTimeSelection("week")}>
          {t("buttons.currentWeek")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTimeSelection("month")}>
          {t("buttons.currentMonth")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTimeSelection("year")}>
          {t("buttons.currentYear")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTimeSelection("all")}>
          {t("buttons.allTime")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {t("buttons.customDate")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Calendar
              locale={currentLocale} // Pass the locale here
              mode="range"
              selected={dateRange as DateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
})


export default React.memo(DateSelector);