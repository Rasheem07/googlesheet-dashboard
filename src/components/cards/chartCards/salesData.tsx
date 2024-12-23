/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useMemo } from "react";
import {
  convertGroupedDataToArray,
  groupSalesByPeriod,
} from "@/utils/salesDataUtils";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import ChartCard from "@/components/cards/chart-card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { filterSalesByDateRange } from "@/utils/generalFunctions";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";

type Props = {};

function SalesData({}: Props) {
  const {
    selectedDatesRange,
    dateRange,
    orderStatus,
    PaymenetStatus,
    customerLocation,
  } = useAnalyticsContext();
  const { sheetData: SheetData } = useGoogleSheetsContext();

  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(new Date());
  const MonthStart = startOfMonth(new Date());
  const MonthEnd = endOfMonth(new Date());
  const startofYear = startOfYear(new Date());
  const endofYear = endOfYear(new Date());

  // Memoizing data based on date ranges
  const salesDataForCurrentWeek = useMemo(
    () => filterSalesByDateRange(SheetData, startDate, endDate),
    [SheetData, startDate, endDate]
  );

  const salesDataForCurrentMonth = useMemo(
    () => filterSalesByDateRange(SheetData, MonthStart, MonthEnd),
    [SheetData, MonthStart, MonthEnd]
  );

  const salesDataForCurrentYear = useMemo(
    () => filterSalesByDateRange(SheetData, startofYear, endofYear),
    [SheetData, startofYear, endofYear]
  );

  const customDateSalesData = useMemo(
    () => filterSalesByDateRange(SheetData, dateRange.from!, dateRange.to!),
    [SheetData, dateRange]
  );
  // Memoizing sales data based on filters
  const totalSalesBasedOnCustomRange = useMemo(() => {
    const filteredData = customDateSalesData.filter((item) => {
      return (
        item.orderStatus === orderStatus &&
        item.paymentStatus === PaymenetStatus &&
        (customerLocation === "" || item.customerLocation === customerLocation) // Handle empty string check
      );
    });
    const customDateSalesDataGroup = groupSalesByPeriod(
      filteredData,
      "yyyy-MM-dd"
    );
    return convertGroupedDataToArray(customDateSalesDataGroup);
  }, [customDateSalesData, orderStatus, PaymenetStatus, customerLocation]); // Add customerLocation here

  const totalSalesPerMonth = useMemo(() => {
    const filteredData = salesDataForCurrentYear.filter((item) => {
      return (
        item.orderStatus === orderStatus &&
        item.paymentStatus === PaymenetStatus &&
        (customerLocation === "" || item.customerLocation === customerLocation)
      );
    });
    const salesPerMonth = groupSalesByPeriod(filteredData, "yyyy-MM");
    return convertGroupedDataToArray(salesPerMonth);
  }, [salesDataForCurrentYear, orderStatus, PaymenetStatus, customerLocation]);

  const allTimeSalesArray = useMemo(() => {
    console.log('sheet data passed is', SheetData)
    const filteredData = SheetData.filter((item) => {
      return (
        item.orderStatus === orderStatus &&
        item.paymentStatus === PaymenetStatus &&
        (customerLocation === "" || item.customerLocation.trimEnd() === customerLocation)
      );
    });
    const allTimeSales = groupSalesByPeriod(filteredData, "yyyy");
    return convertGroupedDataToArray(allTimeSales);
  }, [SheetData, orderStatus, PaymenetStatus, customerLocation]);
  
  const totalSalesArray = useMemo(() => {
    const filteredData = salesDataForCurrentWeek.filter((item) => {
      return (
        item.orderStatus === orderStatus &&
        item.paymentStatus === PaymenetStatus &&
        (customerLocation === "" || item.customerLocation.trimEnd() === customerLocation)
      );
    });
    const totalSalesPerDay = groupSalesByPeriod(filteredData, "yyyy-MM-dd");
    return convertGroupedDataToArray(totalSalesPerDay);
  }, [salesDataForCurrentWeek, orderStatus, PaymenetStatus, customerLocation]);

  const totalSalesArrayForMonth = useMemo(() => {
    const filteredData = salesDataForCurrentMonth.filter((item) => {
      return (
        item.orderStatus === orderStatus &&
        item.paymentStatus === PaymenetStatus &&
        (customerLocation === "" || item.customerLocation === customerLocation)
      );
    });
    const totalSalesPerDayForMonth = groupSalesByPeriod(
      filteredData,
      "yyyy-MM-dd"
    );
    return convertGroupedDataToArray(totalSalesPerDayForMonth);
  }, [salesDataForCurrentMonth, orderStatus, PaymenetStatus, customerLocation]);

  const salesData = useMemo(() => {
    switch (selectedDatesRange) {
      case "week":
        return totalSalesArray;
      case "month":
        return totalSalesArrayForMonth;
      case "year":
        return totalSalesPerMonth;
      case "all":
        return allTimeSalesArray;
      case "custom":
        return totalSalesBasedOnCustomRange;
      default:
        return totalSalesArray;
    }
  }, [
    selectedDatesRange,
    totalSalesArray,
    totalSalesArrayForMonth,
    totalSalesPerMonth,
    allTimeSalesArray,
    totalSalesBasedOnCustomRange,
  ]);

  const marginLeft = selectedDatesRange === "all" ? 10 : 0;

  return (
    <ChartCard
      title="Sales by Date"
      description="Sales Data according to range of date"
    >
      <ResponsiveContainer
        className="p-0 min-h-[250px] sm:min-h-[300px] transition-all duration-200 ease-in-out"
        width="100%"
      >
        <LineChart
          data={salesData}
          margin={{ top: 5, right: 30, bottom: 5, left: marginLeft }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend iconType="square" />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
export default React.memo(SalesData);