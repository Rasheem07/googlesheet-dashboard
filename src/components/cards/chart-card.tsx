import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export default function ChartCard({
  title,
  description,
  children,
  className
}: Props) {

  return (
    <Card className={cn(`border border-gray-300 bg-sidebar w-full dark:bg-accent`, className)}>
      <CardHeader className="p-4">
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 items-center w-full justify-between">
          <div className="flex sm:block flex-col items-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">{children}</CardContent>
    </Card>
  );
}
