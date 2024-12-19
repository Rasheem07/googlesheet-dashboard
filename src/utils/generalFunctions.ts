/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertPriceToEnglish } from "@/lib/utils";
import { parseDate } from "./dateUtils";
import { Invoice } from "@/types/salesDataTypes";
// Pre-map of headers for fast lookup and default values

export const flattenSalesData = (data: any[]): Invoice[] => {
  console.log('Raw data', data);

  return data
    .flat()
    .map((item) => {
      const saleDateStr = (item["01/Jan/2022"]);
      if (!saleDateStr) return null;

      const parsedDate = parseDate(saleDateStr) as Date;

      // Convert all amounts to English and type cast them to numbers
      const convertedTotalAmount = convertPriceToEnglish(item["TOTAL AMOUNT"]);
      const convertedProductPrice = convertPriceToEnglish(item["PRODUCT PRICE/PC"]);
      const convertedVisaPayment = convertPriceToEnglish(item["VISA PAYMENT"]);
      const convertedBankTransfer = convertPriceToEnglish(item["BANK TRANSFER PAYMENT "]);
      const convertedCashPayment = item["CASH PAYMENT"] === "" ? 0 : convertPriceToEnglish(item["CASH PAYMENT"]);
      const convertedAdvanceAmount = convertPriceToEnglish(item["ADVANCE AMOUNT PAYMENT"]);
      const convertedProductExpense = item["\nTAX AMOUNT"]? 0 : convertPriceToEnglish(item["\nTAX AMOUNT"]);
      const convertedAamountExTax = convertPriceToEnglish(item["AMOUNT EXCLUDING TAX"]);
      const convertedBalanceAmount = convertPriceToEnglish(item["BALANCE AMOUNT"]);

      return {
        saleDate: parsedDate,
        invoiceNo: Number(item["NEW INVOICE NUM"]),
        monthAndYear: (item['MONTH AND YEAR']).trim(),
        nubrasBranch: item["NUBRAS BRANCH"],
        orderTakenStatus: item["ORDER TAKEN STATUS"],
        productQuantity: Number(item["PRODUCT QUANTITY"]),
        totalAmount: Number(convertedTotalAmount),  // Convert to number after English conversion
        salesPerson: item["SALES PERSON"] as string,
        productSection: item["NUBRAS PRODUCT CATEGORIES SERIES"] as string,
        productPrice: Number(convertedProductPrice),  // Convert to number after English conversion
        visaPayment: Number(convertedVisaPayment),  // Convert to number after English conversion
        bankTransfer: Number(convertedBankTransfer),  // Convert to number after English conversion
        cashPayment: Number(convertedCashPayment),  // Convert to number after English conversion
        advanceAmount: Number(convertedAdvanceAmount),  // Convert to number after English conversion
        productList: item["NUBRAS PRODUCT  LIST"] as string,
        productExpense: Number(convertedProductExpense),  // Convert to number after English conversion
        AamountExTax: Number(convertedAamountExTax),  // Convert to number after English conversion
        balanceAmount: Number(convertedBalanceAmount),  // Convert to number after English conversion
        orderStatus: item["ORDER  STATUS"] as string,
        paymentStatus: item["ORDER PAYMENT STATUS"] as string,
        customerLocation: item["CUSTOMER LOCATION"].trimEnd() as string,  // Removes space at the end
        deliveryDate: item['DELIVERY DATE'],
        paymenetCompletedDate: item['PAYMENT COMPLETED DATE']
      };
    })
    .filter((item) => item !== null);
};

export function convertToObjectArray(data: any[]) {
  if (!data || data.length === 0) {
    console.error('No data provided');
    return [];
  }

  const headers = data[0]; // The first row is the header
  const rows = data.slice(1); // All the subsequent rows are data

  // Ensure the headers are not empty
  if (!headers || headers.length === 0) {
    console.error('No headers found in the data');
    return [];
  }

  // Map each row to an object where keys are the headers and values are from the row
  return rows.map((row) => {
    return row.reduce((acc: any, curr: any, index: number) => {
      if (headers[index] !== undefined) {
        acc[headers[index]] = curr || ''; // Handle undefined or null values by defaulting to an empty string
      }
      return acc;
    }, {});
  });
};


// Define the filter function for sales by date range
export const filterSalesByDateRange = (
  salesData: Invoice[], // Define the Invoice type for salesData
  startDate: Date, // Define startDate as Date
  endDate: Date // Define endDate as Date
): Invoice[] => {
    return salesData?.filter((item: Invoice) => {
      return new Date(item?.saleDate) >= startDate && new Date(item?.saleDate)  <= endDate;
    });
};
