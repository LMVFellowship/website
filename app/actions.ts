"use server";

import { sendSignupNotification, sendWelcomeEmail } from "./emails";
import type { SignupState } from "./signup-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

type Signup = { name: string; email: string };

/**
 * Posts the signup to whatever list the fellowship is using. Configure
 * LMV_SIGNUP_WEBHOOK_URL to point at the mailing list provider's inbound hook.
 */
async function postToWebhook(signup: Signup) {
  const webhookUrl = process.env.LMV_SIGNUP_WEBHOOK_URL;

  if (!webhookUrl) return false;

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

  return true;
}

/**
 * Records the signup and thanks the person who made it.
 *
 * The webhook and the notification to the fellowship's inbox are the two
 * channels that actually record a signup, so the visitor is only shown an
 * error when every configured one of them failed — losing the address is the
 * thing worth retrying for. The thank-you note is a courtesy on top: if it
 * bounces, the signup still stands and we only log it.
 */
async function deliverSignup(signup: Signup) {
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.LMV_FROM_EMAIL,
  );

  if (!process.env.LMV_SIGNUP_WEBHOOK_URL && !emailConfigured) {
    console.warn(
      `No signup delivery is configured — the signup for ${signup.email} was not recorded anywhere. ` +
        "Set LMV_SIGNUP_WEBHOOK_URL, or RESEND_API_KEY and LMV_FROM_EMAIL.",
    );
    return;
  }

  const [webhook, notification, welcome] = await Promise.allSettled([
    postToWebhook(signup),
    emailConfigured ? sendSignupNotification(signup) : null,
    emailConfigured ? sendWelcomeEmail(signup) : null,
  ]);

  if (webhook.status === "rejected") {
    console.error("Failed to post signup to the webhook", webhook.reason);
  }
  if (notification.status === "rejected") {
    console.error("Failed to send the signup notification", notification.reason);
  }
  if (welcome.status === "rejected") {
    console.error(
      `Failed to send the thank-you email to ${signup.email}`,
      welcome.reason,
    );
  }

  const recorded =
    webhook.status === "fulfilled" && webhook.value === true
      ? true
      : notification.status === "fulfilled" && emailConfigured;

  if (!recorded) {
    throw new Error(`Every delivery channel failed for ${signup.email}`);
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
    message:
      "You're on the list — check your inbox for a note from us. We'll be in touch soon.",
    errors: {},
    values: { name: "", email: "", consent: false },
  };
}
