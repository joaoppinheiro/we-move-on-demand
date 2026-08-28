import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/**
 * Reusable-box availability request notifications.
 *
 * SCOPE: this endpoint exists ONLY for the reusable-box path. Reusable boxes
 * have no online price and depend on current inventory, so those carts are
 * confirmed manually by the team.
 *
 * Ordinary carts (bundles + individual items) must NOT be routed here — they
 * go through automated Stripe checkout (see api/_checkout-stub.ts). Requests
 * without at least one reusable line are rejected below to keep that boundary
 * enforced server-side, not just by convention in the UI.
 *
 * Reuses the same lead notification pattern as api/quote.ts (Resend → Eduardo,
 * cc Laila) with the payload adapted to carry the cart contents.
 *
 * TODO: endpoint de envio do formulário — se/quando os leads forem consolidados
 * em um único handler, mover esta lógica para api/quote.ts atrás de um campo
 * `type` no payload, em vez de manter dois arquivos com o mesmo boilerplate.
 */

type CartLinePayload = {
  name?: string;
  qty?: number;
  kind?: string;
  price?: number | null;
};

type AvailabilityPayload = {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  source?: string;
  lines?: CartLinePayload[];
};

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'move@wemoveondemand.com';
const CC_EMAIL = process.env.LEAD_CC_EMAIL || 'laila@wemoveondemand.com';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'move@wemoveondemand.com';
const FROM_NAME = 'We Move On Demand';
const SITE_URL = 'https://wemoveondemand.com';

const MAX_LINES = 60;

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

type NormalizedLine = {
  name: string;
  qty: number;
  kind: string;
  price: number | null;
  lineTotal: number | null;
};

function normalizeLines(raw: CartLinePayload[]): NormalizedLine[] {
  return raw.slice(0, MAX_LINES).flatMap((line) => {
    const name = String(line?.name ?? '').trim().slice(0, 120);
    if (!name) return [];
    const qty = Number.isFinite(Number(line?.qty))
      ? Math.min(Math.max(Math.trunc(Number(line.qty)), 1), 999)
      : 1;
    const price =
      line?.price === null || line?.price === undefined || !Number.isFinite(Number(line.price))
        ? null
        : Number(line.price);
    return [
      {
        name,
        qty,
        kind: String(line?.kind ?? 'item').slice(0, 20),
        price,
        lineTotal: price === null ? null : Math.round(price * qty * 100) / 100,
      },
    ];
  });
}

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

type EmailPayload = {
  name: string;
  phone: string;
  email: string;
  notes: string;
  source: string;
  receivedAt: string;
  lines: NormalizedLine[];
  subtotal: number;
};

