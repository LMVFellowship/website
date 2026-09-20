/**
 * Appends signups to a Google Sheet through an Apps Script Web App.
 *
 * The script's source is `scripts/sheets-webhook.gs`; the README has the deploy
 * steps. Two quirks of Apps Script drive the shape of the request:
 *
 *   1. A Web App always answers 200 unless the script itself blew up, so the
 *      HTTP status alone cannot tell us whether the row landed. The real
 *      outcome is the `ok` field of the JSON body, and both are checked.
 *   2. `doPost` cannot read request headers, so the shared secret travels in
 *      the POST body. It is never logged or included in an error message.
 *
 * A POST to a Web App also answers 302 to a googleusercontent.com URL that
 * carries the output. `fetch` follows that by default, which is what makes the
 * response body readable here.
 */

type Signup = { name: string; email: string };

type SheetResponse = { ok?: boolean; duplicate?: boolean; error?: string };

/**
 * Appends the signup as a row. Returns `true` when the sheet recorded it,
 * `false` when no sheet is configured, and throws when the write failed.
 */
export async function appendToSheet(signup: Signup) {
  const url = process.env.LMV_SHEETS_WEBHOOK_URL;
  const token = process.env.LMV_SHEETS_SHARED_SECRET;

  if (!url || !token) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...signup,
      source: "lmv-coming-soon",
      submittedAt: new Date().toISOString(),
      token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheet webhook responded with ${response.status}`);
  }

  const result: SheetResponse | null = await response.json().catch(() => null);

  if (!result || result.ok !== true) {
    throw new Error(
      `Google Sheet webhook rejected the signup: ${result?.error ?? "unreadable response"}`,
    );
  }

  if (result.duplicate) {
    console.info(
      `${signup.email} is already in the Google Sheet — kept the original row.`,
    );
  }

  return true;
}

/** Whether a Google Sheet is configured as a delivery channel. */
export function isSheetConfigured() {
  return Boolean(
    process.env.LMV_SHEETS_WEBHOOK_URL && process.env.LMV_SHEETS_SHARED_SECRET,
  );
}
