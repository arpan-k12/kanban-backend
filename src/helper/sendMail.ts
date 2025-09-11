// import {
//   SMTP_HOST,
//   SMTP_PASS,
//   SMTP_PORT,
//   SMTP_USER,
// } from "config/dotenv.config";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: Number(SMTP_PORT) || 587,
//   secure: false,
//   auth: {
//     user: SMTP_USER,
//     pass: SMTP_PASS,
//   },
// });

// export async function sendMail(
//   to: string,
//   subject: string,
//   text: string,
//   html?: string
// ) {
//   const info = await transporter.sendMail({
//     from: `"MyApp" <${SMTP_USER}>`,
//     to,
//     subject,
//     text,
//     html: html || `<p>${text}</p>`,
//   });

//   console.log("✅ Email sent: %s", info.messageId);
//   return info;
// }

import {
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "config/dotenv.config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send mail function
export async function sendMail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
}
