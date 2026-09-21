import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo";
import SignupForm from "../signup-form";

export const metadata: Metadata = {
  title: "Love Made Visible — LMV Fellowship",
  description:
    "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists in Miami advance their careers.",
  openGraph: {
    title: "Love Made Visible — LMV Fellowship",
    description:
      "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists in Miami advance their careers.",
    type: "website",
  },
};

const CONTACT_EMAIL = "contact@lmvfellowship.com";

/** The anchor bar that sits directly under the hero. */
const SECTION_NAV = [
  { href: "#about", label: "About" },
  { href: "#benefits", label: "What Fellows Get" },
  { href: "#numbers", label: "By The Numbers" },
  { href: "#cohort", label: "The Cohort" },
  { href: "#stay-updated", label: "Stay Updated" },
];

const BENEFITS = [
  {
    title: "Business of art",
    body: "Education on pricing, contracts, intellectual property, and the economics behind the art world.",
  },
  {
    title: "Relationships",
    body: "Introductions to curators, collectors, gallerists, and institutions — the people who move a career forward.",
  },
  {
    title: "Real opportunities",
    body: "Pathways toward exhibitions, commissions, acquisitions, and meaningful additions to a CV.",
  },
  {
    title: "Miami Art Week",
    body: "Every December, an international art market arrives. Fellows learn how those rooms actually work.",
  },
];

const NUMBERS = [
  { value: "7", label: "Artists" },
  { value: "1", label: "Year" },
  { value: "Miami", label: "Based in" },
  { value: "Dec", label: "Art Week" },
];

/** Short answers only — the page should skim, not read. */
const DETAILS = [
  {
    q: "What is Love Made Visible?",
    a: "A year-long fellowship for a curated cohort of seven emerging visual artists, combining education on the business of art with relationships, cultural experiences, and real opportunities.",
  },
  {
    q: "Why does it exist?",
    a: "There isn’t a shortage of talent in Miami — there’s a shortage of access. LMV shortens the distance between making strong work and knowing the people who can move a career forward.",
  },
  {
    q: "What do fellows leave with?",
    a: "Tangible progress: a stronger portfolio, a clear pricing structure, new collector and institutional relationships, exhibition pathways, and a career strategy for the next one to three years.",
  },
  {
    q: "How can I get involved?",
    a: "Teach, mentor, introduce, host, commission, acquire, or fund. The question worth asking is what you have access to that could create motion for an artist.",
  },
];

const COHORT_SIZE = 7;

/** Brand slate-blue, used the way the reference uses its accent rule. */
const ACCENT = "#6f7c99";

