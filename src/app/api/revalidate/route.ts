
import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis();

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const spreadsheetId = url.searchParams.get("spreadsheetId");
    const range = url.searchParams.get("range");


    await redis.del(
      `spreadsheet:${spreadsheetId}[${range}]`
    );
    

    return new Response("Data is revalidated", {
      status: 200
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error retrieving data from Google Sheets" },
      { status: 500 }
    );
  }
}
