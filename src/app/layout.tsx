import { GoogleSheetsProvider } from "@/contexts/googlesheetContext";
import ReactQueryProvider from "@/contexts/reactQueryProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <GoogleSheetsProvider>{children}</GoogleSheetsProvider>
    </ReactQueryProvider>
  );
}
