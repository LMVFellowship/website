/**
 * Transactional email for signups, sent through Resend's REST API.
 *
 * Two messages go out per signup:
 *   1. a notification to the fellowship so a human knows someone signed up
 *   2. a thank-you to the person who just subscribed
 *
 * Everything is configured through environment variables — see the README.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const NOTIFICATION_RECIPIENT =
  process.env.LMV_NOTIFICATION_EMAIL ?? "contact@lmvfellowship.com";

type Signup = { name: string; email: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(message: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LMV_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY and LMV_FROM_EMAIL must both be set to send signup email.",
    );
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
      ...(message.replyTo ? { reply_to: [message.replyTo] } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend responded with ${response.status}${detail ? `: ${detail}` : ""}`,
    );
  }
}

/** Tells the fellowship that someone new signed up. */
export async function sendSignupNotification(signup: Signup) {
  const name = escapeHtml(signup.name);
  const email = escapeHtml(signup.email);
  const submittedAt = new Date().toUTCString();

  await sendEmail({
    to: NOTIFICATION_RECIPIENT,
    subject: `New signup: ${signup.name}`,
    replyTo: signup.email,
    text: [
      "Someone just signed up on the LMV Creative Fellowship site.",
      "",
      `Name:  ${signup.name}`,
      `Email: ${signup.email}`,
      `When:  ${submittedAt}`,
      "",
      "They asked to receive the newsletter.",
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#111;">
        <p>Someone just signed up on the LMV Creative Fellowship site.</p>
        <table cellpadding="0" cellspacing="0" style="margin:16px 0;">
          <tr><td style="padding:2px 16px 2px 0;color:#666;">Name</td><td>${name}</td></tr>
          <tr><td style="padding:2px 16px 2px 0;color:#666;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:2px 16px 2px 0;color:#666;">When</td><td>${submittedAt}</td></tr>
        </table>
        <p style="color:#666;">They asked to receive the newsletter. Reply to this email to reach them directly.</p>
      </div>
    `,
  });
}

/** Thanks the subscriber for signing up. */
export async function sendWelcomeEmail(signup: Signup) {
  const name = escapeHtml(signup.name);
  const firstName = signup.name.split(" ")[0] || signup.name;

  await sendEmail({
    to: signup.email,
    subject: "Thank you for staying updated",
    replyTo: NOTIFICATION_RECIPIENT,
    text: [
      `Hi ${firstName},`,
      "",
      "Thank you for staying updated with the LMV Creative Fellowship.",
      "",
      "You're on the list. We'll be in touch as soon as we have news to share —",
      "no noise in between, just the moments worth knowing about.",
      "",
      "_love made visible",
      "LMV Creative Fellowship",
    ].join("\n"),
    html: `
      <div style="background:#000;padding:40px 24px;">
        <div style="max-width:520px;margin:0 auto;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:1.7;color:#fff;">
          <p style="margin:0 0 28px;font-family:'Sacramento','Brush Script MT',cursive;font-size:40px;line-height:1;color:#fff;">
            _love made visible
          </p>
          <p style="margin:0 0 20px;">Hi ${name},</p>
          <p style="margin:0 0 20px;">
            Thank you for staying updated with the LMV Creative Fellowship.
          </p>
          <p style="margin:0 0 32px;">
            You're on the list. We'll be in touch as soon as we have news to
            share — no noise in between, just the moments worth knowing about.
          </p>
          <p style="margin:0;color:rgba(255,255,255,0.6);font-size:14px;">
            LMV Creative Fellowship
          </p>
        </div>
      </div>
    `,
  });
}
