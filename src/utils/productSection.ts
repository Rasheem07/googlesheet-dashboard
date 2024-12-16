import { Invoice } from "@/types/salesDataTypes";
import { filterSalesByDateRange } from "./generalFunctions";

// Helper function to group sales by product section
export const groupByProductSection = (
  salesData: Invoice[]
): Record<
  string,
  { totalAmount: number; productQuantity: number; count: number }
> => {
  return salesData.reduce((acc, item: Invoice) => {
    const productSection = item.productSection;
    if (acc[productSection]) {
      acc[productSection].totalAmount += item.totalAmount;
      acc[productSection].productQuantity += item.productQuantity;
      acc[productSection].count += 1;
    } else {
      acc[productSection] = {
        totalAmount: item.totalAmount,
        productQuantity: item.productQuantity,
        count: 1,
      };
    }
    return acc;
  }, {} as Record<string, { totalAmount: number; productQuantity: number; count: number }>);
};

export const filterSalesAmountBySalesPerson = (
  salesData: Invoice[],
  startDate: Date,
  endDate: Date,
  orderStatus: string,
  paymentStatus: string,
  customerLocation: string
): {
  productSection: string;
  totalAmount: number;
  averageSales: number;
  numberOfSales: number;
  salesPercentage: number;
}[] => {
  const filteredData = filterSalesByDateRange(salesData, startDate, endDate)
  const customFilteredData = filteredData.filter((item: Invoice) => {
    return (
      item.orderStatus === orderStatus &&
      item.paymentStatus === paymentStatus &&
      item.customerLocation === customerLocation
    );
  });
  const groupedData = groupByProductSection(customFilteredData);

  const totalSales = Object.values(groupedData).reduce(
    (total, { productQuantity }) => total + productQuantity,
    0
  );

  return Object.keys(groupedData).map((productSection) => {
    const { totalAmount, productQuantity } = groupedData[productSection];

    // Calculate average sales for each product section
    const averageSales = totalAmount / productQuantity; // or totalAmount / count if that's preferred

    // Calculate percentage of sales for each product section
    const salesPercentage = ((productQuantity / totalSales) * 100).toFixed(2);

    return {
      productSection,
      totalAmount,
      averageSales,
      numberOfSales: productQuantity, // you can use 'count' here as well depending on your logic
      salesPercentage: parseFloat(salesPercentage), // Converting percentage to a number
    };
  });
};
