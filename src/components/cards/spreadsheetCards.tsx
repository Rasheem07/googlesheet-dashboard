'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "lucide-react"; // For the "Last Updated" icon
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default async function SpreadsheetCard() {
  const spreadsheets = await fetch("http://localhost:3000/api/drive", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  const data = await spreadsheets.json();


  console.log(data)
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {data?.name}
        </CardTitle>
        <CardDescription>{data?.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-gray-600">Sheets:</p>
            <ul className="text-sm text-gray-500 space-y-1">
              {data?.sheets?.map((sheet: any, index: any) => (
                <li key={index} className="truncate">
                  {sheet}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>Last Updated: {data?.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2 rounded-lg bg-gray-100">
          View Spreadsheet
        </button>
      </CardFooter>
    </Card>
  );
};
