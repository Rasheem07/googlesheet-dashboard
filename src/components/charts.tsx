import React, { useEffect, useState, useRef } from "react";
import { useSidebar } from "./ui/sidebar";
import SalesData from "./chartCards/salesData";
import SalesDataPersons from "./chartCards/salesDataPersons";
import SalesDataByProductSection from "./chartCards/productSectionPieChart";
import SalesDataProducts from "./chartCards/salesDataProductList";
import html2canvas from "html2canvas"; // Add html2canvas
import jsPDF from "jspdf"; // Add jsPDF

export default function Charts() {
  const { open } = useSidebar();
  const [sidebarOpen, setSidebarOpen] = useState(open);
  const chartsRef = useRef(null); 

  // Sync sidebar open state
  useEffect(() => {
    setSidebarOpen(open);
  }, [open]);

  // Function to capture the charts and export as PDF
  const handleExportPdf = () => {
    const input = chartsRef.current;
    if (input) {
      html2canvas(input, { scrollY: -window.scrollY, scrollX: 0 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("dashboard.pdf"); // Save as 'dashboard.pdf'
      });
    }
  };

  return (
    <div className="">
      {/* Button to trigger PDF export */}
      <button
        onClick={handleExportPdf}
        className="p-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Download Dashboard as PDF
      </button>

      <div
        ref={chartsRef} // Attach the reference to the charts container
        className={`transition-all duration-300 ease-in-out bg-background dark:bg-background ${
          sidebarOpen
            ? "space-y-4"
            : "lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-4 space-y-0"
        }`}
      >
        <SalesData />
        <SalesDataPersons />
        <SalesDataByProductSection className="col-span-full" />
        <SalesDataProducts className="col-span-full" />
      </div>
    </div>
  );
}
