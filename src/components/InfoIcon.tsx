import { type LucideIcon } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  icon: LucideIcon;
  title: string;
  size: number;
};

export default function InfoIcon({ title, icon: Icon , size}: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {" "}
          {/* Cloud Sync Icon */}
          <Icon
            className="text-primary  dark:text-zinc-300 cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-600 transition-all transform hover:scale-150 duration-300"
            size={size}
          />
        </TooltipTrigger>
        <TooltipContent >
          <p className="text-lg">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
