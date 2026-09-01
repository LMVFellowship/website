# Static assets

## `logo.gif` — the wordmark on the landing page

Drop the animated logo here as **`logo.gif`** and the landing page picks it up
automatically on the next build. Nothing else needs to change:

- The intrinsic size is read from the GIF's own header, so any dimensions work.
- It is rendered with `unoptimized`, which keeps the animation intact —
  Next.js image optimization would otherwise flatten it to a single frame.
- If the file is missing (or isn't a GIF), the page falls back to the
  `_love made visible` script wordmark, so the site never renders a broken
  image.

See `app/logo.tsx`.
