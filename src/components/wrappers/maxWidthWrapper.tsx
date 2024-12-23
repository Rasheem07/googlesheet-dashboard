"use client";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        `px-5 md:px-20 w-full mx-auto max-w-screen-2xl`,
        className
      )}
    >
      {children}
    </div>
  );
}
