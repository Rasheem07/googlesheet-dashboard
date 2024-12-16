import React from "react";
import { useTable, Column } from "react-table";

interface SalesData {
  invoiceNo: string;
  monthAndYear: string;
  saleDate: string;
  salesPerson: string;
  customerLocation: string;
  orderStatus: string;
  orderPaymentStatus: string;
  productQuantity: number;
  productPrice: number;
  totalAmount: number;
  taxAmount: number;
  taxPercentage: number;
  balanceAmount: number;
  deliveryDate: string;
  paymentCompletedDate: string;
}

const SalesDataTable: React.FC = () => {
  // Example Sales Data
  const data = React.useMemo<SalesData[]>(
    () => [
      {
        invoiceNo: "INV123",
        monthAndYear: "Dec 2024",
        saleDate: "2024-12-01",
        salesPerson: "John Doe",
        customerLocation: "New York",
        orderStatus: "Completed",
        orderPaymentStatus: "Paid",
        productQuantity: 10,
        productPrice: 50,
        totalAmount: 500,
        taxAmount: 50,
        taxPercentage: 10,
        balanceAmount: 450,
        deliveryDate: "2024-12-05",
        paymentCompletedDate: "2024-12-03",
      },
      {
        invoiceNo: "INV124",
        monthAndYear: "Dec 2024",
        saleDate: "2024-12-02",
        salesPerson: "Jane Smith",
        customerLocation: "Los Angeles",
        orderStatus: "Pending",
        orderPaymentStatus: "Unpaid",
        productQuantity: 5,
        productPrice: 100,
        totalAmount: 500,
        taxAmount: 50,
        taxPercentage: 10,
        balanceAmount: 450,
        deliveryDate: "2024-12-06",
        paymentCompletedDate: "N/A",
      },
      // Add more rows as needed
    ],
    []
  );

  // Define columns for each category
  const columns = React.useMemo<Column<SalesData>[]>(
    () => [
      // Customer Data Columns
      {
        Header: "Customer Data",
        columns: [
          { Header: "Invoice No", accessor: "invoiceNo" },
          { Header: "Sale Date", accessor: "saleDate" },
          { Header: "Sales Person", accessor: "salesPerson" },
          { Header: "Customer Location", accessor: "customerLocation" },
        ],
      },
      // Transactions Data Columns
      {
        Header: "Transactions Data",
        columns: [
          { Header: "Order Status", accessor: "orderStatus" },
          { Header: "Order Payment Status", accessor: "orderPaymentStatus" },
          { Header: "Total Amount", accessor: "totalAmount" },
          { Header: "Tax Amount", accessor: "taxAmount" },
          { Header: "Tax %", accessor: "taxPercentage" },
          { Header: "Balance Amount", accessor: "balanceAmount" },
          {
            Header: "Payment Completed Date",
            accessor: "paymentCompletedDate",
          },
        ],
      },
      // Sales Data Columns
      {
        Header: "Sales Data",
        columns: [
          { Header: "Product Quantity", accessor: "productQuantity" },
          { Header: "Product Price", accessor: "productPrice" },
          { Header: "Delivery Date", accessor: "deliveryDate" },
        ],
      },
    ],
    []
  );

  // Initialize the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<SalesData>({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse"
      >
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroupIndex}
              className="bg-gray-200"
            >
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left border-b"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={rowIndex}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border-b"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDataTable;
