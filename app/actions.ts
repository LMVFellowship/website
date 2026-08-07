"use server";

import type { SignupState } from "./signup-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

/**
 * Hands the signup off to whatever list the fellowship is using. Configure
 * LMV_SIGNUP_WEBHOOK_URL to point at the mailing list provider's inbound hook;
 * until then signups are only recorded in the server logs.
 */
async function deliverSignup(signup: { name: string; email: string }) {
  const webhookUrl = process.env.LMV_SIGNUP_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      `LMV_SIGNUP_WEBHOOK_URL is not set — signup for ${signup.email} was not delivered anywhere.`,
    );
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...signup,
      source: "lmv-coming-soon",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Signup webhook responded with ${response.status}`);
  }
}

export async function subscribe(
  _previousState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const consent = formData.get("consent") === "on";
  const values = { name, email, consent };

  const errors: SignupState["errors"] = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Please keep your name under ${MAX_NAME_LENGTH} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!consent) {
    errors.consent = "Please confirm you'd like to receive the newsletter.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "", errors, values };
  }

  try {
    await deliverSignup({ name, email });
  } catch (error) {
    console.error("Failed to deliver signup", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "You're on the list — we'll be in touch soon.",
    errors: {},
    values: { name: "", email: "", consent: false },
  };
}
