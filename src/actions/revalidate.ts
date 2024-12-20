
"use server";

import Redis from "ioredis";

const redis = new Redis();

// Server action that handles cache deletion and refetching logic
export async function revalidateData(spreadsheetId: string, range: string) {
  try {
    // Simulate deleting from Redis cache
    await redis.del(`spreadsheet:${spreadsheetId}[${range}]`);

    // Return a success message (or any data you need)
    return "Data is revalidated";
  } catch (error) {
    console.error("Error in refetchData:", error);
    throw new Error("Error during refetch");
  }
}
