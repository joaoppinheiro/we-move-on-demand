/**
 * Local delivery rules and eligible ZIP codes for box/supply orders.
 *
 * Kept standalone and dependency-free so it can be reused by the front-end AND
 * by the Vercel Function that will price shipping before creating the Stripe
 * checkout session (see api/_checkout-stub.ts).
 */

export const FREE_DELIVERY_THRESHOLD = 75;
export const LOCAL_DELIVERY_FEE = 15;

export type DeliveryArea = {
  city: string;
  zips: string[];
};

export const deliveryAreas: DeliveryArea[] = [
  {
    city: 'Boca Raton',
    zips: ['33428', '33431', '33432', '33433', '33434', '33486', '33487', '33496', '33498'],
  },
  {
    city: 'Delray Beach',
    zips: ['33444', '33445', '33446', '33483', '33484'],
  },
  {
    city: 'Deerfield Beach',
    zips: ['33441', '33442'],
  },
];

/** Flat list of every ZIP we deliver to. */
export const deliveryZips: string[] = deliveryAreas.flatMap((area) => area.zips);

export function isEligibleZip(zip: string): boolean {
  return deliveryZips.includes(zip.trim().slice(0, 5));
}

/**
 * Delivery fee for a given order subtotal: free at $75+, otherwise $15.
 * Returns null when the ZIP is outside the service area (no local delivery
 * offered — customer picks up or arranges another option).
 */
export function calcDeliveryFee(subtotal: number, zip?: string): number | null {
  if (zip !== undefined && !isEligibleZip(zip)) return null;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : LOCAL_DELIVERY_FEE;
}
