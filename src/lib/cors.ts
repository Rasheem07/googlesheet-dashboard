// lib/cors.ts

import { NextRequest, NextResponse } from "next/server";

export function withCors(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
  return async (req: NextRequest) => {
    const response = await handler(req);

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return new NextResponse(null, { headers: response.headers });
    }

    return response;
  };
}
