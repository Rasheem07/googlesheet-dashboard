/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertPriceToEnglish } from "@/lib/utils";
import { parseDate } from "./dateUtils";
import { Invoice } from "@/types/salesDataTypes";

export const flattenSalesData = (data: any[]): Invoice[] => {
  console.log('Raw data', data);

  return data
    .flat()
    .map((item) => {
      const saleDateStr = (item["01/Jan/2022"]).toString();
      if (!saleDateStr) return null;

      const parsedDate = parseDate(saleDateStr) as Date;

      // Convert all amounts to English and type cast them to numbers
      const convertedTotalAmount = convertPriceToEnglish(item["TOTAL AMOUNT"]);
      const convertedProductPrice = convertPriceToEnglish(item["PRODUCT PRICE/PC"]);
      const convertedVisaPayment = convertPriceToEnglish(item["VISA PAYMENT"]);
      const convertedBankTransfer = convertPriceToEnglish(item["BANK TRANSFER PAYMENT "]);
      const convertedCashPayment = item["CASH PAYMENT"] === "" ? 0 : convertPriceToEnglish(item["CASH PAYMENT"]);
      const convertedAdvanceAmount = convertPriceToEnglish(item["ADVANCE AMOUNT PAYMENT"]);
      const convertedProductExpense = item["TAX AMOUNT"] === "" ? 0 : convertPriceToEnglish(item["TAX AMOUNT"]);
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

export const filterSalesByDateRange = (
  salesData: Invoice[],
  startDate: Date,
  endDate: Date
) => {
  return salesData.filter((item: Invoice) => {
    return item?.saleDate >= startDate && item.saleDate <= endDate;
  });
};
