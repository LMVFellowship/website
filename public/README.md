# Static assets

## `logo.gif`, the animated wordmark

The `_love made visible` wordmark, animated as handwriting. Used as the logo on
the landing page (`/`) and as the page title on `/home`, via `app/logo.tsx`:

- The intrinsic size is read from the GIF's own header, so the file can be
  swapped for a different one without touching code.
- It is rendered with `unoptimized`, which keeps the animation intact , 
  Next.js image optimization would otherwise flatten it to a single frame.
- If the file is missing (or isn't a GIF), the page falls back to the
  `_love made visible` script wordmark, so the site never renders a broken
  image.

Cropped from the supplied export, which carried a large transparent margin
(artwork was 943×79 inside an 1056×816 canvas). Re-crop losslessly with
`gifsicle --crop x,y+WxH in.gif -o logo.gif` rather than re-encoding.

## `lmv-mark.png`, the corner monogram

The `_lmv` mark used in the top-left of the `/home` nav. Transparent
background, white artwork, so it needs a dark surface behind it.
