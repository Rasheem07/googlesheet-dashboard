/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertPriceToEnglish } from "@/lib/utils";
import { parseDate } from "./dateUtils";
import { Invoice } from "@/types/salesDataTypes";

export const flattenSalesData = (data: any[]): Invoice[] => {
  console.log('Raw data',data)
  return data
    .flat()
    .map((item) => {
      const saleDateStr = item["SALE DATE"];
      if (!saleDateStr) return null;

      const parsedDate = parseDate(saleDateStr);

      // Only convert the totalAmount field, leave other amounts as they are
      const convertedPrice = convertPriceToEnglish(item["TOTAL AMOUNT"]);
      
      return {
        saleDate: parsedDate,
        invoiceNo: Number(item["NEW INVOICE NUM"]),
        nubrasBranch: item["NUBRAS BRANCH"],
        orderTakenStatus: item["ORDER TAKEN STATUS"],
        productQuantity: Number(item["PRODUCT QUANTITY"]),
        totalAmount: Number(convertedPrice),  // Only convert totalAmount
        salesPerson: item["SALES PERSON"] as string,
        productSection: item["NUBRAS PRODUCT CATEGORIES SERIES"] as string,
        productPrice: Number(item["PRODUCT PRICE/PC"]),  // No conversion
        visaPayment: Number(item["VISA PAYMENT"]),  // No conversion
        bankTransfer: Number(item["BANK TRANSFER PAYMENT "]),  // No conversion
        cashPayment: item["CASH PAYMENT"] === "" ? 0 : Number(item["CASH PAYMENT"]),  // No conversion
        advanceAmount: Number(item["ADVANCE AMOUNT PAYMENT"]),  // No conversion
        productList: item["NUBRAS PRODUCT  LIST"] as string,
        productExpense: item["TAX AMOUNT"] === "" ? 0 : Number(item["TAX AMOUNT"]),  // No conversion
        AamountExTax: Number(item["AMOUNT EXCLUDING TAX"]),  // No conversion
        balanceAmount: Number(item["BALANCE AMOUNT"]),  // No conversion
        orderStatus: item["ORDER  STATUS"] as string,
        paymentStatus: item["ORDER PAYMENT STATUS"] as string,
        customerLocation: item["CUSTOMER LOCATION"].trimEnd() as string,  // Removes space at the end
        deliveryDate: item['DELIVERY DATE'],
        paymenetCompletedDate: item['PAYMENT COMPLETED DATE']
      };
    })
    .filter((item) => item !== null);
};

export const filterSalesByDateRange = (
  salesData: Invoice[],
  startDate: Date,
  endDate: Date
) => {
  return salesData.filter((item: Invoice) => {
    return item?.saleDate >= startDate && item.saleDate <= endDate;
  });
};
