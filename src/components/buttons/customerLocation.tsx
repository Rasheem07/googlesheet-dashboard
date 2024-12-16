const customerLocations = [
  "ABU DHABI",
  "AL AIN",
  "DUBAI",
  "SHARJA",
  "RAS AL KHAIMAH",
  "UMM AL QUWAIN",
  "AJMAN",
  "PICKUP BY SHOP",
];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useTranslations } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function CustomerLocationsButton({}: Props) {
  const { customerLocation, setCustomerLocation } = useAnalyticsContext();
  const t = useTranslations("analytics");

  return (
    <Select onValueChange={setCustomerLocation} value={customerLocation === ""? "Select an option" : customerLocation}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Custom locations" />
      </SelectTrigger>
      <SelectContent>
        {customerLocations.map((option: string, key: number) => (
          <SelectItem value={option} key={key}>
            {t(`buttons.${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
