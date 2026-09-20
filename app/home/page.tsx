import type { Metadata } from "next";
import Logo from "../logo";
import SignupForm from "../signup-form";

export const metadata: Metadata = {
  title: "Love Made Visible — LMV Creative Fellowship",
  description:
    "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists advance their careers through education, relationships, and real opportunities.",
  openGraph: {
    title: "Love Made Visible — LMV Creative Fellowship",
    description:
      "A year-long fellowship built for artists, by artists. Love Made Visible helps emerging visual artists advance their careers through education, relationships, and real opportunities.",
    type: "website",
  },
};

const FACTS = ["10 artists", "One year", "Miami"];

const OUTCOMES = [
  "A professional website or stronger portfolio",
  "A refined artist profile and clear pricing structure",
  "A group exhibition or pathway toward a solo show",
  "A new collector or institutional relationship",
  "A commission or acquisition",
  "Greater readiness for public art, residencies, and other opportunities",
  "A clear 1–3 year career strategy",
];

const CONTRIBUTIONS = [
  "Teach something",
  "Make an introduction",
  "Mentor an artist",
  "Open a space",
  "Host an experience",
  "Commission work",
  "Acquire work",
  "Create an exhibition opportunity",
  "Provide a professional service",
  "Fund part of the fellowship",
  "Bring another person into the circle",
];

const CONTACT_EMAIL = "contact@lmvfellowship.com";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[11px] font-light uppercase tracking-[0.3em] text-white/45 sm:text-xs">
      {children}
    </p>
  );
}

/**
 * Numbered editorial section: the number and title sit in a narrow left rail
 * on wide screens and stack above the prose on narrow ones.
 */
function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/15">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:py-28 lg:grid-cols-[170px_1fr] lg:gap-16">
        <div className="lg:pt-1">
          <Eyebrow>{index}</Eyebrow>
          <h2 className="mt-4 font-display text-xl font-light uppercase leading-snug tracking-[0.14em] sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-white/75 sm:text-lg sm:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l border-white/25 pl-6 font-script text-3xl leading-tight text-white sm:text-4xl">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="px-6 pb-20 pt-20 sm:pb-24 sm:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Eyebrow>A year-long fellowship built for artists, by artists</Eyebrow>

          <div className="mt-10 flex w-full justify-center sm:mt-12">
            <Logo />
          </div>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-12 sm:text-lg sm:leading-relaxed">
            Love Made Visible is designed to help emerging visual artists
            advance their careers — surrounding a curated cohort with education
            on the business of art, relationships, cultural experiences, and
            real opportunities.
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-display text-[11px] uppercase tracking-[0.25em] text-white/55 sm:gap-x-6 sm:text-xs">
            {FACTS.map((fact, i) => (
              <li key={fact} className="flex items-center gap-4 sm:gap-6">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-white/25">
                    /
                  </span>
                ) : null}
                {fact}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex h-12 items-center justify-center border border-[#6f7c99] bg-[#2f3f61] px-8 font-sans text-base text-white transition-colors hover:bg-[#3a4d75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Get involved
            </a>
            <a
              href="#stay-updated"
              className="flex h-12 items-center justify-center border border-white/50 px-8 font-sans text-base text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Stay updated
            </a>
          </div>
        </div>
      </section>

      <Section index="01" title="What is Love Made Visible?">
        <p>
          Love Made Visible is a year-long fellowship built for artists, by
          artists, designed to help emerging visual artists advance their
          careers.
        </p>
        <p>
          We’re starting with a curated cohort of 10 artists and surrounding
          them with education on the business-of-art, relationships, cultural
          experiences, and real opportunities.
        </p>
        <p>
          That means helping artists strengthen the infrastructure around their
          talent while creating pathways toward exhibitions, commissions,
          acquisitions, collector relationships, institutional opportunities,
          and other meaningful additions to their CV.
        </p>
        <PullQuote>
          The talent is already there. We’re here to give it motion.
        </PullQuote>
      </Section>

      <Section index="02" title="Why LMV exists">
        <PullQuote>
          There isn’t a shortage of talent in Miami. There’s a shortage of
          access.
        </PullQuote>
        <p>
          An artist can create incredible work and still be several
          relationships away from the curator who might exhibit it, the
          collector who might acquire it, the organization looking to commission
          an artist, or simply someone who can explain how these opportunities
          actually happen.
        </p>
        <p>LMV is designed to shorten that distance.</p>
        <p>
          We’re building the bridge between making strong work and having the
          relationships, knowledge, visibility, and professional infrastructure
          needed to move a career forward.
        </p>
      </Section>

      <Section index="03" title="What actually happens for an artist">
        <p>
          We measure success by what changes for an artist over the course of
          the fellowship. We want artists to leave with tangible progress.
          Depending on where an artist begins, that could mean:
        </p>

        <ul className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
          {OUTCOMES.map((outcome, i) => (
            <li
              key={outcome}
              className={`bg-background px-5 py-5 text-base leading-snug text-white/85 ${
                // An odd number of outcomes would otherwise leave the last
                // grid cell empty, showing through as a stray filled box.
                i === OUTCOMES.length - 1 && OUTCOMES.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              {outcome}
            </li>
          ))}
        </ul>

        <p>
          Not every fellow will need the same support or achieve the same
          milestones. That’s why we’re intentionally starting with only 10
          artists — we want to understand what each artist needs and help them
          take meaningful next steps.
        </p>
      </Section>

      <Section index="04" title="Why Miami Art Week">
        <p>
          Miami is an international arts destination. We’re turning Miami Art
          Week into a live classroom.
        </p>
        <p>
          Every December, an extraordinary concentration of galleries,
          collectors, museums, artists, brands, and art-world capital comes to
          Miami. We want our fellows to do more than attend. We want them to
          understand how the rooms work.
        </p>
        <p>
          They’ll learn about collecting, gallery relationships, commissions,
          pricing, intellectual property, institutional pathways, and the
          economics behind the art world — while experiencing those systems in
          real time.
        </p>
        <p>
          And Art Week isn’t the end of LMV. The rest of the fellowship gives
          artists time and support to build on what they learned, follow up with
          the people they met, and pursue the opportunities that surfaced during
          December.
        </p>
      </Section>

      <Section index="05" title="How to get involved">
        <p>
          We’re building a circle around the artists, not simply a list of
          sponsors. Funding matters, but money isn’t the only valuable resource
          in this ecosystem.
        </p>
        <p className="text-white/55">There are many ways to contribute:</p>

        <ul className="flex flex-wrap gap-2">
          {CONTRIBUTIONS.map((item) => (
            <li
              key={item}
              className="border border-white/25 px-4 py-2 text-sm text-white/85"
            >
              {item}
            </li>
          ))}
        </ul>

        <p>
          A collector, artist, curator, museum professional, gallerist,
          foundation officer, attorney, hospitality partner, business owner, or
          simply someone who loves art can all contribute differently.
        </p>

        <p className="text-white/55">
          The question we want people asking themselves is:
        </p>
        <PullQuote>
          What do I have access to that could create motion for an artist?
        </PullQuote>

        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block border-b border-white/40 pb-1 text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>

      {/* Signup */}
      <section id="stay-updated" className="border-t border-white/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <h2 className="font-display text-xl font-light uppercase leading-snug tracking-[0.14em] sm:text-2xl">
            Stay updated
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Be the first to hear about the cohort, the programming, and ways to
            get involved.
          </p>
          {/* text-left: the surrounding section is centered, but the form's
              labels and errors should read as a normal left-aligned form. */}
          <div className="mt-12 flex w-full justify-center text-left">
            <SignupForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
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
    </main>
  );
}
