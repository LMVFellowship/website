import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo";
import SignupForm from "../signup-form";

export const metadata: Metadata = {
  title: "Love Made Visible — LMV Fellowship",
  description:
    "A year-long fellowship built for artists, by artists, designed to help emerging visual artists advance their careers.",
  openGraph: {
    title: "Love Made Visible — LMV Fellowship",
    description:
      "A year-long fellowship built for artists, by artists, designed to help emerging visual artists advance their careers.",
    type: "website",
  },
};

const CONTACT_EMAIL = "contact@lmvfellowship.com";

/**
 * All prose on this page is taken verbatim from the fellowship's talking
 * points, with one exception: the cohort size is seven, not the ten the
 * document states. Nothing here is written from scratch — if a section
 * needs new wording, it has to come from the document.
 */

const SECTION_NAV = [
  { href: "#about", label: "About" },
  { href: "#fellows-get", label: "What Fellows Get" },
  { href: "#numbers", label: "By The Numbers" },
  { href: "#team", label: "Meet The Team" },
  { href: "#cohort", label: "The Cohort" },
  { href: "#stay-updated", label: "Stay Updated" },
];

/** Verbatim: "Depending on where an artist begins, that could mean:" */
const OUTCOMES = [
  "A professional website or stronger portfolio",
  "A refined artist profile and clear pricing structure",
  "A group exhibition or pathway toward a solo show",
  "A new collector or institutional relationship",
  "A commission or acquisition",
  "Greater readiness for public art, residencies, and other opportunities",
  "A clear 1–3 year career strategy",
];

const NUMBERS = [
  { value: "7", label: "Artists" },
  { value: "1", label: "Year" },
  { value: "Miami", label: "Based in" },
];

const FOUNDER = { name: "Zakiyya White", role: "Founder" };

const ADVISORY_BOARD_SIZE = 6;

const COHORT_SIZE = 7;

/** Verbatim from the talking points. */
const DETAILS = [
  {
    q: "Why does LMV exist?",
    a: [
      "An artist can create incredible work and still be several relationships away from the curator who might exhibit it, the collector who might acquire it, the organization looking to commission an artist, or simply someone who can explain how these opportunities actually happen.",
      "LMV is designed to shorten that distance.",
      "We’re building the bridge between making strong work and having the relationships, knowledge, visibility, and professional infrastructure needed to move a career forward.",
    ],
  },
  {
    q: "Why Miami Art Week?",
    a: [
      "Miami is an international arts destination. We’re turning Miami Art Week into a live classroom.",
      "Every December, an extraordinary concentration of galleries, collectors, museums, artists, brands, and art-world capital comes to Miami. We want our fellows to do more than attend. We want them to understand how the rooms work.",
      "They’ll learn about collecting, gallery relationships, commissions, pricing, intellectual property, institutional pathways, and the economics behind the art world while experiencing those systems in real time.",
      "And Art Week isn’t the end of LMV. The rest of the fellowship gives artists time and support to build on what they learned, follow up with the people they met, and pursue the opportunities that surfaced during December.",
    ],
  },
  {
    q: "How can someone get involved?",
    a: [
      "We’re building a circle around the artists, not simply a list of sponsors. Funding matters, but money isn’t the only valuable resource in this ecosystem.",
      "There are many ways to contribute: Teach something. Make an introduction. Mentor an artist. Open a space. Host an experience. Commission work. Acquire work. Create an exhibition opportunity. Provide a professional service. Fund part of the fellowship. Bring another person into the circle.",
      "A collector, artist, curator, museum professional, gallerist, foundation officer, attorney, hospitality partner, business owner, or simply someone who loves art can all contribute differently.",
      "The question we want people asking themselves is: “What do I have access to that could create motion for an artist?”",
    ],
  },
];

/** Brand slate-blue, used the way the reference uses its accent rule. */
const ACCENT = "#6f7c99";

