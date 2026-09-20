# LMV Creative Fellowship

The "coming soon" site for the LMV Creative Fellowship — a single landing page
with the `_love made visible` wordmark and a notify-me signup form.

Built with [Next.js](https://nextjs.org) (App Router) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Signup form

The form on `app/page.tsx` posts to the `subscribe` Server Action in
`app/actions.ts`, which validates the name, email, and newsletter consent on the
server before handing the signup off.

### Where signups go

Delivery is configured with environment variables:

| Variable                     | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`             | [Resend](https://resend.com) API key. Required to send either email.                           |
| `LMV_FROM_EMAIL`             | Sender, e.g. `LMV Creative Fellowship <hello@lmvfellowship.com>`. Required to send either email. |
| `LMV_NOTIFICATION_EMAIL`     | Who gets told about new signups. Defaults to `contact@lmvfellowship.com`.                       |
| `LMV_SIGNUP_WEBHOOK_URL`     | Optional endpoint that receives a `POST` with the signup as JSON.                               |
| `LMV_SHEETS_WEBHOOK_URL`     | Optional Apps Script `/exec` URL that appends signups to a Google Sheet.                        |
| `LMV_SHEETS_SHARED_SECRET`   | The token that Apps Script checks. Required alongside `LMV_SHEETS_WEBHOOK_URL`.                 |

The sending domain in `LMV_FROM_EMAIL` must be verified in Resend, otherwise
every send is rejected.

#### Emails

When `RESEND_API_KEY` and `LMV_FROM_EMAIL` are both set, each signup sends two
messages (`app/emails.ts`):

1. **A notification** to `LMV_NOTIFICATION_EMAIL` with the name, email, and
   timestamp. `Reply-To` is the subscriber, so replying reaches them directly.
2. **A thank-you** to the subscriber — "Thank you for staying updated" — with
   `Reply-To` set to the fellowship's address.

#### Webhook

The request body looks like:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "source": "lmv-coming-soon",
  "submittedAt": "2026-08-07T19:36:44.295Z"
}
```

Point this at the mailing list provider's inbound hook (Mailchimp, Beehiiv,
Zapier, a Google Apps Script, etc.).

#### Google Sheet

When `LMV_SHEETS_WEBHOOK_URL` and `LMV_SHEETS_SHARED_SECRET` are both set, each
signup appends a row — **Timestamp, Name, Email, Source** — to a Google Sheet
(`app/sheets.ts`). The endpoint is an Apps Script Web App bound to the sheet;
its source is committed at `scripts/sheets-webhook.gs`.

A **repeat email is not appended twice.** The script keeps the original row,
since its timestamp is the date that person first signed up, and reports
success — a returning visitor should not be shown an error for something they
did nothing wrong to cause. Duplicates are noted in the server log.

Two Apps Script constraints are worth knowing before changing any of this:

- **A Web App cannot set an HTTP status.** Every `doPost` that returns normally
  answers `200`, so the status alone can't say whether the row landed. The real
  outcome is the `ok` field of the JSON body, and `app/sheets.ts` checks both.
- **`doPost` cannot read request headers**, so the shared secret travels in the
  POST body rather than an `Authorization` header. It is never logged, never
  put in the URL, and never echoed back by the script.

##### Deploying the script

1. Create the Google Sheet that will hold the signups.
2. **Extensions → Apps Script**, delete the placeholder, and paste in
   `scripts/sheets-webhook.gs`. The script must be created from inside the
   sheet so it is bound to it.
3. **Project Settings → Script Properties → Add script property.** Name it
   `SHARED_SECRET` and set a long random value — e.g. from
   `openssl rand -hex 32`. Keep this value; it is needed in step 6.
4. **Deploy → New deployment → Web app.** Set *Execute as* to **Me** and
   *Who has access* to **Anyone**. "Anyone with a Google account" will not work:
   the site posts without a Google identity and every write would be rejected.
5. Copy the `/exec` URL the deploy dialog shows. Opening it in a browser should
   return `{"ok":true,"service":"lmv-signups"}`.
6. In Vercel → **Settings → Environment Variables**, set
   `LMV_SHEETS_WEBHOOK_URL` to that `/exec` URL and `LMV_SHEETS_SHARED_SECRET`
   to the value from step 3. Redeploy for them to take effect.

Editing the script later requires **Deploy → Manage deployments → Edit → New
version**; the `/exec` URL stays the same, so no environment variable changes.

#### How failures are handled

The Google Sheet, the webhook, and the notification email are the three
channels that actually *record* a signup; the thank-you is a courtesy on top.
All of them are attempted in parallel, and the visitor only sees an error when
**every** configured recording channel failed — a thank-you that bounces never
costs you the address, but a sheet write that fails while it is the only
recording channel configured does surface an error rather than silently drop
the signup. Failures are logged either way.

> **With none of these variables set, signups are not stored anywhere.**
> The visitor still sees a confirmation, but the server only logs a warning.
> Set them before sharing the site publicly.

## The logo

The landing page renders `public/logo.gif` when that file exists, reading its
dimensions from the GIF header and rendering it `unoptimized` so the animation
is preserved. Without it, the page falls back to the `_love made visible`
script wordmark. See `public/README.md` and `app/logo.tsx`.

## Project structure

```
app/
  layout.tsx        root layout, fonts, metadata
  page.tsx          the landing page
  logo.tsx          the logo (public/logo.gif, or the wordmark fallback)
  signup-form.tsx   client component for the form (useActionState)
  actions.ts        "use server" — validation + delivery
  emails.ts         notification + thank-you email via Resend
  sheets.ts         appends the signup to a Google Sheet
  signup-state.ts   shared form state type shared by the two above
  globals.css       Tailwind theme tokens
public/
  logo.gif          the animated logo (drop it in; not in the repo yet)
scripts/
  sheets-webhook.gs the Apps Script that receives signups into the Sheet
```

`signup-state.ts` is separate from `actions.ts` because a `"use server"` module
may only export async functions.
