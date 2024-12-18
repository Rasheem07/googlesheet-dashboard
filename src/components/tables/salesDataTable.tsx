import React, { useEffect, useRef, useState } from "react";
import { useTable, Column } from "react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MonthlySalesData } from "@/types/salesDataTypes";
import { getMonthlySalesData } from "@/utils/getMonthlySalesData";
import { Button } from "../ui/button";
import { File, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { useRouter } from "@/i18n/routing";
import { useWebSocketContext } from "@/contexts/webSocketContext";

const SalesDataTable: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { sheetData: fullData, isComplete } = useWebSocketContext();
  const [data, setData] = useState<MonthlySalesData[]>([]);
  const [loading, setloading] = useState(true);
  const router = useRouter();

  useEffect(() => {  
      const salesData = getMonthlySalesData(fullData); // Fetch data
      setData(salesData); // Set the data
      setloading(false); // Set loading to false after data is set
    
  }, [fullData]);

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

  const columns = React.useMemo<Column<MonthlySalesData>[]>(
    () => [
      { Header: "Month and Year", accessor: "monthAndYear" },
      { Header: "Total Invoices", accessor: "totalInvoices" },
      { Header: "Product Quantity", accessor: "totalQuantity" },
      { Header: "Product Price", accessor: "totalProductPrice" },
      { Header: "Total Amount", accessor: "totalAmount" },
      { Header: "Tax Amount", accessor: "totalTaxAmount" },
      { Header: "Balance Amount", accessor: "totalBalanceAmount" },
      { Header: "Total Visa Amount", accessor: "totalVisaPayment" },
      { Header: "Total Bank Transfer", accessor: "totalBankTransfer" },
      { Header: "Total Cash Payments", accessor: "totalCashPayment" },
      { Header: "Total Advance Payments", accessor: "totalAdvanceAmount" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Card className="m-5">
      <CardHeader className="flex flex-row pb-8 items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">
            Sales Data according to months
          </CardTitle>
          <CardDescription>
            Analyze monthly sales trends to gain insights into performance and
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
          {!isComplete || loading ? (
            <div className="w-full flex justify-center my-48">
              <div className="flex flex-col items-center gap-y-4">
                <Loader2 className="animate-spin h-6 w-6" />
                <p>Data is being loaded...</p>
              </div>
            </div>
          ) : (
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
                    <tr
                      className="cursor-pointer"
                      {...row.getRowProps()}
                      key={i}
                      onClick={() => {
                        const encodedMonthAndYear = encodeURIComponent(
                          row.values.monthAndYear
                        );
                        console.log("Redirecting to:", encodedMonthAndYear);
                        router.push(`/sales/${encodedMonthAndYear}`);
                      }}
                    >
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

export default SalesDataTable;