function AccentRule() {
  return (
    <div className="mt-5 h-[3px] w-24" style={{ backgroundColor: ACCENT }} />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-light uppercase leading-snug tracking-[0.2em] sm:text-3xl">
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
    <section id={id} className="scroll-mt-24 px-6 py-10 sm:py-14">
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

/** A reserved portrait frame — a slot awaiting a photograph, not a failure. */
function PersonSlot({
  label,
  name,
  caption,
}: {
  label: string;
  name?: string;
  caption: string;
}) {
  return (
    <div>
      <div className="flex aspect-[4/5] items-center justify-center border border-white/15 bg-white/[0.06]">
        <span className="font-display text-xs uppercase tracking-[0.2em] text-white/25">
          {label}
        </span>
      </div>
      {name ? <p className="mt-4 text-base text-white">{name}</p> : null}
      <p className={`text-sm text-white/45 ${name ? "mt-1" : "mt-4"}`}>
        {caption}
      </p>
    </div>
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

        {/* Sticky anchor bar. Opaque, because content scrolls beneath it. */}
        <nav className="sticky top-0 z-50 border-y border-white/15 bg-background">
          {/* One scrollable row on phones. Wrapping six items there cost
              three lines — 14% of the viewport, permanently, since the bar
              is sticky. */}
          <ul className="mx-auto flex max-w-6xl items-center gap-x-6 overflow-x-auto px-6 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {SECTION_NAV.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* About */}
        <section id="about" className="scroll-mt-24 px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
            <div>
              <SectionHeading>About</SectionHeading>
              <AccentRule />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
              <p>
                Love Made Visible is a year-long fellowship built for artists,
                by artists, designed to help emerging visual artists advance
                their careers.
              </p>
              <p>
                We’re starting with a curated cohort of 7 artists and
                surrounding them with education on the business-of-art,
                relationships, cultural experiences, and real opportunities.
              </p>
              <p>
                That means helping artists strengthen the infrastructure around
                their talent while creating pathways toward exhibitions,
                commissions, acquisitions, collector relationships,
                institutional opportunities, and other meaningful additions to
                their CV.
              </p>
              <p
                className="border-l pl-6 font-script text-3xl leading-tight text-white sm:text-4xl"
                style={{ borderColor: ACCENT }}
              >
                The talent is already there. We’re here to give it motion.
              </p>
            </div>
          </div>
        </section>

        {/* What fellows get */}
        <FramedPanel id="fellows-get" title="What Fellows Get">
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-white/70 sm:text-lg">
            We measure success by what changes for an artist over the course of
            the fellowship. We want artists to leave with tangible progress.
            Depending on where an artist begins, that could mean:
          </p>
          <ul className="mx-auto mt-10 max-w-3xl border-t border-white/15">
            {OUTCOMES.map((outcome) => (
              <li
                key={outcome}
                className="border-b border-white/15 py-4 text-base text-white/85 sm:text-lg"
              >
                {outcome}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-white/60">
            Not every fellow will need the same support or achieve the same
            milestones. That’s why we’re intentionally starting with only 7
            artists. We want to understand what each artist needs and help them
            take meaningful next steps.
          </p>
        </FramedPanel>

        {/* By the numbers */}
        <FramedPanel id="numbers" title="By The Numbers">
          <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-3">
            {NUMBERS.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 text-center sm:px-7 ${
                  i > 0 ? "sm:border-l sm:border-white/20" : ""
                }`}
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

        {/* Meet the team */}
        <section id="team" className="scroll-mt-24 border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeading>Meet the team</SectionHeading>
            <AccentRule />

            <div className="mt-12 w-full max-w-[240px]">
              <PersonSlot
                label="Portrait"
                name={FOUNDER.name}
                caption={FOUNDER.role}
              />
            </div>

            <h3 className="mt-16 font-display text-xs uppercase tracking-[0.25em] text-white/55">
              Advisory board
            </h3>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: ADVISORY_BOARD_SIZE }, (_, i) => (
                <li key={i}>
                  <PersonSlot
                    label={String(i + 1).padStart(2, "0")}
                    caption="To be announced"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cohort */}
        <section id="cohort" className="scroll-mt-24 border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeading>The inaugural cohort</SectionHeading>
            <AccentRule />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              7 artists. Announced soon.
            </p>
          </div>

          {/* Seven across on wide screens so the row completes. */}
          <ul className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4 lg:grid-cols-7">
            {Array.from({ length: COHORT_SIZE }, (_, i) => (
              <li
                key={i}
                className="border-b border-r border-white/15 p-5 last:border-r-0"
              >
                <PersonSlot
                  label={String(i + 1).padStart(2, "0")}
                  caption="To be announced"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Fellowship details */}
        <section id="details" className="scroll-mt-24 border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeading>Fellowship details</SectionHeading>
            <AccentRule />

            <div className="mt-12 border-t border-white/20">
              {DETAILS.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-white/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-white transition-colors hover:text-white/70 sm:text-xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="relative size-5 shrink-0"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-white" />
                      <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-white transition-transform group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="max-w-3xl space-y-4 pb-7 text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed">
                    {item.a.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
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

        {/* Signup */}
        <section
          id="stay-updated"
          className="scroll-mt-24 border-t border-white/15"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading>Stay updated</SectionHeading>
              <AccentRule />
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
