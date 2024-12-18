import { Invoice, MonthlySalesData } from "@/types/salesDataTypes";
import { parse } from "date-fns";

export const getMonthlySalesData = (salesData: Invoice[]): MonthlySalesData[] => {
  const result = salesData.reduce((acc, item) => {
    const monthAndYear = (item.monthAndYear).trim();
    if (!acc[monthAndYear]) {
      acc[monthAndYear] = {
        monthAndYear: monthAndYear,
        totalQuantity: 0,
        totalProductPrice: 0,
        totalAmount: 0,
        totalTaxAmount: 0,
        totalBalanceAmount: 0,
        totalVisaPayment: 0,
        totalBankTransfer: 0,
        totalCashPayment: 0,
        totalAdvanceAmount: 0,
        totalInvoices: 0,
      };
    }

    // Accumulate the totals for each field
    acc[monthAndYear].totalQuantity += item.productQuantity || 0;
    acc[monthAndYear].totalProductPrice += item.productPrice || 0;
    acc[monthAndYear].totalAmount += item.totalAmount || 0;
    acc[monthAndYear].totalTaxAmount += item.productExpense || 0;
    acc[monthAndYear].totalBalanceAmount += item.balanceAmount || 0;
    acc[monthAndYear].totalVisaPayment += item.visaPayment || 0;
    acc[monthAndYear].totalBankTransfer += item.bankTransfer || 0;
    acc[monthAndYear].totalCashPayment += item.cashPayment || 0;
    acc[monthAndYear].totalAdvanceAmount += item.advanceAmount || 0;

    // Increment the number of invoices for this month
    acc[monthAndYear].totalInvoices += 1;

    return acc;
  }, {} as Record<string, MonthlySalesData>);

  // Convert the accumulated object into an array of MonthlySalesData
  const salesDataArray = Object.values(result);

  // Sort the array in descending order of monthAndYear using date-fns
  salesDataArray.sort((a, b) => {
    const dateA = parse(`${a.monthAndYear}`, "MM yyyy", new Date());
    const dateB = parse(`${b.monthAndYear}`, "MM yyyy", new Date());
    return dateB.getTime() - dateA.getTime();
  });

  // Format all numeric values to two decimal places
  return salesDataArray.map(data => ({
    ...data,
    totalQuantity: parseFloat(data.totalQuantity.toFixed(2)),
    totalProductPrice: parseFloat(data.totalProductPrice.toFixed(2)),
    totalAmount: parseFloat(data.totalAmount.toFixed(2)),
    totalTaxAmount: parseFloat(data.totalTaxAmount.toFixed(2)),
    totalBalanceAmount: parseFloat(data.totalBalanceAmount.toFixed(2)),
    totalVisaPayment: parseFloat(data.totalVisaPayment.toFixed(2)),
    totalBankTransfer: parseFloat(data.totalBankTransfer.toFixed(2)),
    totalCashPayment: parseFloat(data.totalCashPayment.toFixed(2)),
    totalAdvanceAmount: parseFloat(data.totalAdvanceAmount.toFixed(2))
  }));
};
