import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'contact@waelkabli.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Change to noreply@waelkabli.com after verifying domain in Resend

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, subject, message, locale } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isAr = locale === 'ar';

    const html = `
<!DOCTYPE html>
<html dir="${isAr ? 'rtl' : 'ltr'}" lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7ff; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(45,24,92,0.08); }
    .header { background: linear-gradient(135deg, #2d185c 0%, #412384 100%); padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px; }
    .accent { display: inline-block; width: 40px; height: 4px; background: #ff325d; border-radius: 2px; margin-bottom: 12px; }
    .body { padding: 32px 40px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #412384; margin-bottom: 6px; }
    .value { font-size: 15px; color: #2d185c; background: #f8f7ff; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #ff325d; line-height: 1.6; white-space: pre-wrap; }
    .reply-btn { display: inline-block; margin-top: 28px; padding: 12px 28px; background: #ff325d; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 14px; }
    .footer { background: #f8f7ff; padding: 20px 40px; text-align: center; font-size: 12px; color: #2d185c80; border-top: 1px solid #e8e4f5; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="accent"></div>
      <h1>${isAr ? '📬 رسالة جديدة من موقعك' : '📬 New message from your website'}</h1>
      <p>waelkabli.com — ${isAr ? 'نموذج التواصل' : 'Contact Form'}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">${isAr ? 'الاسم' : 'Name'}</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">${isAr ? 'البريد الإلكتروني' : 'Email'}</div>
        <div class="value"><a href="mailto:${email}" style="color:#412384;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">${isAr ? 'الموضوع' : 'Subject'}</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">${isAr ? 'الرسالة' : 'Message'}</div>
        <div class="value">${message}</div>
      </div>
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">
        ${isAr ? 'رد مباشرة' : 'Reply Directly'}
      </a>
    </div>
    <div class="footer">
      ${isAr
        ? `أُرسلت هذه الرسالة من نموذج التواصل على موقع waelkabli.com`
        : `Sent via the contact form on waelkabli.com`}
    </div>
  </div>
</body>
</html>
    `.trim();

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[waelkabli.com] ${subject}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
