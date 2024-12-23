"use client";
import { type LucideIcon } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
type Props = {
  icon: LucideIcon;
  title: string;
  size: number;
};

export default function InfoIcon({ title, icon: Icon, size }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {" "}
          {/* Cloud Sync Icon */}
          <motion.div whileHover={{scale: 1.5}}>
            <Icon
              className="text-primary  dark:text-zinc-300 cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-600 transition-colors"
              size={size}
            />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-lg">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
