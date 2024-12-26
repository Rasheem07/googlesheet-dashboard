import { Calendar } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudFog, Download, Share, Trash } from "lucide-react";
import { SpreadsheetData } from "@/types/spreadsheetData";
import { Skeleton } from "../ui/skeleton";

export default function SpreadsheetCard() {
  const { data = [], isLoading } = useQuery<SpreadsheetData[]>({
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
    setVisibleItems((prev) => Math.min(prev + 4, data.length));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 transition">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full justify-center my-24">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
        {data.slice(0, visibleItems).map((spreadsheet, i) => (
          <Card
            key={i}
            className="shadow-xl hover:shadow-2xl cursor-pointer bg-card dark:bg-card rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]"
          >
            <CardHeader className="px-6 py-4 rounded-t-lg">
              <CardTitle className="text-xl font-bold tracking-wide">
                {spreadsheet.name}
              </CardTitle>
              <CardDescription className="text-sm">
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
                  {parseFloat(spreadsheet.size?.toString()).toFixed(2)} KB
                </strong>
              </h3>
            </CardContent>

            <div className="flex justify-between items-center p-4 border-t shadow-inner border-border dark:border-border rounded-b-lg">
              <div className="flex items-center text-sm">
                <Calendar size={18} className="text-gray-500" />
                <span className="ml-2 text-zinc-500 dark:text-zinc-300">
                  {spreadsheet.lastUpdated}
                </span>
              </div>
              <div className="flex items-center gap-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent rounded-lg transition-all text-base duration-200"
                >
                  <Share size={24} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent rounded-lg transition-all text-base duration-200"
                >
                  <Download size={24} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 text-zinc-200 border-2 border-transparent rounded-lg transition-all text-base duration-200"
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
          <Button
            onClick={loadMore}
            disabled={visibleItems === data.length}
            className="disabled:opacity-85"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="bg-card dark:bg-card shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300">
      <div className="px-6 py-4">
        <Skeleton className="w-[60%] h-6 mb-2 bg-zinc-700 rounded-md" />{" "}
        {/* Title Skeleton */}
        <Skeleton className="w-[40%] h-4 bg-zinc-700 rounded-md" />{" "}
        {/* Description Skeleton */}
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center gap-x-4 mb-3">
          <Skeleton className="w-1/3 h-5 bg-zinc-700 rounded-md" />{" "}
          {/* Sheets count skeleton */}
        </div>
        <div className="flex items-center gap-x-4">
          <Skeleton className="w-1/4 h-5 bg-zinc-700 rounded-md" />{" "}
          {/* Size skeleton */}
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t shadow-inner border-border dark:border-border rounded-b-lg">
        <div className="flex items-center text-sm">
          <Skeleton className="w-6 h-6 rounded-full bg-zinc-700" />{" "}
          {/* Calendar Icon Skeleton */}
          <Skeleton className="ml-2 w-1/2 h-4 bg-zinc-700 rounded-md" />{" "}
          {/* Last Updated Skeleton */}
        </div>
        <div className="flex items-center gap-x-4">
          <Skeleton className="w-8 h-8 rounded-md bg-zinc-700" />{" "}
          {/* Share button skeleton */}
          <Skeleton className="w-8 h-8 rounded-md bg-zinc-700" />{" "}
          {/* Download button skeleton */}
          <Skeleton className="w-8 h-8 rounded-md bg-zinc-700" />{" "}
          {/* Trash button skeleton */}
        </div>
      </div>
    </div>
  );
}
