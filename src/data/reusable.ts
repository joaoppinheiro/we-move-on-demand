/**
 * Reusable (plastic, stackable) moving boxes.
 *
 * These are NOT sold at a fixed online price yet — the catalog and pricing are
 * still being defined, and availability depends on current inventory. Every
 * entry therefore has `price: null`, which makes the cart switch from the
 * normal checkout flow to the "Request Availability" flow.
 *
 * TODO: catálogo e preços dos reusable boxes pendentes. Replace the placeholder
 * SKUs below with the real product names/sizes once confirmed, and add `price`
 * once reusable boxes are sold directly online.
 */

export type ReusableItem = {
  id: string;
  name: string;
  /** Always null while pricing is pending — see TODO above. */
  price: null;
  note: string;
};

export const reusableItems: ReusableItem[] = [
  {
    id: 'reusable-standard',
    name: 'Reusable Moving Box — Standard',
    price: null,
    note: 'Stackable, collapsible, holds up to ~50 lbs',
  },
  {
    id: 'reusable-large',
    name: 'Reusable Moving Box — Large',
    price: null,
    note: 'Extra capacity for linens, kitchen and bulk items',
  },
  {
    id: 'reusable-file',
    name: 'Reusable File / Office Crate',
    price: null,
    note: 'Office relocations, records and document transfer',
  },
];

export const REUSABLE_AVAILABILITY_NOTICE = {
  title: 'Reusable Box Availability',
  body:
    'Reusable moving boxes are subject to current inventory availability. Our team will confirm availability for your requested quantity before fulfillment.',
} as const;

/** Pre-filled SMS body for the "Text Us to Confirm Availability" button. */
export const REUSABLE_SMS_BODY =
  "Hi! I'm interested in ordering reusable moving boxes. Can you confirm availability?";
