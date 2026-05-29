import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  movingDate?: string;
  fromZip?: string;
  toZip?: string;
  source?: string;
};

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'move@wemoveondemand.com';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'leads@wemoveondemand.com';
const FROM_NAME = 'We Move On Demand Website';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[quote] Missing RESEND_API_KEY env var');
    return res.status(500).json({ ok: false, error: 'Email service not configured' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as QuotePayload;
  if (!body) return res.status(400).json({ ok: false, error: 'Invalid JSON body' });

  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const email = (body.email || '').trim();
  const movingDate = (body.movingDate || '').trim();
  const fromZip = (body.fromZip || '').trim();
  const toZip = (body.toZip || '').trim();
  const source = (body.source || 'website').trim().slice(0, 50);

  if (!name || name.length < 2) return res.status(400).json({ ok: false, error: 'Name is required' });
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ ok: false, error: 'Valid phone is required' });
  if (email && !isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' });

  const receivedAt = new Date().toISOString();

  // Structured log = backup of every lead (visible in Vercel logs/Drain)
  console.log('[lead]', JSON.stringify({ receivedAt, source, name, phone, email, movingDate, fromZip, toZip }));

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#F3F3F1;">
      <div style="background:#fff;border-radius:16px;padding:28px;">
        <h2 style="color:#a02135;margin:0 0 16px;font-size:22px;">New Quote Request</h2>
        <p style="color:#666;margin:0 0 20px;font-size:13px;">Submitted from <b>${escapeHtml(source)}</b> at ${receivedAt}</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#0A0A0A;">
          <tr><td style="padding:8px 0;color:#888;width:130px;">Name</td><td><b>${escapeHtml(name)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td><a href="tel:${escapeHtml(phone)}" style="color:#a02135;text-decoration:none;"><b>${escapeHtml(phone)}</b></a></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td>${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#a02135;text-decoration:none;">${escapeHtml(email)}</a>` : '<span style="color:#bbb;">—</span>'}</td></tr>
          ${movingDate ? `<tr><td style="padding:8px 0;color:#888;">Moving Date</td><td>${escapeHtml(movingDate)}</td></tr>` : ''}
          ${fromZip ? `<tr><td style="padding:8px 0;color:#888;">From ZIP</td><td>${escapeHtml(fromZip)}</td></tr>` : ''}
          ${toZip ? `<tr><td style="padding:8px 0;color:#888;">To ZIP</td><td>${escapeHtml(toZip)}</td></tr>` : ''}
        </table>
      </div>
      <p style="color:#999;font-size:12px;text-align:center;margin-top:16px;">wemoveondemand.com</p>
    </div>
  `;

  const text =
    `New Quote Request\n` +
    `Source: ${source}\nReceived: ${receivedAt}\n\n` +
    `Name:  ${name}\nPhone: ${phone}\nEmail: ${email || '—'}\n` +
    (movingDate ? `Moving Date: ${movingDate}\n` : '') +
    (fromZip ? `From ZIP: ${fromZip}\n` : '') +
    (toZip ? `To ZIP: ${toZip}\n` : '');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email || undefined,
      subject: `New Lead — ${name} (${phone})`,
      html,
      text,
    });

    if (error) {
      console.error('[quote] Resend error', error);
      return res.status(502).json({ ok: false, error: 'Failed to send email' });
    }

    // TODO: forward to upixel.app CRM webhook when credentials provided.

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[quote] Unexpected error', err);
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }
}

function safeParse(s: string): QuotePayload | null {
  try { return JSON.parse(s); } catch { return null; }
}
