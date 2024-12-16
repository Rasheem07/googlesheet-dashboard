"use client";

import { AnalyticsContextTypes } from "@/types/analyticsContextTypes";
import { Invoice } from "@/types/salesDataTypes";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { DateRange } from "react-day-picker";

const AnalyticsContext = createContext<AnalyticsContextTypes | null>(null);

type Props = {
  children: ReactNode; // This allows the provider to wrap other components
};

export default function AnalyticsContextProvider({ children }: Props) {
  const [Data, setData] = useState<Invoice[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedDatesRange, setselectedDatesRange] = useState<string>("month");
  const [ProductCategory, setProductCategory] = useState(
    "NUBRAS GENTS KANDORA SECTION"
  );
  const [orderStatus, setorderStatus] = useState<string>("DELIVERED");
  const [PaymenetStatus, setPaymenetStatus] = useState<string>("FULL PAYMENT");
  const [customerLocation, setCustomerLocation] = useState<string>("ABU DHABI");

  const values = {
    Data,
    isComplete,
    setData,
    setIsComplete,
    dateRange,
    setDateRange,
    selectedDatesRange,
    setselectedDatesRange,
    ProductCategory,
    setProductCategory,
    orderStatus,
    setorderStatus,
    PaymenetStatus,
    setPaymenetStatus,
    customerLocation,
    setCustomerLocation
  };

  useEffect(() => {
    console.log('order status: ', orderStatus);
    console.log('paymenet status: ', PaymenetStatus);
    console.log('customer location: ', customerLocation);

  }, [orderStatus, PaymenetStatus, customerLocation])

  return (
    <AnalyticsContext.Provider value={values}>
      {children} {/* Render the wrapped components */}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used within an AnalyticsContextProvider"
    );
  }

  return context;
}
