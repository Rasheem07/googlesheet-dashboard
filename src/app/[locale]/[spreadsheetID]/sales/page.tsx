"use client";
import SalesDataTable from "@/components/tables/salesDataTable";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

 function SalesPage({}: Props) {

  return <SalesDataTable />;
}

export default React.memo(SalesPage);