function SectionHeading({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`font-display text-2xl font-light uppercase leading-snug tracking-[0.2em] sm:text-3xl ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}

/**
 * A bordered panel whose heading breaks through the top edge — the
 * reference's signature device for "Member Benefits" / "By The Numbers".
 */
function FramedPanel({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative border-[3px] px-6 pb-12 pt-14 sm:px-10 sm:pb-14 sm:pt-16"
          style={{ borderColor: ACCENT }}
        >
          {/* Sits on the border line, with the page background knocking it
              out. It must stay on ONE line — a wrapped heading straddles the
              border and reads as broken — so it scales down instead. */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 sm:px-8">
            <h2 className="whitespace-nowrap text-center font-display text-base font-light uppercase leading-none tracking-[0.2em] sm:text-xl lg:text-3xl">
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Masthead */}
      <header className="border-b border-white/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="shrink-0">
            <Image
              src="/lmv-mark.png"
              alt="LMV — Love Made Visible"
              width={448}
              height={159}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex h-10 items-center rounded-full bg-white px-5 font-display text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/85"
          >
            Get involved
          </a>
        </div>
      </header>

      <main>
        {/* Hero — the animated wordmark stands in for the reference's video */}
        <section className="px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <h1>
              <Logo className="h-auto w-full max-w-[820px]" />
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
              A year-long fellowship built for artists, by artists.
            </p>
          </div>
        </section>

        {/* Anchor bar, as the reference places directly below its video */}
        <nav className="border-y border-white/15 bg-white/[0.03]">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 sm:gap-x-12">
            {SECTION_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-display text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* About — heading left with accent rule, body right */}
        <section id="about" className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
            <div>
              <SectionHeading>About</SectionHeading>
              <div
                className="mt-5 h-[3px] w-24"
                style={{ backgroundColor: ACCENT }}
              />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
              <p>
                Love Made Visible surrounds a curated cohort of seven emerging
                visual artists with education on the business of art,
                relationships, cultural experiences, and real opportunities —
                helping them strengthen the infrastructure around their talent.
              </p>
              <p className="text-white/60">
                There isn’t a shortage of talent in Miami. There’s a shortage of
                access. LMV is designed to shorten that distance.
              </p>
            </div>
          </div>
        </section>

        {/* What fellows get — framed panel, rule-divided columns */}
        <div className="pt-8 sm:pt-10" />
        <FramedPanel id="benefits" title="What Fellows Get">
          <ul className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <li
                key={benefit.title}
                // At 2-up the divider belongs on the right-hand column; at
                // 4-up it belongs on every column but the first.
                className={`border-white/20 px-0 sm:px-7 ${
                  i % 2 === 1 ? "sm:border-l" : ""
                } ${i > 0 ? "lg:border-l" : ""}`}
              >
                <h3 className="font-display text-xs uppercase tracking-[0.2em] text-white">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/65">
                  {benefit.body}
                </p>
              </li>
            ))}
          </ul>
        </FramedPanel>

        {/* By the numbers — framed stat block */}
        <FramedPanel id="numbers" title="By The Numbers">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {NUMBERS.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 text-center sm:px-7 ${
                  i > 0 ? "lg:border-l lg:border-white/20" : ""
                } ${i % 2 === 1 ? "border-l border-white/20 lg:border-l" : ""}`}
              >
                <dd className="font-display text-4xl font-light leading-none sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-3 font-display text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </FramedPanel>

        {/* Fellowship details */}
        <section id="details" className="border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeading>Fellowship details</SectionHeading>
            <div
              className="mt-5 h-[3px] w-24"
              style={{ backgroundColor: ACCENT }}
            />

            <div className="mt-12 border-t border-white/20">
              {DETAILS.map((item) => (
                <details key={item.q} className="group border-b border-white/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-white transition-colors hover:text-white/70 sm:text-xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden="true" className="relative size-5 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-white" />
                      <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-white transition-transform group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-7 text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-10 inline-flex items-center gap-2 text-base text-white/80 transition-colors hover:text-white"
            >
              Get involved
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Cohort */}
        <section id="cohort" className="border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeading>The inaugural cohort</SectionHeading>
            <div
              className="mt-5 h-[3px] w-24"
              style={{ backgroundColor: ACCENT }}
            />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Seven artists. Announced soon.
            </p>
          </div>

          {/* Seven across on wide screens so the row completes. */}
          <ul className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4 lg:grid-cols-7">
            {Array.from({ length: COHORT_SIZE }, (_, i) => (
              <li
                key={i}
                className="border-b border-r border-white/15 p-5 last:border-r-0"
              >
                {/* Deliberate empty frame — a reserved slot, not a failed image. */}
                <div className="flex aspect-[4/5] items-center justify-center border border-white/15 bg-white/[0.06]">
                  <span className="font-display text-2xl font-light tracking-[0.1em] text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/45">To be announced</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Signup */}
        <section id="stay-updated" className="border-t border-white/15">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading>Stay updated</SectionHeading>
              <div
                className="mt-5 h-[3px] w-24"
                style={{ backgroundColor: ACCENT }}
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
                Be the first to hear about the cohort, the programming, and ways
                to get involved.
              </p>
            </div>
            <div className="lg:pt-3">
              <SignupForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-script text-2xl leading-none">
            <span aria-hidden="true">_</span>love made visible
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sans text-sm text-white/60 transition-colors hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}
