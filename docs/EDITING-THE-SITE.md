# Editing the site

How to change the LMV Fellowship site and get it live. Written for whoever is
driving, and for the Claude session helping them.

## The short version

The site deploys itself. Vercel watches the `main` branch of this repository,
so **anything merged into `main` is live within about a minute**. Nothing is
uploaded by hand and there is no separate publish step.

The safe path for every change is the same:

1. Work on a branch, never directly on `main`.
2. Open a pull request.
3. Merge it.
4. Check the live site.

## The two pages

| URL | File | What it is |
| --- | --- | --- |
| `/` | `app/page.tsx` | The signup page. Wordmark and the notify-me form. This is the page people are sent to. |
| `/home` | `app/home/page.tsx` | The full fellowship page. About, what fellows get, the cohort, the team, the signup form. |

Nothing links from `/` to `/home`. That is deliberate.

## Where the editable content lives

Almost everything you would want to change on the full page is a list near the
top of `app/home/page.tsx`. You do not need to touch the layout below it.

| What | Name in the file |
| --- | --- |
| The anchor links in the sticky bar | `SECTION_NAV` |
| The seven outcomes under "What fellows get" | `OUTCOMES` |
| The figures (artists, year, based in) | `NUMBERS` |
| Zakiyya's name, role and LinkedIn | `FOUNDER` |
| How many advisory board slots show | `ADVISORY_BOARD_SIZE` |
| The cohort artists | `COHORT` |
| The accordion questions and answers | `DETAILS` |
| The rule colour under each heading | `ACCENT` |

### Adding or changing a cohort artist

Each artist is one entry in `COHORT`:

```ts
{
  name: "Zoraye Cyrus",
  practice: "Muralist",
  handle: "zorayecyrus1",          // Instagram handle, no @
  photo: "/cohort/zoraye-cyrus.jpg",
},
```

The photo file goes in `public/cohort/`. The `photo` value is that path with
`public` dropped, so `public/cohort/jane-doe.jpg` is written
`/cohort/jane-doe.jpg`. Portraits are cropped to a 4:5 frame, so a tall photo
sits better than a wide one.

If an artist has no photo yet, leave `photo` out and the slot shows a reserved
frame rather than a broken image.

### Changing the logo

`public/logo.gif` is the animated wordmark. Swap the file and both pages pick
it up. The size is read from the file itself, so a different size is fine. See
`public/README.md` before replacing it: there are two traps, a transparent
first frame and the loop setting.

## House rules

**Never use an em dash in anything a person reads.** This is set out in
`AGENTS.md` and it covers site copy, page titles, alt text and both emails.

**Page copy comes from the fellowship's talking points.** The wording on
`/home` is taken from that document rather than written fresh. If a section
needs new words, they should come from the document, not be invented.

## The signup emails

A signup sends two emails through Resend (`app/emails.ts`): a notification to
`contact@lmvfellowship.com`, and a thank-you to the person who signed up.

These are switched on by environment variables in Vercel, not in the code:

| Variable | Needed |
| --- | --- |
| `RESEND_API_KEY` | Yes |
| `LMV_FROM_EMAIL` | Yes |
| `LMV_NOTIFICATION_EMAIL` | No, defaults to `contact@lmvfellowship.com` |
| `LMV_SIGNUP_WEBHOOK_URL` | No, for sending signups to a Google Sheet |

Three things that catch people out:

- **Both of the first two are required together.** With only one set, nothing
  sends and the visitor still sees a success message.
- **The domain in `LMV_FROM_EMAIL` must be verified in Resend**, or every send
  is rejected.
- **Changing a variable does not affect the site until you redeploy.** Vercel,
  Deployments, the three dots, Redeploy.

The sender name people see in their inbox comes from `LMV_FROM_EMAIL`, not
from the code.

## Checking a change before it goes live

Run these from the project folder. All three should pass with no output other
than the build summary:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

To look at the site locally:

```bash
npm run dev
```

Then open the address it prints, usually `http://localhost:3000`.

## Checking a change after it goes live

Give it a minute, then load www.lmvfellowship.com in a private window. A normal
window can show you a cached copy and make a change look like it failed.

Two specific things worth knowing:

- Social previews (LinkedIn, Facebook, iMessage) cache aggressively. A stale
  preview is their cache, not the site. LinkedIn's Post Inspector and
  Facebook's Sharing Debugger force a refresh.
- `/home` once redirected to `/` with a permanent redirect. Browsers cache
  those indefinitely, so anyone who opened `/home` during that window may still
  be bounced to `/` from their own cache. A hard reload clears it.

## If something breaks

Every deploy is a merge commit, so the fix is to revert it. On GitHub, open the
pull request that caused it and press **Revert**, then merge the revert. The
site goes back within a minute. Nothing is lost: the original work is still in
the repository.
