import { Invoice } from "@/types/salesDataTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
self.onmessage = function (e) {
  console.log("Worker received message:", e.data);
  const data = getMonthlySalesDataBySection(e.data.sheetData, e.data.section);
  self.postMessage(data); // Send the actual data, not a string
};

const groupSectionData = (data: Invoice[], section: string) => {
  return data.reduce((acc, item) => {
    if (item.productSection === section) {
      const { productList, monthAndYear, productQuantity, totalAmount } = item;

      if (acc[monthAndYear]) {
        if (acc[monthAndYear][productList]) {
          acc[monthAndYear][productList].productQuantity += productQuantity;
          acc[monthAndYear][productList].totalAmount += totalAmount;
          acc[monthAndYear][productList].sales += 1;
        } else {
          acc[monthAndYear][productList] = {
            productQuantity,
            totalAmount,
            sales: 1,
          };
        }
      } else {
        acc[monthAndYear] = {
          [productList]: {
            productQuantity,
            totalAmount,
            sales: 1,
          },
        };
      }
    }
    return acc;
  }, {} as Record<string, Record<string, { productQuantity: number, totalAmount: number, sales: number }>>);
};

const getMonthlySalesDataBySection = (data: any[], section: string) => {
  const sectionData = groupSectionData(data, section);

  // Flatten the data structure and order by monthAndYear in descending order
  const result = Object.entries(sectionData)
    .sort((a, b) => {
      // Sort by monthAndYear in descending order
      return b[0].localeCompare(a[0]);
    })
    .map(([monthAndYear, products]) => {
      return {
        monthAndYear,
        products: Object.entries(products).map(([productList, details]) => ({
          productList,
          ...details,
        })),
      };
    });

  return result;
};
