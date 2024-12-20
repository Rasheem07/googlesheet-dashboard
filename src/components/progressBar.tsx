"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";
import { useTranslations } from "next-intl";

const RefetchProgressDialog = () => {
  const { refetching, refetch } = useGoogleSheetsContext(); // Get refetching state from context
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (refetching) {
      // Start progress from 0 when refetching begins
      if (progress === 0) {
        setProgress(0); // Ensure progress starts from 0 on new refetch
      }

      // Increment progress until 95%
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 95) {
            return prev + 5; // Increment by 5 until 95
          }
          return 95; // Stay at 95 once reached
        });
      }, 500);
    } else if (progress === 95) {
      // Once refetching is done, set progress to 100%
      setProgress(100);
      // Reset progress to 0 after a delay
      setTimeout(() => setProgress(0), 100); // Reset progress after 1 second
    }

    // Cleanup the interval when refetching stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [refetching, progress]);

  const t = useTranslations("analytics");

  return (
    <Dialog open={refetching} onOpenChange={(open) => !open && setProgress(0)}>
      <DialogTrigger
        onClick={() => refetch()}
        className="bg-blue-500 w-full text-nowrap rounded-lg px-4 py-1 text-base dark:bg-blue-600 dark:hover:bg-blue-700 text-white hover:bg-blue-600"
      >
        {t("buttons.getLatest")}
      </DialogTrigger>

      <DialogContent className="min-w-[400px] min-h-[250px] flex flex-col items-center justify-center">
        <DialogHeader className="items-center">
          <DialogTitle className="animate-pulse duration-400">Data is Refetching....</DialogTitle>
          <DialogDescription>It may take 5 - 20s to load your large datasets.</DialogDescription>
        </DialogHeader>
        <div className="w-full mt-4">
          <Progress value={progress} max={100} className="h-2" />
          <p className="mt-2 text-center">{progress}%</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefetchProgressDialog;
