import React, { useMemo } from "react";
import { filterSalesAmountBySalesPerson } from "@/utils/salesDataByPerson"; // Import sales data utils
import {
  endOfMonth,
  endOfYear,
  parse,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import ChartCard from "@/components/chart-card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWebSocketContext } from "@/contexts/webSocketContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function SalesDataPersons({}: Props) {
    const { sheetData: SheetData } = useWebSocketContext();

  const { selectedDatesRange, dateRange, orderStatus, PaymenetStatus , customerLocation} =
    useAnalyticsContext();

  const startDate = parse("8-Dec-2024", "d-MMM-yyyy", new Date());
  const endDate = parse("14-Dec-2024", "d-MMM-yyyy", new Date());
  const MonthStart = startOfMonth(new Date());
  const MonthEnd = endOfMonth(new Date());
  const startofYear = startOfYear(new Date());
  const endofYear = endOfYear(new Date());

  const salesDataForCurrentWeek = useMemo(
    () =>
      filterSalesAmountBySalesPerson(
        SheetData,
        startDate,
        endDate,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [SheetData, startDate, endDate, orderStatus, PaymenetStatus, customerLocation]
  );

  const salesDataForCurrentMonth = useMemo(
    () =>
      filterSalesAmountBySalesPerson(
        SheetData,
        MonthStart,
        MonthEnd,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [SheetData, MonthStart, MonthEnd, orderStatus, PaymenetStatus, customerLocation]
  );

  const salesDataForCurrentYear = useMemo(
    () =>
      filterSalesAmountBySalesPerson(
        SheetData,
        startofYear,
        endofYear,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [SheetData, startofYear, endofYear, orderStatus, PaymenetStatus,customerLocation]
  );

  const customDateSalesData = useMemo(
    () =>
      filterSalesAmountBySalesPerson(
        SheetData,
        dateRange.from!,
        dateRange.to!,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [SheetData, dateRange, orderStatus, PaymenetStatus, customerLocation]
  );

  const salesData = useMemo(() => {
    switch (selectedDatesRange) {
      case "week":
        return salesDataForCurrentWeek;
      case "month":
        return salesDataForCurrentMonth;
      case "year":
        return salesDataForCurrentYear;
      case "all":
        return filterSalesAmountBySalesPerson(
          SheetData,
          new Date(0),
          new Date(),
          orderStatus,
          PaymenetStatus,
          customerLocation
        );
      case "custom":
        return customDateSalesData;
      default:
        return salesDataForCurrentWeek;
    }
  }, [
    selectedDatesRange,
    salesDataForCurrentWeek,
    salesDataForCurrentMonth,
    salesDataForCurrentYear,
    SheetData,
    customDateSalesData,
    orderStatus,
    PaymenetStatus,
    customerLocation
  ]);

  const marginLeft = selectedDatesRange === "all" ? 10 : 0;

  return (
    <ChartCard
      title="Sales by Person"
      description="Sales Data by Person according to the selected date range"
    >
      <ResponsiveContainer
        className="p-0 min-h-[250px] sm:min-h-[300px] transition-all duration-200 ease-in-out"
        width="100%"
      >
        <BarChart
          data={salesData}
          margin={{ top: 5, right: 30, bottom: 5, left: marginLeft }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="salesPerson" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="averageSales" fill="#8884d8" />
          <Bar dataKey="totalAmount" fill="#82ca9d" />
          <Bar dataKey="numberOfSales" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
