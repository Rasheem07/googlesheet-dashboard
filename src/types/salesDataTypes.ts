type ParsedDate = Date; // Assuming parsedDate is a Date type (you can adjust this based on how parsedDate is defined)

type Invoice = {
  saleDate: ParsedDate;
  invoiceNo: number;
  nubrasBranch: string;
  orderTakenStatus: string;
  productQuantity: number;
  totalAmount: number;
  salesPerson: string;
  productSection: string;
  productPrice: number;
  visaPayment: number;
  bankTransfer: number;
  cashPayment: number;
  advanceAmount: number;
  productList: string;
  productExpense: number;
  AamountExTax: number;
  balanceAmount: number;
  orderStatus: string;
  paymentStatus: string;
  customerLocation: string;
  deliveryDate: ParsedDate;
  paymenetCompletedDate: ParsedDate;
};

type ChartDataForSales = {
  date: string;
  quantity: number;
  amount: number;
  salesPerson: string;
  productSection: string;
  productList: string;
  productExpense: number;
  orderStatus: string;
  paymentStatus: string;
  customerLocation: string;
};

export { type Invoice, type ChartDataForSales };
