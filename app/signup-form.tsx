"use client";

import { useActionState, useId } from "react";
import { subscribe } from "./actions";
import { initialSignupState } from "./signup-state";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(
    subscribe,
    initialSignupState,
  );
  const nameId = useId();
  const emailId = useId();
  const consentId = useId();

  if (state.status === "success") {
    return (
      <p
        aria-live="polite"
        className="w-full max-w-[460px] border border-white/40 px-6 py-8 text-center text-base leading-relaxed"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="w-full max-w-[460px] font-sans text-base"
    >
      <div>
        <label htmlFor={nameId} className="block">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          defaultValue={state.values.name}
          aria-describedby={state.errors.name ? `${nameId}-error` : undefined}
          aria-invalid={state.errors.name ? true : undefined}
          className="mt-2 h-11 w-full border border-white bg-transparent px-3 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        />
        <FieldError id={`${nameId}-error`} message={state.errors.name} />
      </div>

      <div className="mt-6">
        <label htmlFor={emailId} className="block">
          Enter your email here <span aria-hidden="true">*</span>
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          defaultValue={state.values.email}
          aria-describedby={state.errors.email ? `${emailId}-error` : undefined}
          aria-invalid={state.errors.email ? true : undefined}
          className="mt-2 h-11 w-full border border-white bg-transparent px-3 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        />
        <FieldError id={`${emailId}-error`} message={state.errors.email} />
      </div>

      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="sm:max-w-[240px]">
          <div className="flex items-start gap-3">
            <span className="relative mt-0.5 inline-flex shrink-0">
              <input
                id={consentId}
                name="consent"
                type="checkbox"
                required
                defaultChecked={state.values.consent}
                aria-describedby={
                  state.errors.consent ? `${consentId}-error` : undefined
                }
                aria-invalid={state.errors.consent ? true : undefined}
                className="peer size-[22px] appearance-none border border-white bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute inset-0 m-auto hidden size-3.5 text-white peer-checked:block"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <label htmlFor={consentId} className="leading-snug">
              Yes, subscribe me to your newsletter.{" "}
              <span aria-hidden="true">*</span>
            </label>
          </div>
          <FieldError
            id={`${consentId}-error`}
            message={state.errors.consent}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-12 shrink-0 border border-[#6f7c99] bg-[#2f3f61] px-8 text-white transition-colors hover:bg-[#3a4d75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Notify Me!"}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {state.message}
      </p>
      {state.status === "error" && state.message ? (
        <p className="mt-5 text-sm text-red-300">{state.message}</p>
      ) : null}
    </form>
  );
}
