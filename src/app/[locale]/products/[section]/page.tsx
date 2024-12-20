"use client";
import SalesTable from "@/components/tables/salesSectiontable";
import { useGoogleSheetsContext } from "@/contexts/googlesheetContext";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
};

export default function ProductsPage({ params }: Props) {
  const param = React.use(params) as { section: string };
  const section = decodeURIComponent(param?.section);
  const { sheetData , isComplete} = useGoogleSheetsContext();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log("Hello from product page");
    const worker = new Worker(
      new URL("@/workers/product.worker.ts", import.meta.url)
    );

    // Send a message to the worker
    worker.postMessage({ sheetData, section });

    worker.onmessage = (e) => {
      setdata(e.data);
      setloading(false);
    };

    worker.onerror = () => {
      setloading(false);
    };

    return () => {
      worker.terminate();
    };
  }, [sheetData, section]);

  if (loading && !isComplete) {
    return (
      <div className="w-full flex justify-center my-48">
        <div className="flex flex-col items-center gap-y-4">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Data is being loaded...</p>
        </div>
      </div>
    );
  }

  return <SalesTable data={data} />;
}
