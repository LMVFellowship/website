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

Delivery is configured with a single environment variable:

| Variable                  | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `LMV_SIGNUP_WEBHOOK_URL`  | Endpoint that receives a `POST` with the signup as JSON. Optional.      |

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

> **Until `LMV_SIGNUP_WEBHOOK_URL` is set, signups are not stored anywhere.**
> The visitor still sees a confirmation, but the server only logs a warning.
> Set the variable before sharing the site publicly.

## Project structure

```
app/
  layout.tsx        root layout, fonts, metadata
  page.tsx          the landing page
  signup-form.tsx   client component for the form (useActionState)
  actions.ts        "use server" — validation + delivery
  signup-state.ts   shared form state type shared by the two above
  globals.css       Tailwind theme tokens
```

`signup-state.ts` is separate from `actions.ts` because a `"use server"` module
may only export async functions.
