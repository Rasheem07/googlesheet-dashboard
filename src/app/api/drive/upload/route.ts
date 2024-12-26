import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the POST handler for the file upload
export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming form data
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get("file");

    // Check if a file is received
    if (!file) {
      // If no file is received, return a JSON response with an error and a 400 status code
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await (file as File).arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = (file as File).name.replaceAll(" ", "_");
    console.log(`Uploaded file: ${filename}`);

    // Define the file path where the file will be saved temporarily
    const tempFilePath = path.join(process.cwd(), "tmp", filename);

    // Write the file to the temporary directory
    await fs.promises.writeFile(tempFilePath, buffer);

    // Check for Google OAuth token in cookies
    const tokenCookie = req.cookies.get("google_tokens");
    if (!tokenCookie) {
      // If no token, return error response
      return NextResponse.json(
        { error: "No access token provided" },
        { status: 401 }
      );
    }

    const tokens = JSON.parse(tokenCookie.value);
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
    });

    // Create Google Drive instance
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Prepare file metadata for Google Drive
    const fileMetadata = {
      name: filename,
      mimeType: "application/vnd.google-apps.spreadsheet",
    };

    const media = {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body: fs.createReadStream(tempFilePath),
    };

    // Upload the file to Google Drive
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Return success response with file ID from Google Drive
    return NextResponse.json({ fileId: response.data.id }, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading the file", details: error.message },
      { status: 500 }
    );
  }
};

