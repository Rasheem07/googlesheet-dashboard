"use client";
import { useQuery } from "@tanstack/react-query";
import MaxWidthWrapper from "@/components/wrappers/maxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cloud,
  CloudFog,
  Download,
  Eye,
  FileSpreadsheet,
  LucideIcon,
  Share,
  Trash,
} from "lucide-react";
import React from "react";

// Define the types for the data structure
interface SpreadsheetData {
  id: string;
  name: string;
  sheetCount: number;
  size: number;
  lastUpdated: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function Page({}: Props) {
  return (
    <MaxWidthWrapper className="space-y-6 py-10 pt-[113px]">
      <div className="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] opacity-10 bg-[size:32px_32px] "></div>
      <div className="space-y-4">
        <div className="flex items-center mb-4 w-full justify-between">
          {/* Main Dashboard Heading */}
          <h1 className="md:text-2xl text-xl font-semibold text-card-title-light dark:text-card-title-dark  pl-2">
            Spreadsheets books
          </h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Upload <span className="md:block hidden">a new spreadsheet</span>
          </Button>
        </div>

        {/* <SpreadsheetCard /> */}
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

function OverviewCard({
  Icon,
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: string | number;
  Icon: LucideIcon;
}) {
  return (
    <Card className="relative  w-full rounded-lg overflow-hidden bg-card dark:bg-card transition-all transform hover:scale-105  items-center flex flex-col">
      {/* Card Header with Icon */}
      <CardHeader className="gap-y-1 p-4 flex flex-col items-center">
        <Icon className="w-10 h-10 text-emerald-500 dark:text-emerald-600" />
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
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-emerald-600 to-transparent opacity-0 hover:opacity-40 transition-opacity duration-300" />
    </Card>
  );
}

import { Calendar } from "lucide-react";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SpreadsheetCard() {
  const { data, isLoading } = useQuery<SpreadsheetData[]>({
    queryKey: ["spreadsheet"],
    queryFn: async () => {
      const response = await fetch("/api/drive", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch spreadsheet data");
      }

      return await response.json();
    },
  });

  const [visibleItems, setVisibleItems] = useState<number>(4);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, data!.length));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data?.length === 0) {
    return (
      <div className="flex w-full justify-center my-16">
        <div className="flex items-center flex-col gap-y-4 text-primary dark:text-primary text-lg font-mono">
          <CloudFog size={60} />
          No spreadsheet Available on your google account
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Upload <span className="md:block hidden">a new spreadsheet</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" grid grid-cols-1 gap-4  md:grid-cols-1 lg:grid-cols-2">
        {data &&
          data.slice(0, visibleItems).map((spreadsheet, i) => (
            <Card
              key={i}
              className="shadow-xl hover:shadow-2xl cursor-pointer bg-card dark:bg-card rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]"
            >
              <CardHeader className="px-6 py-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold tracking-wide">
                  {spreadsheet.name}
                </CardTitle>
                <CardDescription className="text-sm ">
                  {spreadsheet.id}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 py-4">
                <h3 className="text-lg font-semibold text-primary dark:text-primary flex items-center gap-x-4">
                  Sheets:
                  <strong className="text-zinc-400">
                    {spreadsheet.sheetCount}
                  </strong>
                </h3>
                <h3 className="text-lg font-semibold text-primary dark:text-primary flex items-center gap-x-4 mt-3">
                  Size:
                  <strong className="text-zinc-400">
                    {spreadsheet.size.toFixed(2)} KB
                  </strong>
                </h3>
              </CardContent>

              <div className="flex justify-between items-center p-4 border-t shadow-inner border-border dark:border-border rounded-b-lg">
                <div className="flex items-center text-sm ">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="ml-2 text-zinc-500 dark:text-zinc-300">
                    {spreadsheet.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center gap-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent  rounded-lg transition-all text-base duration-200"
                  >
                    <Share size={24} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent  rounded-lg transition-all text-base duration-200"
                  >
                    <Download size={24} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent  rounded-lg transition-all text-base duration-200"
                  >
                    <Trash
                      size={24}
                      className="text-red-500 hover:text-red-600"
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
      {visibleItems < data.length && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}
