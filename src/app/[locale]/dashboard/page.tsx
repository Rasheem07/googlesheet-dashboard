"use client";
import MaxWidthWrapper from "@/components/wrappers/maxWidthWrapper";
import { Cloud, Eye, FileSpreadsheet } from "lucide-react";
import React from "react";
import OverviewCard from "@/components/cards/MainOverviewCard";
import SpreadsheetCard from "@/components/cards/spreadsheetCard";
import UploadSpreadsheet from "@/components/uploadSpreadsheet";

// Define the types for the data structure

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function Page({}: Props) {
  return (
    <MaxWidthWrapper className="space-y-6 py-10 pt-[113px]">
      <div
        className="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] opacity-5 bg-[size:48px_48px] -z-10"
        aria-hidden
      ></div>
      <div className="space-y-4">
        <div className="flex items-center mb-4 w-full justify-between">
          {/* Main Dashboard Heading */}
          <h1 className="md:text-2xl text-xl font-semibold text-card-title-light dark:text-card-title-dark  pl-2">
            Spreadsheet Work books
          </h1>
          <div className="flex items-center gap-x-4">
            <UploadSpreadsheet />
          </div>
        </div>

        <SpreadsheetCard />
      </div>
      <div className="space-y-4">
        {/* Main Dashboard Heading */}
        <h1 className="text-2xl font-semibold text-card-title-light dark:text-card-title-dark  pl-2">
          Statistics
        </h1>

        {/* Grid of Overview Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-3">
          <OverviewCard
            Icon={FileSpreadsheet}
            title="Total spreadsheets"
            description="Total number of spreadsheets"
            value={0}
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
    </MaxWidthWrapper>
  );
}
