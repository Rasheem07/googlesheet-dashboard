import { Invoice } from "@/types/salesDataTypes";
import { filterSalesByDateRange } from "./generalFunctions";

// Updated function to group sales by salesperson and calculate total sales amount and product quantity
export const groupSalesBySalesPerson = (
  salesData: Invoice[]
): Record<
  string,
  { totalAmount: number; productQuantity: number; count: number }
> => {
  return salesData.reduce((acc, item: Invoice) => {
    const salesPerson = item.salesPerson;
    if (acc[salesPerson]) {
      acc[salesPerson].totalAmount += item.totalAmount;
      acc[salesPerson].productQuantity += item.productQuantity;
      acc[salesPerson].count += 1;
    } else {
      acc[salesPerson] = {
        totalAmount: item.totalAmount,
        productQuantity: item.productQuantity,
        count: 1,
      };
    }
    return acc;
  }, {} as Record<string, { totalAmount: number; productQuantity: number; count: number }>);
};

// Updated function to filter and group sales data by salesperson for a given period
export const filterSalesAmountBySalesPerson = (
  salesData: Invoice[],
  startDate: Date,
  endDate: Date,
  orderStatus: string,
  paymentStatus: string,
  customerLocation: string
): {
  salesPerson: string;
  totalAmount: number;
  averageSales: number;
  numberOfSales: number;
}[] => {
  const filteredData = filterSalesByDateRange(salesData, startDate, endDate);
  const filteredDataForOrderStatus = filteredData.filter((item) => {
    return (
      item.orderStatus === orderStatus &&
      item.paymentStatus === paymentStatus &&
      item.customerLocation === customerLocation
    );
  });

  const groupedData = groupSalesBySalesPerson(filteredDataForOrderStatus);
  return Object.keys(groupedData).map((salesPerson) => {
    const { totalAmount, productQuantity, count } = groupedData[salesPerson];
    return {
      salesPerson,
      totalAmount,
      averageSales: Number((totalAmount / count).toFixed(2)),
      numberOfSales: productQuantity,
    };
  });
};
