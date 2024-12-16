"use client";
import { useState, useEffect } from "react";
import { DollarSign, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const Charts = dynamic(() => import("@/components/charts"));
import OverviewCard from "@/components/overviewCard";
import useWebSocket from "@/hooks/useSocket";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import {
  filterSalesByDateRange,
  flattenSalesData,
} from "@/utils/generalFunctions";
import { Invoice } from "@/types/salesDataTypes";
import DateSelector from "@/components/buttons/dateSelector";
import { endOfWeek, endOfYear, startOfWeek, startOfYear } from "date-fns";
import OrderStatus from "@/components/buttons/orderStatus";
import ProductListButton from "@/components/buttons/productList";
import ProductCategoryButton from "@/components/buttons/productCategory";
import PaymentStatusButton from "@/components/buttons/PaymenetStatus";
import CustomerLocationsButton from "@/components/buttons/customerLocation";

function Home() {
  const [isClient, setIsClient] = useState(false);
  const [TotalRevenue, setTotalRevenue] = useState(0);
  const [TotalExpenses, setTotalExpenses] = useState(0);
  const [hasClearedData, setHasClearedData] = useState(false);
  const {
    Data: sheetData,
    setData: setSheetData,
    isComplete,
    dateRange,
    selectedDatesRange,
    orderStatus
  } = useAnalyticsContext();
  const { data, setData } = useWebSocket({
    url: "google-sheet-backend-production.up.railway.app",
    spreadsheetId: "1BUk3rk7-xZHOSX5G6wGLr2bXkpbnT1dIse6B7GBDwmg",
    range: "DAILY SALES DATA NUBRAS",
  });

  // UseEffect hook for setting `isClient`
  useEffect(() => {
    setIsClient(true);

    const startWeek = startOfWeek(new Date());
    const endWeek = endOfWeek(new Date());
    const weekData = filterSalesByDateRange(sheetData, startWeek, endWeek);

    const filteredWeekData = weekData.filter((item) => {
      return item.orderStatus === orderStatus
    })
    const totalRevenueForWeekData = filteredWeekData.reduce((rev, item) => {
      rev += item.totalAmount;
      return rev;
    }, 0);
    const totalExpensesForWeekData = filteredWeekData.reduce((rev, item) => {
      rev += item.productExpense;
      return rev;
    }, 0);

    const startMpnth = startOfWeek(new Date());
    const endMonth = endOfWeek(new Date());
    const monthData = filterSalesByDateRange(sheetData, startMpnth, endMonth);

    
    const filteredMonthData = monthData.filter((item) => {
      return item.orderStatus === orderStatus
    })
    const totalRevenueForMonthData = filteredMonthData.reduce((rev, item) => {
      rev += item.totalAmount;
      return rev;
    }, 0);

    const totalExpensesForMonthData = monthData.reduce((rev, item) => {
      rev += item.productExpense;
      return rev;
    }, 0);

    const startYear = startOfYear(new Date());
    const endYear = endOfYear(new Date());
    const yearData = filterSalesByDateRange(sheetData, startYear, endYear);
  
    const filteredYearData = yearData.filter((item) => {
      return item.orderStatus === orderStatus
    })
    const totalRevenueForYearData = filteredYearData.reduce((rev, item) => {
      rev += item.totalAmount;
      return rev;
    }, 0);

    const totalExpensesForYearData = yearData.reduce((rev, item) => {
      rev += item.productExpense;
      return rev;
    }, 0);

    
    const customData = filterSalesByDateRange(
      sheetData,
      dateRange.from!,
      dateRange.to!
    );

    const filteredCustomData = customData.filter((item) => {
      return item.orderStatus === orderStatus
    })

    const totalRevenueForCustom = filteredCustomData.reduce((rev, item) => {
      rev += item.totalAmount;
      return rev;
    }, 0);

    const totalExpensesforCustom = filteredCustomData.reduce((rev, item) => {
      rev += item.productExpense;
      return rev;
    }, 0);

    const filteredSheetData = sheetData.filter((item) => {
      return item.orderStatus === orderStatus
    })

    const totalRevenue = filteredSheetData.reduce((rev, item) => {
      rev += item.totalAmount;
      return rev;
    }, 0);

    const totalExpenses = filteredSheetData.reduce((rev, item) => {
      rev += item.productExpense;
      return rev;
    }, 0);

    if (selectedDatesRange === "week") {
      setTotalExpenses(totalExpensesForWeekData);
      setTotalRevenue(totalRevenueForWeekData);
    } else if (selectedDatesRange === "month") {
      setTotalExpenses(totalExpensesForMonthData);
      setTotalRevenue(totalRevenueForMonthData);
    } else if (selectedDatesRange === "year") {
      setTotalExpenses(totalExpensesForYearData);
      setTotalRevenue(totalRevenueForYearData);
    } else if (selectedDatesRange === "all") {
      setTotalExpenses(totalExpenses);
      setTotalRevenue(totalRevenue);
    } else {
      setTotalExpenses(totalExpensesforCustom);
      setTotalRevenue(totalRevenueForCustom);
    }
    
  }, [sheetData, selectedDatesRange, dateRange.from, dateRange.to, orderStatus]);

  // UseEffect hook for processing WebSocket data
  useEffect(() => {
    if (data.length > 0 && !hasClearedData) {
      const newData = flattenSalesData(data) as Invoice[];
      setSheetData(newData);
      console.log('new data: ', newData);
    }

    if (isComplete && !hasClearedData) {
      setData([]);
      setHasClearedData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isComplete, hasClearedData, setData]);

  // Ensure `isClient` and `isComplete` are true before rendering
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
        expenses={Number(TotalExpenses.toFixed(0))}
        totalRevenue={TotalRevenue}
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


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const totalProfit = Number((totalRevenue - expenses).toFixed(0));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <OverviewCard
        title="Profit"
        description="Total sales this year"
        value={34214}
        icon={DollarSign}
      />
      <OverviewCard
        title="Revenue"
        description="Total revenue this year"
        value={totalRevenue}
        icon={TrendingUp}
      />
      <OverviewCard
        title="Expenses"
        description="Total expenses this year"
        value={120}
        icon={TrendingDown}
      />
    </div>
  );
}

export default Home;
