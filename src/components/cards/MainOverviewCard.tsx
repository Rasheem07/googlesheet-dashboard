import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export default function OverviewCard({
  Icon,
  title,
  description,
  value,
}: {
  Icon: LucideIcon;
  title: string;
  description: string;
  value: string | number;
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
