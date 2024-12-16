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
  type Props = {}
  
  
  export default function PaymentStatusButton({}: Props) {
   
    const {PaymenetStatus, setPaymenetStatus} = useAnalyticsContext();
    const t = useTranslations("analytics");

    return (
      <Select value={PaymenetStatus} onValueChange={setPaymenetStatus}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Payment status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="NO PAYMENET">
              {t('buttons.Advance not paid')}
            </SelectItem>
            <SelectItem value="PARTIAL PAYMENT">
            {t('buttons.Advance paid')}
            </SelectItem>
            <SelectItem value="FULL PAYMENT">
            {t('buttons.Full paid')}
            </SelectItem>
        </SelectContent>
      </Select>
    );
  }
  