function buildHtml(p: EmailPayload): string {
  const rows = p.lines
    .map(
      (line) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">
            <b>${line.qty}×</b> ${escapeHtml(line.name)}
            ${line.kind === 'reusable' ? '<span style="color:#a02135;font-size:12px;font-weight:700;"> · REUSABLE</span>' : ''}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap;">
            ${line.lineTotal === null ? '<span style="color:#a02135;">On request</span>' : money(line.lineTotal)}
          </td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F3F3F1;">
      <div style="background:#fff;border-radius:16px;padding:28px;">
        <h2 style="color:#a02135;margin:0 0 16px;font-size:22px;">
          Reusable Box Availability Request
        </h2>
        <p style="color:#666;margin:0 0 20px;font-size:13px;">
          Submitted from <b>${escapeHtml(p.source)}</b> at ${p.receivedAt}
        </p>

        <div style="background:#fdf2f4;border:1px solid #a02135;border-radius:12px;padding:14px;margin-bottom:20px;">
          <p style="margin:0;color:#a02135;font-size:14px;font-weight:700;">
            ⚠ Contains reusable boxes — confirm inventory availability before fulfillment.
          </p>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#0A0A0A;margin-bottom:24px;">
          <tr><td style="padding:8px 0;color:#888;width:130px;">Name</td><td><b>${escapeHtml(p.name)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td><b>${escapeHtml(p.phone)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td>${
            p.email
              ? `<a href="mailto:${escapeHtml(p.email)}" style="color:#a02135;text-decoration:none;">${escapeHtml(p.email)}</a>`
              : '<span style="color:#bbb;">—</span>'
          }</td></tr>
          ${p.notes ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Notes</td><td>${escapeHtml(p.notes)}</td></tr>` : ''}
        </table>

        <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin:0 0 8px;">
          Requested Items
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0A0A0A;">
          ${rows}
          <tr>
            <td style="padding:12px 0;font-weight:700;">Subtotal (priced items)</td>
            <td style="padding:12px 0;text-align:right;font-weight:700;font-size:18px;color:#a02135;">${money(p.subtotal)}</td>
          </tr>
        </table>

        <p style="color:#999;font-size:12px;margin:16px 0 0;">
          Delivery fee and taxes are not included — confirm with the customer.
        </p>
      </div>
      <p style="color:#999;font-size:12px;text-align:center;margin-top:16px;">${SITE_URL}</p>
    </div>
  `;
}

function buildText(p: EmailPayload): string {
  const items = p.lines
    .map(
      (line) =>
        `  ${line.qty}x ${line.name}${line.kind === 'reusable' ? ' [REUSABLE]' : ''} — ${
          line.lineTotal === null ? 'On request' : money(line.lineTotal)
        }`
    )
    .join('\n');

  return (
    `Reusable Box Availability Request\n` +
    `Source: ${p.source}\nReceived: ${p.receivedAt}\n\n` +
    `!! Contains reusable boxes — confirm inventory availability.\n\n` +
    `Name:  ${p.name}\nPhone: ${p.phone}\nEmail: ${p.email || '—'}\n` +
    (p.notes ? `Notes: ${p.notes}\n` : '') +
    `\nRequested Items:\n${items}\n\n` +
    `Subtotal (priced items): ${money(p.subtotal)}\n` +
    `Delivery fee and taxes not included.\n`
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[box-availability] Missing RESEND_API_KEY env var');
    return res.status(500).json({ ok: false, error: 'Email service not configured' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as AvailabilityPayload;
  if (!body) return res.status(400).json({ ok: false, error: 'Invalid JSON body' });

  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const email = (body.email || '').trim();
  const notes = (body.notes || '').trim().slice(0, 1000);
  const source = (body.source || 'moving-boxes').trim().slice(0, 50);

  if (!name || name.length < 2) return res.status(400).json({ ok: false, error: 'Name is required' });
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ ok: false, error: 'Valid phone is required' });
  if (email && !isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' });

  const lines = normalizeLines(Array.isArray(body.lines) ? body.lines : []);
  if (lines.length === 0) return res.status(400).json({ ok: false, error: 'Your request is empty' });

  // Enforce the scope documented at the top of this file: availability requests
  // are for reusable boxes. A cart of only priced items belongs in checkout.
  const hasReusable = lines.some((l) => l.kind === 'reusable');
  if (!hasReusable) {
    console.warn('[box-availability] Rejected non-reusable request', { source, lineCount: lines.length });
    return res.status(400).json({
      ok: false,
      error: 'This form is only for reusable moving boxes. Please use checkout for boxes and supplies.',
    });
  }

  const subtotal =
    Math.round(lines.reduce((sum, l) => sum + (l.lineTotal ?? 0), 0) * 100) / 100;
  const receivedAt = new Date().toISOString();

  // Structured log = backup of every request (visible in Vercel logs/Drain)
  console.log(
    '[reusable-availability]',
    JSON.stringify({ receivedAt, source, name, phone, email, notes, subtotal, lines })
  );

  const payload: EmailPayload = { name, phone, email, notes, source, receivedAt, lines, subtotal };
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      cc: [CC_EMAIL],
      replyTo: email || undefined,
      subject: `Reusable Box Availability — ${name} (${phone})`,
      html: buildHtml(payload),
      text: buildText(payload),
    });

    if (error) {
      console.error('[box-availability] Email error', error);
      return res.status(502).json({ ok: false, error: 'Failed to send request' });
    }
  } catch (err) {
    console.error('[box-availability] Unexpected error', err);
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }

  // TODO: enviar auto-reply de confirmação ao cliente (mesmo padrão de
  // buildAutoReplyHtml em api/quote.ts) quando o texto for aprovado.

  return res.status(200).json({ ok: true });
}

function safeParse(s: string): AvailabilityPayload | null {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
