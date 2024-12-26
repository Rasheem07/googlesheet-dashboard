import "./globals.css";

import ReactQueryProvider from "@/contexts/reactQueryProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
