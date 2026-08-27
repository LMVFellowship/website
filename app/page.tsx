import SignupForm from "./signup-form";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 pb-24 pt-20 sm:pt-24">
      <h1 className="text-center font-display text-lg font-light uppercase leading-relaxed tracking-[0.2em] sm:text-xl">
        Welcome to LMV Creative Fellowship - Coming Soon!
      </h1>

      <p className="mt-16 text-center font-script text-6xl font-normal leading-none [word-spacing:0.35em] sm:mt-20 sm:text-7xl">
        <span aria-hidden="true">_</span>love made visible
      </p>

      <div className="mt-20 flex w-full justify-center sm:mt-24">
        <SignupForm />
      </div>
    </main>
  );
}
