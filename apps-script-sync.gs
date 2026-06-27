/**
 * JOSHUA ACADEMY — GOOGLE SHEETS SYNC BACKEND
 * ---------------------------------------------
 * SETUP INSTRUCTIONS:
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Name it "Joshua Academy Progress" (or anything you like).
 * 2. In the sheet, go to Extensions > Apps Script.
 * 3. Delete any starter code, paste this entire file in.
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (this is required for the webhook to work
 *      from your GitHub Pages site — it does NOT make your sheet public,
 *      only this specific script endpoint).
 * 5. Click Deploy, authorize the permissions Google asks for.
 * 6. Copy the Web App URL it gives you (ends in /exec).
 * 7. Paste that URL into the "Sync Settings" box in Joshua Academy.
 *
 * Every time you save in the app, it sends your full progress snapshot
 * here, and this script writes/updates one row in the sheet named "Log".
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    const row = [
      data.timestamp || new Date().toISOString(),
      data.currentDay || "",
      JSON.stringify(data.xp || {}),
      JSON.stringify(data.days || [])
    ];

    // Always overwrite row 2 (single latest snapshot) rather than appending forever.
    sheet.getRange(2, 1, 1, row.length).setValues([row]);

    return ContentService.createTextOutput(
      JSON.stringify({status: "ok"})
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({status: "error", message: err.message})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({status: "empty"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const row = sheet.getRange(2, 1, 1, 4).getValues()[0];
    const result = {
      timestamp: row[0],
      currentDay: row[1],
      xp: JSON.parse(row[2] || "{}"),
      days: JSON.parse(row[3] || "[]")
    };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({status: "error", message: err.message})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Log");
  if (!sheet) {
    sheet = ss.insertSheet("Log");
    sheet.getRange(1, 1, 1, 4).setValues([
      ["timestamp", "currentDay", "xp_json", "days_json"]
    ]);
  }
  return sheet;
}
