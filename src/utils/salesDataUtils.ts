/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { Invoice } from '@/types/salesDataTypes';


  export const groupSalesByPeriod = (salesData: Invoice[], dateFormat: string) => {
    return salesData.reduce((acc, item: Invoice) => {
      const periodKey = format(item.saleDate, dateFormat);
  
      if (acc[periodKey]) {
        acc[periodKey].quantity += item.productQuantity;
        acc[periodKey].amount += item.totalAmount;
      } else {
        acc[periodKey] = {
          quantity: item.productQuantity,
          amount: item.totalAmount,
        };
      }
  
      return acc;
    }, {} as Record<string, { quantity: number; amount: number }>);
  };
  

 export const convertGroupedDataToArray = (groupedData: any) => {
  
    return Object.keys(groupedData).map((key) => ({
      date: key,
      quantity: groupedData[key].quantity,
      amount: groupedData[key].amount,
    }));
  };
  
  
  