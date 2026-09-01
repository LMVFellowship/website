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

| Variable                  | Description                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`          | [Resend](https://resend.com) API key. Required to send either email.                           |
| `LMV_FROM_EMAIL`          | Sender, e.g. `LMV Creative Fellowship <hello@lmvfellowship.com>`. Required to send either email. |
| `LMV_NOTIFICATION_EMAIL`  | Who gets told about new signups. Defaults to `contact@lmvfellowship.com`.                       |
| `LMV_SIGNUP_WEBHOOK_URL`  | Optional endpoint that receives a `POST` with the signup as JSON.                               |

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

#### How failures are handled

The webhook and the notification email are the two channels that actually
*record* a signup; the thank-you is a courtesy on top. All three are attempted
in parallel, and the visitor only sees an error when **every** configured
recording channel failed — a thank-you that bounces never costs you the
address. Failures are logged either way.

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
  signup-state.ts   shared form state type shared by the two above
  globals.css       Tailwind theme tokens
public/
  logo.gif          the animated logo (drop it in; not in the repo yet)
```

`signup-state.ts` is separate from `actions.ts` because a `"use server"` module
may only export async functions.
