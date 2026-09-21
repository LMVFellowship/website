import type { Metadata } from "next";
import { Figtree, Sacramento } from "next/font/google";
import "./globals.css";

/**
 * Brand type.
 *
 * The brand specifies Proxima Nova for subheaders and body copy, and Retro
 * Signature as the script accent. Both are commercial licences, so the site
 * currently ships free stand-ins: Figtree for Proxima Nova (the nearest
 * geometric-humanist sans) and Sacramento for Retro Signature. Swapping in
 * the real faces is a change to these two declarations and nothing else,
 * because everything downstream uses the --font-sans / --font-display /
 * --font-script tokens.
 */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMV Fellowship — Coming Soon",
  description:
    "Love made visible. The LMV Fellowship is coming soon — sign up to be notified when we launch.",
  openGraph: {
    title: "LMV Fellowship — Coming Soon",
    description:
      "Love made visible. The LMV Fellowship is coming soon — sign up to be notified when we launch.",
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
      className={`${figtree.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
