import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

/**
 * Brand type.
 *
 * The brand specifies Proxima Nova for subheaders and body copy, and Retro
 * Signature as the script accent. Both are commercial licences, so the site
 * currently ships a free stand-in for Proxima Nova: Figtree, the nearest
 * geometric-humanist sans. Swapping in the real face is a change to this one
 * declaration and nothing else, because everything downstream uses the
 * --font-sans / --font-display tokens.
 *
 * Retro Signature is not loaded as a webfont at all. The script only ever
 * appears as the wordmark, which ships as artwork (public/logo.gif and
 * public/lmv-mark.png), so no licensed script face is needed on the page.
 */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  // Without this, Next resolves the share image against localhost in
  // development and against the per-deployment Vercel URL in production,
  // rather than the canonical host.
  metadataBase: new URL("https://www.lmvfellowship.com"),
  title: "LMV Fellowship",
  description:
    "Love made visible. A year-long fellowship built for artists, by artists, designed to help emerging visual artists advance their careers.",
  openGraph: {
    title: "LMV Fellowship",
    description:
      "Love made visible. A year-long fellowship built for artists, by artists, designed to help emerging visual artists advance their careers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
