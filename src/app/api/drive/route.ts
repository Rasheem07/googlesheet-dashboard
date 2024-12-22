/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/googleSheets/route.ts

import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Define the structure of the Google API response
interface Sheet {
  properties: {
    title: string;
  };
}

interface Spreadsheet {
  properties: {
    title: string;
  };
  sheets: Sheet[];
}

export async function GET(req: NextRequest) {
  // Extract the access token from cookies
  const tokenCookie = req.cookies.get('google_tokens');
  
  if (!tokenCookie) {
    return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
  }

  const tokens = JSON.parse(tokenCookie.value);

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: tokens.access_token,
  });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    // Fetch list of spreadsheets from Google Drive
    const driveResponse = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });

    const files = driveResponse.data.files;
    if (!files || files.length === 0) {
      return NextResponse.json({ message: 'No spreadsheets found' }, { status: 404 });
    }

    // Fetch the first spreadsheet details
    const spreadsheetId = files[0].id;
    if (!spreadsheetId) {
      return NextResponse.json({ message: 'Spreadsheet ID not found' }, { status: 404 });
    }

    // Fetch the spreadsheet metadata, including last updated time
    const spreadsheetResponse = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const spreadsheetData = spreadsheetResponse.data as Spreadsheet;

    // Fetch file metadata from Google Drive to get the last updated time
    const fileMetadataResponse = await drive.files.get({
      fileId: spreadsheetId,
      fields: 'modifiedTime',
    });

    const lastUpdated = fileMetadataResponse.data.modifiedTime as string;

    // Convert the last updated time to a localized string
    const formattedLastUpdated = new Date(lastUpdated).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // You can set this to false for 24-hour format
    });

    return NextResponse.json({
      id: spreadsheetId,
      name: spreadsheetData.properties.title,
      sheets: spreadsheetData.sheets.map((sheet) => sheet.properties.title),
      lastUpdated: formattedLastUpdated, // Include the localized last updated time
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching spreadsheet', details: error.message }, { status: 500 });
  }
}
