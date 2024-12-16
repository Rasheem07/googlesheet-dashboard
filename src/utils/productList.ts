import { Invoice } from "@/types/salesDataTypes";
import { filterSalesByDateRange } from "./generalFunctions";

export const groupSalesProductLists = (
  salesData: Invoice[]
): Record<
  string,
  { totalAmount: number; productQuantity: number; count: number }
> => {
  return salesData.reduce((acc, item) => {
    const productList = item.productList;

    if (acc[productList]) {
      acc[productList].productQuantity += item.productQuantity;
      acc[productList].totalAmount += item.totalAmount;
      acc[productList].count += 1;
    } else {
      acc[productList] = {
        totalAmount: item.totalAmount,
        productQuantity: item.productQuantity,
        count: 1,
      };
    }

    return acc;
  }, {} as Record<string, { totalAmount: number; productQuantity: number; count: number }>);
};

export const filterSalesDataProductList = (
  salesData: Invoice[],
  start: Date,
  end: Date,
  productCategory: string,
  orderStatus: string,
  paymentStatus: string,
  customerLocation: string
): Record<string, { amount: number; quantity: number; numOfSales: number }> => {
  const filteredData = filterSalesByDateRange(salesData, start, end);
  const filteredCategoryProducts = filteredData.filter((item: Invoice) => {
    return (
      item.productSection == productCategory &&
      item.orderStatus == orderStatus &&
      item.paymentStatus == paymentStatus &&
      item.customerLocation == customerLocation
    );
  });
  
  const groupedData = groupSalesProductLists(filteredCategoryProducts);

  // Return the data in the expected format (an object with productList keys)
  const result: Record<
    string,
    {
      amount: number;
      quantity: number;
      numOfSales: number;
      productList: string;
    }
  > = {};

  Object.keys(groupedData).forEach((productList) => {
    const { totalAmount, productQuantity, count } = groupedData[productList];

    result[productList] = {
      productList: productList,
      amount: totalAmount,
      quantity: productQuantity,
      numOfSales: count,
    };
  });

  return result;
};
