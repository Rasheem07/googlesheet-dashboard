
import ReactQueryProvider from "@/contexts/reactQueryProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}
