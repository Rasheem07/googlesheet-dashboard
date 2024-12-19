"use client";
import { useState, useEffect, useRef } from "react";
import { DollarSign, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { endOfWeek, endOfYear, startOfWeek, startOfYear } from "date-fns";

import OverviewCard from "@/components/overviewCard";
import DateSelector from "@/components/buttons/dateSelector";
import OrderStatus from "@/components/buttons/orderStatus";
import ProductListButton from "@/components/buttons/productList";
import ProductCategoryButton from "@/components/buttons/productCategory";
import PaymentStatusButton from "@/components/buttons/PaymenetStatus";
import CustomerLocationsButton from "@/components/buttons/customerLocation";

import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";
import { filterSalesByDateRange } from "@/utils/generalFunctions";
import { Invoice } from "@/types/salesDataTypes";

const Charts = dynamic(() => import("@/components/charts"));

function Home() {
  const [isClient, setIsClient] = useState(false);
  const [TotalRevenue, setTotalRevenue] = useState(0);
  const [TotalExpenses, setTotalExpenses] = useState(0);
  const { dateRange, selectedDatesRange, orderStatus } = useAnalyticsContext();
  const { sheetData, isComplete } = useGoogleSheetsContext();
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
    console.log(renderCount.current);
  });

  useEffect(() => {
    setIsClient(true);

    const computeTotals = (data: Invoice[], orderStatus: string) => {
      const filteredData = data.filter(
        (item) => item.orderStatus === orderStatus
      );
      const totalRevenue = filteredData.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      const totalExpenses = filteredData.reduce(
        (acc, item) => acc + item.productExpense,
        0
      );
      return { totalRevenue, totalExpenses };
    };

    const getDateRangeData = (start: Date, end: Date) =>
      filterSalesByDateRange(sheetData, start, end);

    const weekData = getDateRangeData(
      startOfWeek(new Date()),
      endOfWeek(new Date())
    );
    const monthData = getDateRangeData(
      startOfWeek(new Date()),
      endOfWeek(new Date())
    );
    const yearData = getDateRangeData(
      startOfYear(new Date()),
      endOfYear(new Date())
    );
    const customData = getDateRangeData(dateRange.from!, dateRange.to!);

    const { totalRevenue: weekRevenue, totalExpenses: weekExpenses } =
      computeTotals(weekData, orderStatus);
    const { totalRevenue: monthRevenue, totalExpenses: monthExpenses } =
      computeTotals(monthData, orderStatus);
    const { totalRevenue: yearRevenue, totalExpenses: yearExpenses } =
      computeTotals(yearData, orderStatus);
    const { totalRevenue: customRevenue, totalExpenses: customExpenses } =
      computeTotals(customData, orderStatus);
    const { totalRevenue: allRevenue, totalExpenses: allExpenses } =
      computeTotals(sheetData, orderStatus);

    switch (selectedDatesRange) {
      case "week":
        setTotalExpenses(weekExpenses);
        setTotalRevenue(weekRevenue);
        break;
      case "month":
        setTotalExpenses(monthExpenses);
        setTotalRevenue(monthRevenue);
        break;
      case "year":
        setTotalExpenses(yearExpenses);
        setTotalRevenue(yearRevenue);
        break;
      case "all":
        setTotalExpenses(allExpenses);
        setTotalRevenue(allRevenue);
        break;
      default:
        setTotalExpenses(customExpenses);
        setTotalRevenue(customRevenue);
        break;
    }
  }, [
    sheetData,
    selectedDatesRange,
    dateRange.from,
    dateRange.to,
    orderStatus,
  ]);

  if (!isClient || !isComplete) {
    return (
      <div className="h-full min-w-[calc(100vw-18rem)] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-w-full w-full px-4 py-6 space-y-6">
      <div className="grid grid-cols-3 gap-2">
        <DateSelector />
        <ProductCategoryButton />
        <ProductListButton />
        <OrderStatus />
        <PaymentStatusButton />
        <CustomerLocationsButton />
      </div>
      <OverviewData
        expenses={Number(TotalExpenses)}
        totalRevenue={Number(TotalRevenue)}
      />
      <Charts />
    </div>
  );
}

const OverviewData = ({
  totalRevenue,
  expenses,
}: {
  totalRevenue: number;
  expenses: number;
}) => {
  const totalProfit = Number((totalRevenue - expenses).toFixed(0));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <OverviewCard
        title="Profit"
        description="Total sales this year"
        value={totalProfit}
        icon={DollarSign}
      />
      <OverviewCard
        title="Revenue"
        description="Total revenue this year"
        value={Number(totalRevenue.toFixed(2))}
        icon={TrendingUp}
      />
      <OverviewCard
        title="Expenses"
        description="Total expenses this year"
        value={Number(expenses.toFixed(2))}
        icon={TrendingDown}
      />
    </div>
  );
};

export default Home;
