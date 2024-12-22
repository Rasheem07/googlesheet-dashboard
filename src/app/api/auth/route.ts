// app/api/auth/route.ts

import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

// Initialize OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);

export async function GET() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // offline access for refresh tokens
    scope: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  return NextResponse.redirect(authUrl);
}
