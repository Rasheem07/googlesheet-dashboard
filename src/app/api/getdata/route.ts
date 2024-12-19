// pages/api/getGoogleSheetData.ts (Next.js 13 API Route)

import { NextRequest, NextResponse } from "next/server"; // for Next.js 13 with App Directory
import { google } from "googleapis";
import {
  convertToObjectArray,
  flattenSalesData,
} from "@/utils/generalFunctions";
import { Invoice } from "@/types/salesDataTypes";
import Redis from "ioredis";

const redis = new Redis();

export async function GET(req: NextRequest) {
  try {
    console.log('present here')
    // Extract the query parameters correctly for Next.js 13
    const url = new URL(req.url);
    const spreadsheetId = url.searchParams.get("spreadsheetId");
    const range = url.searchParams.get("range");

    console.time("redis")
    const redisCache = await redis.get(
      `spreadsheet:${spreadsheetId}[${range}]`
    );
    if (redisCache) {
      const parsedData = JSON.parse(redisCache);
      console.timeEnd("redis")
      return NextResponse.json(parsedData, { status: 200 });
    }

    if (!spreadsheetId || !range) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.time("google sheet api time");
    // Load Google credentials from environment variables
    const googleCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS as string
    );

    // Set up GoogleAuth with the loaded credentials
    const auth = new google.auth.GoogleAuth({
      credentials: googleCredentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Create the Google Sheets API client
    const sheets = google.sheets({ version: "v4", auth });

    // Fetch data from Google Sheets
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const data = result.data.values;
    console.timeEnd("google sheet api time");

    console.log(data?.slice(0, 10));
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    console.time("Data processing time");
    const convertedArray = convertToObjectArray(data);
    // Process the data
    const processedData = flattenSalesData(convertedArray) as Invoice[];

    await redis.set(
      `spreadsheet:${spreadsheetId}[${range}]`,
      JSON.stringify(processedData)
    );
    console.timeEnd("Data processing time");
    // Send back the processed data
    return NextResponse.json(processedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error retrieving data from Google Sheets" },
      { status: 500 }
    );
  }
}
