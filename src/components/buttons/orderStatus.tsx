import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useTranslations } from "next-intl";
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

function OrderStatusButton({}: Props) {
  const { orderStatus, setorderStatus } = useAnalyticsContext();
  const t = useTranslations("analytics");

  return (
    <Select onValueChange={setorderStatus} value={orderStatus}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Order status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">{t("buttons.pending")}</SelectItem>
        <SelectItem value="DELIVERED">{t("buttons.delivered")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default React.memo(OrderStatusButton);