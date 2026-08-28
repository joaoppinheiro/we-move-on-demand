/**
 * ============================================================================
 * STRIPE CHECKOUT + LOCAL DELIVERY PRICING — STUB (NOT DEPLOYED)
 * ============================================================================
 *
 * NÃO IMPLEMENTADO AINDA: a conta Stripe do negócio ainda não existe.
 *
 * This file is intentionally inert. The leading underscore keeps Vercel from
 * treating it as a serverless route, and the whole implementation is commented
 * out — so nothing here runs or gets bundled. It exists to hold the shape of
 * the integration so it can be turned on in one sitting later.
 *
 * ---------------------------------------------------------------------------
 * TODO — WHEN THE STRIPE ACCOUNT EXISTS
 * ---------------------------------------------------------------------------
 *  1. `npm i stripe`
 *  2. Add env vars in Vercel: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 *  3. Rename this file to `api/checkout.ts` (drop the underscore) and
 *     uncomment the implementation below.
 *  4. Point the cart's disabled "Checkout" button at it —
 *     src/sections/boxes/CartSheet.tsx (search for "TODO: STRIPE CHECKOUT").
 *  5. Add `api/stripe-webhook.ts` to fulfil paid orders (notify the team via
 *     the same Resend pattern as api/quote.ts / api/box-availability.ts).
 *
 * ---------------------------------------------------------------------------
 * PRICING RULES THIS FUNCTION MUST ENFORCE (server-side, authoritative)
 * ---------------------------------------------------------------------------
 *  • NEVER trust prices sent by the browser. Re-price every line id against
 *    src/data/bundles.ts and src/data/items.ts.
 *  • Local delivery: FREE at subtotal >= $75, otherwise a flat $15 fee.
 *  • Delivery is only offered to the ZIP codes in src/data/delivery.ts
 *    (Boca Raton / Delray Beach / Deerfield Beach). Reject anything else.
 *  • Reject the whole request if any line is a reusable box — those have no
 *    online price and must go through the "Request Availability" flow
 *    (api/box-availability.ts) instead.
 *  • Consider adding Florida sales tax (Stripe Tax or a fixed rate) before
 *    going live — currently NOT handled anywhere.
 *
 * ---------------------------------------------------------------------------
 * IMPLEMENTATION SKETCH
 * ---------------------------------------------------------------------------
 *
 * import type { VercelRequest, VercelResponse } from '@vercel/node';
 * import Stripe from 'stripe';
 * import { bundles } from '../src/data/bundles';
 * import { items } from '../src/data/items';
 * import {
 *   isEligibleZip,
 *   calcDeliveryFee,
 *   FREE_DELIVERY_THRESHOLD,
 *   LOCAL_DELIVERY_FEE,
 * } from '../src/data/delivery';
 *
 * type CheckoutLine = { id: string; qty: number };
 * type CheckoutBody = { lines: CheckoutLine[]; deliveryZip: string; email?: string };
 *
 * // Single source of truth for what is purchasable online, keyed by id.
 * const priceById = new Map<string, { name: string; price: number }>([
 *   ...bundles.map((b) => [b.id, { name: b.name, price: b.price }] as const),
 *   ...items.map((i) => [i.id, { name: i.name, price: i.price }] as const),
 * ]);
 *
 * export default async function handler(req: VercelRequest, res: VercelResponse) {
 *   if (req.method !== 'POST') {
 *     res.setHeader('Allow', 'POST');
 *     return res.status(405).json({ ok: false, error: 'Method not allowed' });
 *   }
 *
 *   const secret = process.env.STRIPE_SECRET_KEY;
 *   if (!secret) return res.status(500).json({ ok: false, error: 'Payments not configured' });
 *
 *   const body = req.body as CheckoutBody;
 *   const deliveryZip = (body?.deliveryZip || '').trim();
 *
 *   if (!isEligibleZip(deliveryZip)) {
 *     return res.status(400).json({
 *       ok: false,
 *       error: 'We do not offer local delivery to that ZIP code yet.',
 *     });
 *   }
 *
 *   // Re-price server-side; unknown ids (incl. every reusable-* id) are rejected.
 *   const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
 *   let subtotal = 0;
 *
 *   for (const line of body?.lines ?? []) {
 *     const product = priceById.get(line.id);
 *     if (!product) {
 *       return res.status(400).json({
 *         ok: false,
 *         error: `"${line.id}" is not available for online checkout.`,
 *       });
 *     }
 *     const qty = Math.min(Math.max(Math.trunc(line.qty), 1), 999);
 *     subtotal += product.price * qty;
 *     lineItems.push({
 *       quantity: qty,
 *       price_data: {
 *         currency: 'usd',
 *         unit_amount: Math.round(product.price * 100),
 *         product_data: { name: product.name },
 *       },
 *     });
 *   }
 *
 *   if (lineItems.length === 0) {
 *     return res.status(400).json({ ok: false, error: 'Your cart is empty' });
 *   }
 *
 *   subtotal = Math.round(subtotal * 100) / 100;
 *
 *   // Free at $75+, otherwise a flat $15. calcDeliveryFee returns null for an
 *   // ineligible ZIP, already rejected above — the ?? 0 is belt and braces.
 *   const deliveryFee = calcDeliveryFee(subtotal, deliveryZip) ?? 0;
 *   if (deliveryFee > 0) {
 *     lineItems.push({
 *       quantity: 1,
 *       price_data: {
 *         currency: 'usd',
 *         unit_amount: Math.round(deliveryFee * 100),
 *         product_data: {
 *           name: `Local Delivery (orders under $${FREE_DELIVERY_THRESHOLD})`,
 *         },
 *       },
 *     });
 *   }
 *
 *   const stripe = new Stripe(secret);
 *   const session = await stripe.checkout.sessions.create({
 *     mode: 'payment',
 *     line_items: lineItems,
 *     customer_email: body.email || undefined,
 *     success_url: 'https://wemoveondemand.com/moving-boxes?order=success',
 *     cancel_url: 'https://wemoveondemand.com/moving-boxes?order=cancelled',
 *     metadata: {
 *       deliveryZip,
 *       subtotal: String(subtotal),
 *       deliveryFee: String(deliveryFee),
 *       flatFee: String(LOCAL_DELIVERY_FEE),
 *     },
 *   });
 *
 *   return res.status(200).json({ ok: true, url: session.url });
 * }
 */

// Placeholder export so the file is valid TypeScript and never route-resolved.
export const STRIPE_CHECKOUT_IMPLEMENTED = false;
