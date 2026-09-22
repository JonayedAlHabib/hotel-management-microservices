import nodemailer from "nodemailer";

// Built lazily, not at module load, for the same reason tokenService.js reads env
// vars inside its functions: this file is imported before dotenv.config() runs.
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

// If SMTP isn't configured (local dev without real credentials), log the link
// instead of failing the request — forgot-password should still be testable.
async function sendPasswordResetEmail(email, resetUrl) {
  if (!process.env.SMTP_HOST) {
    console.log(`[dev] Password reset link for ${email}: ${resetUrl}`);
    return;
  }

  await getTransporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Reset your password",
    text: `Reset your password using this link (valid for 30 minutes): ${resetUrl}`,
    html: `<p>Reset your password using the link below (valid for 30 minutes):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });
}

export { sendPasswordResetEmail };
