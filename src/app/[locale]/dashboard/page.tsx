
import  SpreadsheetCard  from "@/components/cards/spreadsheetCards";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, Eye, FileSpreadsheet, LucideIcon } from "lucide-react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function Page({}: Props) {
  return (
    <MaxWidthWrapper className="space-y-6 py-10">
      <div className="space-y-4">
        {/* Main Dashboard Heading */}
        <h1 className="text-3xl font-semibold text-card-title-light dark:text-card-title-dark  pl-2">
          Overview
        </h1>

        {/* Grid of Overview Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6">
          <OverviewCard
            Icon={FileSpreadsheet}
            title="Total spreadsheets"
            description="Total number of spreadsheets"
            value="5"
          />
          <OverviewCard
            Icon={Cloud}
            title="Spreadsheets provider"
            description="Cloud provider of your spreadsheets"
            value="Google Sheets"
          />
          <OverviewCard
            Icon={Eye}
            title="Most accessed spreadsheet"
            description="Most accessed spreadsheet in the last 30 days"
            value="DAILY NUBRAS SHEET"
          />
        </div>
      </div>
      <div className="space-y-4">
        {/* Main Dashboard Heading */}
        <h1 className="text-3xl font-semibold text-card-title-light dark:text-card-title-dark  pl-2">
          Books
        </h1>

        <SpreadsheetCard/>
      </div>
    </MaxWidthWrapper>
  );
}

function OverviewCard({
  Icon,
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: string;
  Icon: LucideIcon;
}) {
  return (
    <Card className="relative border-gray-500 w-full rounded-lg overflow-hidden bg-card-light dark:bg-card-dark transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-card-dark dark:hover:shadow-card-light items-center flex flex-col">
      {/* Card Header with Icon */}
      <CardHeader className="gap-y-1 p-4 flex flex-col items-center">
        <Icon className="w-10 h-10 text-blue-500 dark:text-blue-600" />
        <div className="space-y-0 flex flex-col items-center">
          <CardTitle className="text-lg font-semibold ">{title}</CardTitle>
          <CardDescription className="text-sm text-card-description-light dark:text-card-description-dark opacity-80">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Card Content with Background and Value */}
      <CardContent className="text-2xl  font-mono capitalize bg-opacity-10 dark:bg-opacity-20 rounded-b-lg pb-4 px-4 mt-2">
        <span className="text-card-value-light dark:text-card-value-dark">
          {value}
        </span>
      </CardContent>

      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-blue-600 to-transparent opacity-0 hover:opacity-40 transition-opacity duration-300" />
    </Card>
  );
}

// components/SpreadsheetCard.tsx
