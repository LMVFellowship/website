import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "../signup-form";

export const metadata: Metadata = {
  title: "Love Made Visible — LMV Creative Fellowship",
  description:
    "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists in Miami advance their careers.",
  openGraph: {
    title: "Love Made Visible — LMV Creative Fellowship",
    description:
      "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists in Miami advance their careers.",
    type: "website",
  },
};

const CONTACT_EMAIL = "contact@lmvfellowship.com";

const FACTS = [
  { value: "10", label: "Artists" },
  { value: "1", label: "Year" },
  { value: "Miami", label: "Based in" },
];

/** Short answers only — the page should skim, not read. */
const DETAILS = [
  {
    q: "What is Love Made Visible?",
    a: "A year-long fellowship for a curated cohort of ten emerging visual artists, combining education on the business of art with relationships, cultural experiences, and real opportunities.",
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

const COHORT_SIZE = 10;

function Pill({
  href,
  children,
  solid = false,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full px-7 font-sans text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
        solid
          ? "bg-white text-black hover:bg-white/85"
          : "border border-white/50 text-white hover:border-white"
      }`}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Nav */}
      <header className="border-b border-white/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="font-script text-2xl leading-none">
            <span aria-hidden="true">_</span>love made visible
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="#details"
              className="hidden font-display text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white sm:block"
            >
              Fellowship
            </a>
            <a
              href="#cohort"
              className="hidden font-display text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white sm:block"
            >
              Cohort
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex h-10 items-center rounded-full bg-white px-5 font-display text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/85"
            >
              Get involved
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <h1 className="font-condensed text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.88] tracking-[-0.02em]">
            Love Made
            <br />
            Visible
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
              A year-long fellowship built for artists, by artists — helping a
              curated cohort of emerging visual artists in Miami turn talent
              into motion.
            </p>

            <div className="flex flex-wrap gap-3">
              <Pill href="#details" solid>
                The fellowship
              </Pill>
              <Pill href="#stay-updated">Stay updated</Pill>
            </div>
          </div>

          {/* Facts */}
          <dl className="mt-16 grid grid-cols-3 border-t border-white/15 sm:mt-20">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-r border-white/15 py-7 pr-4 last:border-r-0"
              >
                <dt className="font-display text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-condensed text-4xl leading-none tracking-tight sm:text-5xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Details accordion */}
        <section id="details" className="border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <h2 className="font-condensed text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.01em]">
              Fellowship details
            </h2>

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
            <h2 className="font-condensed text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.01em]">
              The inaugural cohort
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Ten artists. Announced soon.
            </p>
          </div>

          <ul className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: COHORT_SIZE }, (_, i) => (
              <li
                key={i}
                className="border-b border-r border-white/15 p-5 last:border-r-0"
              >
                {/* Deliberate empty frame — reads as a reserved slot rather
                    than a failed image until the cohort is announced. */}
                <div className="flex aspect-[4/5] items-center justify-center border border-white/15 bg-white/[0.06]">
                  <span className="font-condensed text-3xl text-white/25">
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
              <h2 className="font-condensed text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.01em]">
                Sign up
                <br />
                for updates
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
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
