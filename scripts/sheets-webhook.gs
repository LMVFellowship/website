/**
 * LMV Creative Fellowship — appends website signups to this spreadsheet.
 *
 * This is the source for the Apps Script Web App that `app/sheets.ts` posts to.
 * It lives in the repo so it is not lost; the copy that actually runs is the one
 * pasted into the Apps Script editor. Deploy steps are in the README under
 * "Google Sheet".
 *
 * Two things about Apps Script shape the design here:
 *
 *   1. A Web App cannot set an HTTP status code. Every `doPost` that returns
 *      normally answers 200, and only an uncaught exception produces a 500 —
 *      with an HTML error page the site cannot parse. So nothing is allowed to
 *      throw, and the real outcome travels in the JSON body as `ok`.
 *   2. `doPost` has no access to request headers, so the shared secret has to
 *      travel in the POST body rather than in an Authorization header.
 */

const SHEET_NAME = 'Signups';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Source'];
const EMAIL_COLUMN = 3;
const LOCK_TIMEOUT_MS = 20000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SOURCE_LENGTH = 100;

/** Health check, so the deployment can be confirmed from a browser. */
function doGet() {
  return jsonOutput({ ok: true, service: 'lmv-signups' });
}

function doPost(e) {
  try {
    return handlePost(e);
  } catch (err) {
    // An escaping exception would become an HTML 500 that the site cannot read,
    // so failures are reported as JSON instead. The message is logged for the
    // Apps Script execution log only.
    console.error('Unexpected error handling a signup', err);
    return jsonOutput({ ok: false, error: 'unexpected_error' });
  }
}

function handlePost(e) {
  const secret =
    PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');

  if (!secret) {
    return jsonOutput({ ok: false, error: 'shared_secret_not_configured' });
  }

  if (!e || !e.postData || !e.postData.contents) {
    return jsonOutput({ ok: false, error: 'empty_body' });
  }

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'invalid_json' });
  }

  // This endpoint is deployed as "Anyone", so the token is the only thing
  // standing between the sheet and the open internet. Never echo it back.
  if (typeof body.token !== 'string' || body.token !== secret) {
    return jsonOutput({ ok: false, error: 'unauthorized' });
  }

  const name = clean(body.name, MAX_NAME_LENGTH);
  const email = clean(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const source = clean(body.source, MAX_SOURCE_LENGTH) || 'unknown';

  if (!name || !email) {
    return jsonOutput({ ok: false, error: 'missing_name_or_email' });
  }

  const submittedAt = parseDate(body.submittedAt);

  // Two people submitting at once would otherwise race between the duplicate
  // check and the append.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(LOCK_TIMEOUT_MS);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'busy' });
  }

  try {
    const sheet = getSignupSheet();

    if (findEmailRow(sheet, email) > 0) {
      // Already on the list. Keep the original row — its timestamp is the date
      // they first signed up, which is worth more than the latest attempt — and
      // report success so a repeat visitor is not shown an error for something
      // they did nothing wrong to cause.
      return jsonOutput({ ok: true, duplicate: true });
    }

    sheet.appendRow([submittedAt, name, email, source]);
    return jsonOutput({ ok: true, duplicate: false });
  } finally {
    lock.releaseLock();
  }
}

/** Returns the Signups sheet, creating it with a header row if needed. */
function getSignupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/** Row number of an existing signup for this email, or 0 when there is none. */
function findEmailRow(sheet, email) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return 0;

  const values = sheet.getRange(2, EMAIL_COLUMN, lastRow - 1, 1).getValues();

  for (let i = 0; i < values.length; i++) {
    const cell = String(values[i][0] || '')
      .trim()
      .toLowerCase();
    if (cell && cell === email) return i + 2;
  }

  return 0;
}

function clean(value, maxLength) {
  return String(value == null ? '' : value)
    .trim()
    .slice(0, maxLength);
}

/** The site sends an ISO string; store a real Date so the sheet can sort it. */
function parseDate(value) {
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload),
  ).setMimeType(ContentService.MimeType.JSON);
}
