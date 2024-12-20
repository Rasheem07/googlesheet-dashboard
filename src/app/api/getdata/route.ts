// pages/api/getGoogleSheetData.ts (Next.js 13 API Route)

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { convertToObjectArray, flattenSalesData } from "@/utils/generalFunctions";
import { Invoice } from "@/types/salesDataTypes";
import Redis from "ioredis";
import zlib from "zlib";

const redis = new Redis({
  username: 'default',
  password: 'xoXIbbStKTRlLixUjkryALh7LQ34WY5O',
  host: 'redis-13079.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
  port: 13079,
  tls: {}, // If SSL/TLS is required
});

export async function GET(req: NextRequest) {
  try {
    // Extract the query parameters correctly for Next.js 13
    const url = new URL(req.url);
    const spreadsheetId = url.searchParams.get("spreadsheetId");
    const range = url.searchParams.get("range");

    console.time("redis");
    const redisCache = await redis.get(`spreadsheet:${spreadsheetId}[${range}]`);
    if (redisCache) {
      console.timeEnd("redis");

      const compressedData = zlib.gzipSync(redisCache);
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip'
      });
      return new Response(compressedData, {
        status: 200,
        headers: headers,
      });
    }

    if (!spreadsheetId || !range) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    console.time("google sheet api time");
    // Load Google credentials from environment variables
    const googleCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);

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

    await redis.set(`spreadsheet:${spreadsheetId}[${range}]`, JSON.stringify(processedData));
    console.timeEnd("Data processing time");

    // Prepare the response data
    const responseData = JSON.stringify(processedData);
    const compressedData = zlib.gzipSync(responseData);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip'
    });

    return new Response(compressedData, {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error retrieving data from Google Sheets" }, { status: 500 });
  }
}
