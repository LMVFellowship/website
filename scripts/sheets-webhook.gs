/**
 * LMV Fellowship signup webhook, Google Apps Script.
 *
 * Appends one row per signup to the bound spreadsheet. Paste this into the
 * Apps Script editor attached to the Sheet, then deploy it as a web app and
 * point LMV_SIGNUP_WEBHOOK_URL at the resulting /exec URL.
 *
 * SETUP
 *
 * 1. Create the Sheet. The header row is written automatically on the first
 *    signup, so you do not need to add it by hand.
 * 2. Open script.google.com (the editor is desktop web only, it is not in
 *    the mobile Sheets app), create a project bound to the Sheet, and paste
 *    this file in.
 * 3. Set SHARED_SECRET below to a long random string of your own.
 * 4. Deploy > New deployment > Web app.
 *      Execute as:      Me
 *      Who has access:  Anyone
 * 5. Copy the /exec URL and add the secret as a query parameter, so the
 *    value you paste into Vercel looks like:
 *
 *      https://script.google.com/macros/s/AKfy.../exec?token=YOUR_SECRET
 *
 *    Putting the secret in the URL means the site needs no code change: it
 *    already posts the signup as JSON to whatever URL you configure.
 * 6. Set that as LMV_SIGNUP_WEBHOOK_URL in Vercel (Production) and redeploy.
 *
 * AFTER EDITING THIS SCRIPT
 *
 * Saving does not update the live URL. Deploy > Manage deployments > edit >
 * New version, or the deployed web app keeps running the old code.
 *
 * The request body posted by the site looks like:
 *
 *   { "name": "Ada Lovelace",
 *     "email": "ada@example.com",
 *     "source": "lmv-coming-soon",
 *     "submittedAt": "2026-09-21T00:00:00.000Z" }
 */

/** Replace with your own long random string. Anyone with the URL can write. */
var SHARED_SECRET = "CHANGE_ME_to_a_long_random_string";

/** Name of the tab to append to. */
var SHEET_NAME = "Signups";

var HEADERS = ["Timestamp", "Name", "Email", "Source"];

function doPost(e) {
  // A web app deployed to "Anyone" is a public endpoint, so the secret is
  // what stops strangers appending rows. Fail loudly rather than silently
  // accepting: the site treats a non-2xx as a delivery failure and logs it.
  var token = e && e.parameter ? e.parameter.token : null;
  if (token !== SHARED_SECRET) {
    throw new Error("Forbidden: bad or missing token.");
  }

  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Bad request: no body.");
  }

  var signup = JSON.parse(e.postData.contents);

  // Two people can submit at the same moment. Without a lock both can read
  // the same last row and one write overwrites the other.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet_();
    sheet.appendRow([
      signup.submittedAt ? new Date(signup.submittedAt) : new Date(),
      signup.name || "",
      signup.email || "",
      signup.source || "",
    ]);
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true });
}

/** Visiting the URL in a browser should not look broken. */
function doGet() {
  return json_({ ok: true, message: "LMV signup webhook is running." });
}

function getSheet_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }

  // Write the header row once, on the first signup.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}
