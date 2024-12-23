/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/callback/route.ts

import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { withCors } from "@/lib/cors"; // Adjust the import path according to your project structure

// Initialize OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Set tokens in cookies
    const response = NextResponse.redirect("http://localhost:3000/en/dashboard");
    response.cookies.set("google_tokens", JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to exchange code for token",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export const GET = withCors(handler);
