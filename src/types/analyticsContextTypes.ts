import { DateRange } from "react-day-picker";
import { Invoice } from "./salesDataTypes";

export type AnalyticsContextTypes = {
  Data: Invoice[];
  isComplete: boolean;
  setData: React.Dispatch<React.SetStateAction<Invoice[]>>;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  selectedDatesRange: string;
  setselectedDatesRange: React.Dispatch<React.SetStateAction<string>>;
  ProductCategory: string;
  setProductCategory: React.Dispatch<React.SetStateAction<string>>;
  orderStatus: string;
  setorderStatus: React.Dispatch<React.SetStateAction<string>>;
  PaymenetStatus: string;
    setPaymenetStatus:  React.Dispatch<React.SetStateAction<string>>;
  customerLocation: string;
  setCustomerLocation:  React.Dispatch<React.SetStateAction<string>>;
};
