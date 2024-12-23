import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "@/components/headers/secondaryHeader";
import AnalyticsContextProvider from "@/contexts/analyticsContext";
import { GoogleSheetsProvider } from "@/contexts/googlesheetContext";

export const metadata: Metadata = {
  title: "Dashify - dashboard for particular sheet",
  description: "visualizing and grouping a sheet data",
};

async function SpreadsheetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleSheetsProvider>
      <SidebarProvider className="flex">
        <AnalyticsContextProvider>
          <AppSidebar />
          <main className="w-full min-w-screen sm:min-w-0 relative">
            <div className="sm:hidden absolute top-0 left-0 py-3 px-2">
              <SidebarTrigger />
            </div>
            <Header />
            {children}
          </main>
        </AnalyticsContextProvider>
      </SidebarProvider>
    </GoogleSheetsProvider>
  );
}

export default SpreadsheetLayout;
