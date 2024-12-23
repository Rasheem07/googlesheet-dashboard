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
import ChartCard from "@/components/cards/chart-card";
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
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

function SalesDataPersons({}: Props) {
    const { sheetData: SheetData } = useGoogleSheetsContext();

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
          <XAxis dataKey="salesPerson" 
            tick={false} // Disables X-axis ticks
            className="text-gray-800 dark:text-zinc-100 text-lg" 
            label="Sales person" 
            />
          <YAxis />
          <Tooltip content={customTooltip} />
          <Legend />
          <Bar dataKey="averageSales" fill="#8884d8" />
          <Bar dataKey="totalAmount" fill="#82ca9d" />
          <Bar dataKey="numberOfSales" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

 // Custom tooltip content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customTooltip = ({ payload, label }: any) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip p-4 bg-sidebar dark:bg-sidebar dark:text-white border border-gray-200 rounded-lg shadow-xl max-w-[350px]">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <strong>Sales person: </strong>
            {label}
          </p>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#8884d8]">averageSales: </strong>
              {data.averageSales}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#82ca9d]">totalAmount: </strong>
              {data.totalAmount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#ffc658]">Number of Sales: </strong>
              {data.numberOfSales}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  export default React.memo(SalesDataPersons);