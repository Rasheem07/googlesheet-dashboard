import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  value: number;
  icon: LucideIcon;
};

export default function OverviewCard({
  title,
  description,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card className="shadow-lg flex flex-col gap-y-3 rounded-lg border border-gray-300 bg-gradient-to-b from-white to-[#f5f5f5] dark:from-accent  p-7">
      <CardContent className="flex p-0 items-center gap-x-4">
        <div className="p-[11px] rounded-full bg-blue-100 shadow-inner border">
          <Icon className="h-8 w-8 text-blue-600 stroke-2" />
        </div>
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="font-bold text-primary text-2xl">{value}</CardTitle>
          <CardDescription className="text-lg font-medium text-gray-600">{title}</CardDescription>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex items-center gap-x-6 p-0">
          <div className="flex items-center gap-x-0.5 text-sm text-green-500 ">
              <ArrowUpRight className="text-green-500 text-sm" />
              3.46%
          </div>
          <p className="text-sm text-zinc-500">{description}</p>
      </CardFooter>
    </Card>
  );
}
