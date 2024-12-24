import React, { ReactNode } from "react";

export default function HeiglightText({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg py-0.5 px-3 bg-emerald-400 text-white">
      {children}
    </span>
  );
}
