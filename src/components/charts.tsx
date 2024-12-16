import React, { useEffect, useState } from "react";
import { useSidebar } from "./ui/sidebar";
import SalesData from "./chartCards/salesData";
import SalesDataPersons from "./chartCards/salesDataPersons";
import SalesDataByProductSection from "./chartCards/productSectionPieChart";
import SalesDataProducts from "./chartCards/salesDataProductList";

export default function Charts() {
  const { open } = useSidebar();
  const [sidebarOpen, setSidebarOpen] = useState(open);
  // Set default to 'week' sales data

  // Sync sidebar open state
  useEffect(() => {
    setSidebarOpen(open);
  }, [open]);


  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        sidebarOpen
          ? "space-y-4"
          : "lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-4 space-y-0"
      }`}
    >
      <SalesData />
      <SalesDataPersons />
      <SalesDataByProductSection className="col-span-full"/>
      <SalesDataProducts className="col-span-full" />
{/* 

      <ChartCard
        setSalesTime={setSalesDataTime}
        className="col-span-full"
        title="Sales by Date"
        description="Sales Data according to range of date"
      >
        <ResponsiveContainer
          className="p-0 min-h-[250px] sm:min-h-[300px] transition-all duration-200 ease-in-out"
          width="100%"
        >
          <ComposedChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="hsl(var(--muted))" />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard> */}
    </div>
  );
}
