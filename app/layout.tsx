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
  title: "LMV Fellowship | Coming Soon",
  description:
    "Love made visible. The LMV Fellowship is coming soon. Sign up to be notified when we launch.",
  openGraph: {
    title: "LMV Fellowship | Coming Soon",
    description:
      "Love made visible. The LMV Fellowship is coming soon. Sign up to be notified when we launch.",
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
