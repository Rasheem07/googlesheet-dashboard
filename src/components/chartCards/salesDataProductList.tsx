import React, { useMemo } from "react";
import { filterSalesDataProductList } from "@/utils/productList"; // Import sales data by product utils
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
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
import { Info } from "lucide-react";

type Props = { className: string };

export default function SalesDataProducts({ className }: Props) {
  const { Data: SheetData } = useAnalyticsContext();
  const {
    selectedDatesRange,
    dateRange,
    ProductCategory,
    orderStatus,
    PaymenetStatus,
    customerLocation,
  } = useAnalyticsContext();

  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(new Date());
  const MonthStart = startOfMonth(new Date());
  const MonthEnd = endOfMonth(new Date());
  const startofYear = startOfYear(new Date());
  const endofYear = endOfYear(new Date());

  const salesDataForCurrentWeek = useMemo(
    () =>
      filterSalesDataProductList(
        SheetData,
        startDate,
        endDate,
        ProductCategory,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [
      SheetData,
      startDate,
      endDate,
      ProductCategory,
      orderStatus,
      PaymenetStatus,
      customerLocation,
    ]
  );

  const salesDataForCurrentMonth = useMemo(
    () =>
      filterSalesDataProductList(
        SheetData,
        MonthStart,
        MonthEnd,
        ProductCategory,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [
      SheetData,
      MonthStart,
      MonthEnd,
      ProductCategory,
      orderStatus,
      PaymenetStatus,
      customerLocation,
    ]
  );

  const salesDataForCurrentYear = useMemo(
    () =>
      filterSalesDataProductList(
        SheetData,
        startofYear,
        endofYear,
        ProductCategory,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [
      SheetData,
      startofYear,
      endofYear,
      ProductCategory,
      orderStatus,
      PaymenetStatus,
      customerLocation,
    ]
  );

  const customDateSalesData = useMemo(
    () =>
      filterSalesDataProductList(
        SheetData,
        dateRange.from!,
        dateRange.to!,
        ProductCategory,
        orderStatus,
        PaymenetStatus,
        customerLocation
      ),
    [
      SheetData,
      dateRange,
      ProductCategory,
      orderStatus,
      PaymenetStatus,
      customerLocation,
    ]
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
        return filterSalesDataProductList(
          SheetData,
          new Date(0),
          new Date(),
          ProductCategory,
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
    ProductCategory,
    orderStatus,
    PaymenetStatus,
    customerLocation,
  ]);

  const marginLeft = selectedDatesRange === "all" ? 10 : 5;

  // Prepare the chart data format
  const chartData = Object.keys(salesData).map((productList) => {
    const { amount, quantity, numOfSales } = salesData[productList];

    return {
      productList,
      amount,
      quantity,
      numOfSales,
    };
  });

  // Custom tooltip content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customTooltip = ({ payload, label }: any) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip p-4 bg-sidebar dark:bg-sidebar dark:text-white border border-gray-200 rounded-lg shadow-xl max-w-[350px]">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <strong>Product: </strong>
            {label}
          </p>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#8884d8]">Amount: </strong>
              {data.amount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#82ca9d]">Quantity: </strong>
              {data.quantity}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-[#ffc658]">Number of Sales: </strong>
              {data.numOfSales}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard
      title="Sales by Product"
      description="Sales Data by Product according to the selected date range"
      className={className}
    >
      <ResponsiveContainer
        className="p-0 min-h-[250px] sm:min-h-[400px] transition-all duration-200 ease-in-out"
        width="100%"
      >
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, bottom: 20, left: marginLeft }}
        >
          <Legend verticalAlign="top" />
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis
            dataKey="productList"
            tick={false} // Disables X-axis ticks
            className="text-gray-800 text-lg"
          />
          <YAxis />
          <Tooltip content={customTooltip} />
          <Bar dataKey="amount" fill="#8884d8" name="Amount" />
          <Bar dataKey="quantity" fill="#82ca9d" name="Quantity" />
          <Bar dataKey="numOfSales" fill="#ffc658" name="Number of Sales" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-base dark:text-primary flex items-center justify-center w-full gap-x-2">
        <Info className="text-[#ffc658] stroke-2 h-5 w-5" />
        Hover or click the bars to know the product details.
      </p>
    </ChartCard>
  );
}
