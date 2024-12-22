import PrimaryHeader from "@/components/headers/primaryHeader";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrimaryHeader />
      {children}
    </>
  );
}
