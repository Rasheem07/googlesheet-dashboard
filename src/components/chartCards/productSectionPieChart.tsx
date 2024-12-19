import React, { useMemo } from "react";
import { groupByProductSection } from "@/utils/productSection";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import ChartCard from "@/components/chart-card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { filterSalesByDateRange } from "@/utils/generalFunctions";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";

// Define types explicitly for the props and return types
interface ProductSectionSalesData {
  productSection: string;
  totalAmount: number;
  averageSales: number;
  numberOfSales: number;
  salesPercentage: number;
}

type Props = { className?: string };

export default function SalesDataByProductSection({ className }: Props) {
  const { sheetData: SheetData } = useGoogleSheetsContext();

  const { selectedDatesRange, dateRange } = useAnalyticsContext();

  // UseMemo hooks to handle the date calculations inside the hook
  const startDate = useMemo(() => new Date("2024-12-08"), []);
  const endDate = useMemo(() => new Date("2024-12-14"), []);

  const MonthStart = useMemo(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    []
  );
  const MonthEnd = useMemo(
    () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    []
  );

  const startofYear = useMemo(
    () => new Date(new Date().getFullYear(), 0, 1),
    []
  );
  const endofYear = useMemo(
    () => new Date(new Date().getFullYear(), 11, 31),
    []
  );

  // Filter sales data based on the selected date range
  const filteredSalesDataForCurrentWeek = useMemo(() => {
    return filterSalesByDateRange(SheetData, startDate, endDate);
  }, [SheetData, startDate, endDate]);

  const filteredSalesDataForCurrentMonth = useMemo(() => {
    return filterSalesByDateRange(SheetData, MonthStart, MonthEnd);
  }, [SheetData, MonthStart, MonthEnd]);

  const filteredSalesDataForCurrentYear = useMemo(() => {
    return filterSalesByDateRange(SheetData, startofYear, endofYear);
  }, [SheetData, startofYear, endofYear]);

  const customDateSalesData = useMemo(() => {
    return filterSalesByDateRange(SheetData, dateRange.from!, dateRange.to!);
  }, [SheetData, dateRange]);

  // Determine which sales data to use based on the selected time range
  const salesData = useMemo(() => {
    switch (selectedDatesRange) {
      case "week":
        return filteredSalesDataForCurrentWeek;
      case "month":
        return filteredSalesDataForCurrentMonth;
      case "year":
        return filteredSalesDataForCurrentYear;
      case "all":
        return SheetData;
      case "custom":
        return customDateSalesData;
      default:
        return filteredSalesDataForCurrentWeek;
    }
  }, [
    selectedDatesRange,
    filteredSalesDataForCurrentWeek,
    filteredSalesDataForCurrentMonth,
    filteredSalesDataForCurrentYear,
    customDateSalesData,
    SheetData,
  ]);

  // Group sales data by product section and calculate required values
  const groupedSalesData = useMemo<ProductSectionSalesData[]>(() => {
    const grouped = groupByProductSection(salesData);
    const totalSales = Object.values(grouped).reduce(
      (total, { productQuantity }) => total + productQuantity,
      0
    );

    return Object.keys(grouped).map((productSection) => {
      const { totalAmount, productQuantity } = grouped[productSection];

      // Calculate average sales for each product section
      const averageSales = totalAmount / productQuantity;

      // Calculate percentage of sales for each product section
      const salesPercentage = (
        (productQuantity / Number(totalSales)) *
        100
      ).toFixed(2);

      return {
        productSection,
        totalAmount,
        averageSales,
        numberOfSales: productQuantity,
        salesPercentage: parseFloat(salesPercentage),
      };
    });
  }, [salesData]);

  // Pie chart data
  const pieData = groupedSalesData.map(
    ({ productSection, salesPercentage }) => ({
      productSection,
      value: salesPercentage,
    })
  );

  // Colors for each slice of the pie chart
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ffbb28"];

  return (
    <ChartCard
      title="Sales by Product Section"
      description="Sales Data by Product Section according to the selected date range"
      className={className}
    >
      <ResponsiveContainer
        className="p-0 min-h-[250px] sm:min-h-[300px] transition-all duration-200 ease-in-out"
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="productSection"
            outerRadius="80%"
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            wrapperStyle={{
              fontSize: "12px", // Make legend text smaller
              paddingLeft: "20px", // Adjust space between pie and legend
              fontFamily: "Arial, sans-serif", // Optional: Change font for a more modern look
              marginTop: "40px", // Add gap between pie chart and legend
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
