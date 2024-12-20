/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTable } from "react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

// Table component for each month
const MonthSalesTable = ({ monthAndYear, products }: { monthAndYear: string; products: any[] }) => {
  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        accessor: "productList",
      },
      {
        Header: "Quantity",
        accessor: "productQuantity",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
      },
      {
        Header: "Sales",
        accessor: "sales",
      },
    ],
    []
  );

  // Use React Table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: products,
  });

  return (
    <Card className="m-5">
      <CardHeader className="flex flex-row pb-8 items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">
            Sales Data for {monthAndYear}
          </CardTitle>
          <CardDescription>
            Analyze the sales data for the month of {monthAndYear}.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="overflow-x-auto max-w-full bg-card dark:bg-card">
          <table {...getTableProps()} className="w-full border-collapse overflow-x-scroll">
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
                  <tr className="cursor-pointer" {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.column.id}
                        className="border-b whitespace-nowrap p-5"
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
      </CardContent>
    </Card>
  );
};

const SalesTable = ({ data }: { data: any[] }) => {
  return (
    <div className="space-y-6">
      {data.map((item, index) => {
        const { monthAndYear, products } = item;

        // Render a separate table for each month
        return <MonthSalesTable key={index} monthAndYear={monthAndYear} products={products} />;
      })}
    </div>
  );
};

export default SalesTable;
