import Logo from "./logo";
import SignupForm from "./signup-form";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 pb-24 pt-20 sm:pt-24">
      <h1 className="text-center font-display text-lg font-light uppercase leading-relaxed tracking-[0.2em] sm:text-xl">
        Welcome to LMV Creative Fellowship - Coming Soon!
      </h1>

      <div className="mt-16 flex w-full justify-center sm:mt-20">
        <Logo />
      </div>

      <div className="mt-20 flex w-full justify-center sm:mt-24">
        <SignupForm />
      </div>
    </main>
  );
}
