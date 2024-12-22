/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN UI components
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function InvoiceCard() {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set document title and basic styles
    doc.setFont("helvetica", "normal");

    // Add title and styling
    doc.setFontSize(20);
    doc.setTextColor(40, 55, 71);
    doc.text("Invoice", 14, 22);

    // Add company name, contact info, and other static info
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Al-Nubras Company", 14, 30);
    doc.text("Address: Example Address, City", 14, 36);
    doc.text("Phone: +1 (123) 456-7890", 14, 42);
    doc.text("Email: contact@nubras.com", 14, 48);

    // Draw a horizontal line for visual separation
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(14, 53, 200, 53); // From x=14 to x=200, at y=53

    // Add Invoice Details
    doc.setFontSize(10);
    doc.text("Invoice Number: #12345", 14, 58);
    doc.text("Date: 01/Jan/2022", 14, 64);
    doc.text("Due Date: 15/Jan/2022", 14, 70);

    // Add some spacing
    doc.text(" ", 14, 76);

    // Define table headers and body
    const columns = [
      { title: "Product", dataKey: "product" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Unit Price", dataKey: "unitPrice" },
      { title: "Total", dataKey: "total" },
    ];

    const rows = [
      {
        product: "Product 1",
        quantity: 2,
        unitPrice: "$50.00",
        total: "$100.00",
      },
      {
        product: "Product 2",
        quantity: 1,
        unitPrice: "$75.00",
        total: "$75.00",
      },
      {
        product: "Product 3",
        quantity: 3,
        unitPrice: "$30.00",
        total: "$90.00",
      },
    ];

    // Add the table using autoTable plugin
    (doc as any).autoTable({
      head: [columns.map((col) => col.title)],
      body: rows.map((row) => [
        row.product,
        row.quantity,
        row.unitPrice,
        row.total,
      ]),
      startY: 80, // Start table 80mm from top
      theme: "grid", // Use grid theme
      headStyles: {
        fillColor: [30, 45, 60], // Dark grayish blue for header background
        textColor: [255, 255, 255], // White text color for header
        fontSize: 12,
        fontStyle: "bold",
        halign: "center", // Header text aligned to center
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        textColor: [50, 50, 50], // Slight gray for body text
        lineWidth: 0.5,
        lineColor: [200, 200, 200],
      },
      columnStyles: {
        0: { halign: "left" }, // Align first column (product) to the left
        1: { halign: "center" }, // Align second column (quantity) to center
        2: { halign: "right" }, // Align third column (unit price) to the right
        3: { halign: "right" }, // Align fourth column (total) to the right
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Light gray for alternate rows
      },
    });

    // Add footer with total
    const totalAmount = rows.reduce(
      (sum, row) => sum + parseFloat(row.total.replace("$", "")),
      0
    );
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total Amount: $${totalAmount.toFixed(2)}`,
      14,
      (doc as any).lastAutoTable.finalY + 10
    );

    // Save the PDF
    doc.save("invoice_with_enhanced_layout.pdf");
  };

  return (
    <div className="flex justify-center items-center py-8 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-zinc-200 hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-zinc-500 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Invoice Details</h2>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Month & Year
              </label>
              <span className="text-lg font-bold text-gray-900">
                01/Jan/2022
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Invoice Number
              </label>
              <span className="text-lg font-bold text-gray-900">
                NUBRAS BRANCH
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Order Status
              </label>
              <span className="text-lg font-bold text-gray-900">Completed</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Customer Location
              </label>
              <span className="text-lg font-bold text-gray-900">
                New York, USA
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Visa Payment
              </label>
              <span className="text-lg font-bold text-green-600">$500</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Bank Transfer
              </label>
              <span className="text-lg font-bold text-blue-600">$200</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Cash Payment
              </label>
              <span className="text-lg font-bold text-yellow-600">$150</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Advance Payment
              </label>
              <span className="text-lg font-bold text-red-600">$100</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Product Quantity
              </label>
              <span className="text-lg font-bold text-gray-900">10 pcs</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Product Price/PC
              </label>
              <span className="text-lg font-bold text-gray-900">$50</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Tax Amount
              </label>
              <span className="text-lg font-bold text-green-700">$25</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Amount Excluding Tax
              </label>
              <span className="text-lg font-bold text-gray-900">$475</span>
            </div>
          </div>

          {/* Total and Balance Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Total Amount
              </label>
              <span className="text-xl font-semibold text-indigo-700">
                $500
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Balance Amount
              </label>
              <span className="text-xl font-semibold text-red-700">$50</span>
            </div>
          </div>

          {/* Delivery and Payment Completed Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Delivery Date
              </label>
              <span className="text-lg font-bold text-gray-900">
                10/Jan/2022
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                Payment Completed Date
              </label>
              <span className="text-lg font-bold text-gray-900">
                12/Jan/2022
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-6">
            <Button
              variant="default"
              className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg"
              onClick={handleDownloadPDF}
            >
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
