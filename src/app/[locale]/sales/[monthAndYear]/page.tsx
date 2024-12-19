"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTable, Column } from "react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Invoice } from "@/types/salesDataTypes";
import { Button } from "@/components/ui/button";
import { File, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { format, parse } from "date-fns";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SalesDataTableForDaily: React.FC = ({ params }: any) => {
  const param = React.use(params) as { monthAndYear: string };
  const monthAndYear = decodeURIComponent(param?.monthAndYear);
  const [loading, setloading] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null);
  const { sheetData: fullData, isComplete } = useGoogleSheetsContext();
  const [data, setData] = useState<Invoice[]>([]);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Data");
    const headerCellStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "4F81BD" } }, // Header background color (blue)
      alignment: { horizontal: "center", vertical: "center" }, // Center align text
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" }, // Add borders around header cells
      },
    };
    // Apply header style to all header cells only if columns are available
    if (ws["!cols"]) {
      for (let col = 0; col < ws["!cols"].length; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];

        if (cell) {
          cell.s = headerCellStyle;
        }
      }
    }

    // Adding borders to the entire table
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < Object.keys(data[0]).length; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: row + 1, c: col })];
        if (cell) {
          if (!cell.s) cell.s = {};
          cell.s.alignment = { horizontal: "center", vertical: "center" };
          cell.s = {
            border: {
              top: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
              bottom: { style: "thin" },
            },
          };
        }
      }
    }

    XLSX.writeFile(wb, "sales_data.xlsx");
  };

  useEffect(() => {
    if (isComplete) {
      setloading(false);
    }
  }, [isComplete]);
  
  const columns = React.useMemo<Column<Invoice>[]>(
    () => [
      { Header: "Sale Date", accessor: "saleDate" },
      { Header: "Invoice No", accessor: "invoiceNo" },
      { Header: "Month and Year", accessor: "monthAndYear" },
      { Header: "Customer Location", accessor: "customerLocation" },
      { Header: "Delivery Date", accessor: "deliveryDate" },
      { Header: "Order Status", accessor: "orderStatus" },
      { Header: "Order Taken Status", accessor: "orderTakenStatus" },
      { Header: "Payment Status", accessor: "paymentStatus" },
      { Header: "Sales Person", accessor: "salesPerson" },
      { Header: "Product List", accessor: "productList" },
      { Header: "Product Price", accessor: "productPrice" },
      { Header: "Product Quantity", accessor: "productQuantity" },
      { Header: "Product Section", accessor: "productSection" },
      { Header: "Total Amount", accessor: "totalAmount" },
      { Header: "Balance Amount", accessor: "balanceAmount" },
      { Header: "Cash Payment", accessor: "cashPayment" },
      { Header: "Visa Payment", accessor: "visaPayment" },
      { Header: "Bank Transfer", accessor: "bankTransfer" },
      { Header: "Advance Amount", accessor: "advanceAmount" },
      { Header: "Amount Ex Tax", accessor: "AamountExTax" },
      { Header: "Product Expense", accessor: "productExpense" },
    ],
    []
  );
  useEffect(() => {
    console.log(monthAndYear);
    
    if (fullData.length === 0) {
      return; // Skip rendering or data processing if fullData is empty
    }
  
    // Filter data for the specific month and year
    const filteredDateForDaily = fullData.filter((data) => {
      return data.monthAndYear === monthAndYear;
    });
  
    // Format and sort the data by saleDate in ascending order
    const stringedDate = filteredDateForDaily
      .map((item) => ({
        ...item,
        saleDate: item.saleDate
          ? format(new Date(item.saleDate), "d/M/yyyy") // Format saleDate as day/month/year
          : "N/A",
      }))
      .sort((a, b) => {
        // Convert formatted saleDate back to Date objects for comparison
        const dateA = new Date(a.saleDate.split('/').reverse().join('/')); // Convert to Date object (yyyy/MM/dd)
        const dateB = new Date(b.saleDate.split('/').reverse().join('/'));
  
        // Return the result of comparison to sort in ascending order
        return dateA.getTime() - dateB.getTime();
      });
  
    // Only update data if it's different from the current state
    setData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(stringedDate)) {
        return stringedDate;
      }
      return prevData;
    });
  
    setloading(false); // Set loading to false after processing data
  }, [monthAndYear, fullData]);
  
  


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const parsedDate = parse(monthAndYear, "MM yyyy", new Date());

  // Format the parsed date to the desired format
  const formattedDate = format(parsedDate, "MMMM yyyy");
  return (
    <Card className="m-5">
      <CardHeader className="flex flex-row pb-8 items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">
            Sales Data for {formattedDate}
          </CardTitle>
          <CardDescription>
            Analyze daily sales trends to gain insights into performance and
            seasonal patterns.
          </CardDescription>
        </div>
        <Button
          onClick={handleExportExcel}
          variant="ghost"
          className="border font-semibold flex items-center gap-x-1 border-gray-300"
        >
          <File className="stroke-2" /> Export as xlsx
        </Button>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div
          className="overflow-x-scroll max-w-full bg-card dark:bg-card"
          ref={contentRef}
        >
            {loading ? (
            <div className="w-full flex justify-center my-24">
              <div className="flex flex-col items-center gap-y-4">
                <Loader2 className="animate-spin h-6 w-6" />
                <p>Data is being loaded...</p>
              </div>
            </div>
            ): (

                <table
                {...getTableProps()}
                className="w-full border-collapse overflow-x-scroll"
                >
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id}
                      className="border-b w-full px-5 whitespace-nowrap py-2 text-left"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.column.id}
                        className="border-b text-center whitespace-nowrap p-5"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
    )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesDataTableForDaily;
