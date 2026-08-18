import { Resend } from "resend";
import { siteConfig } from "@/lib/config/site";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function brandedEmail({
  title,
  intro,
  rows,
}: {
  title: string;
  intro: string;
  rows: Array<{ label: string; value: string }>;
}) {
  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#6B6B6B;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:160px;vertical-align:top;">${row.label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:15px;">${row.value}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;background:#050505;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#0D0D0D;border:1px solid #2A2A2A;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #2A2A2A;">
                <div style="color:#C8FF00;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;">REFORGE</div>
                <h1 style="margin:12px 0 0;color:#FFFFFF;font-size:28px;letter-spacing:0.04em;text-transform:uppercase;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <p style="margin:0 0 20px;color:#A3A3A3;font-size:15px;line-height:1.6;">${intro}</p>
                <table width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;border-top:1px solid #2A2A2A;color:#6B6B6B;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">
                Built for those who show up.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendNotificationEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const resend = getResend();
  const to = siteConfig.email.contactTo;
  const from = siteConfig.email.from;
  if (!resend || !to || !from) {
    return { sent: false as const, reason: "Email is not configured." };
  }
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
  if (error) {
    return { sent: false as const, reason: error.message };
  }
  return { sent: true as const };
}
