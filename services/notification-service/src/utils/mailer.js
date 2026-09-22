import nodemailer from "nodemailer";

let transporter = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

// Called after the in-app Notification row already exists — a failure here
// is logged and swallowed, never thrown, so SMTP being down/misconfigured
// never undoes the in-app notification the guest already has (PRD requirement).
async function sendNotificationEmail(email, { title, message }) {
  if (!email) return;

  if (!process.env.SMTP_HOST) {
    console.log(`[dev] Email to ${email}: ${title} — ${message}`);
    return;
  }

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: title,
      text: message,
      html: `<p>${message}</p>`,
    });
  } catch (err) {
    console.error(`[mailer] failed to send "${title}" to ${email}:`, err.message);
  }
}

export { sendNotificationEmail };
