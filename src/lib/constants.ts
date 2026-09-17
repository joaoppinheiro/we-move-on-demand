export const BBB_PROFILE_URL =
  'https://www.bbb.org/us/fl/boca-raton/profile/moving-companies/we-move-on-demand-0633-90605068';

export const BBB_LEAVE_REVIEW_URL =
  'https://www.bbb.org/us/fl/boca-raton/profile/moving-companies/we-move-on-demand-0633-90605068/leave-a-review';

/** Main site line — home page header, footer, FAQ, About and quote form. */
export const PHONE_TEL = 'tel:5612127570';
export const PHONE_LABEL = '(561) 212-7570';
export const LEAD_EMAIL = 'move@wemoveondemand.com';

/** Box shop route (rewritten to /moving-boxes.html by vercel.json). */
export const MOVING_BOXES_URL = '/moving-boxes';

/**
 * General call/text line for the box shop, digits only — confirmed by the
 * client as (772) 607-3100. Drives every general contact point on
 * /moving-boxes (help dock, shop header, delivery bar, moving cross-sell).
 *
 * Deliberately three separate numbers on this page: PHONE_* above stays on the
 * main site, and SMS_PHONE_* below is the rentals-only line.
 */
export const SHOP_PHONE_NUMBER = '7726073100';
export const SHOP_PHONE_LABEL = '(772) 607-3100';
export const SHOP_PHONE_TEL = `tel:${SHOP_PHONE_NUMBER}`;

/** Builds an sms: link to the box shop line with a pre-filled message body. */
export function shopSmsLink(body: string): string {
  return `sms:${SHOP_PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}

/**
 * Reusable bin rental line, digits only — confirmed by the client as
 * 888-675-7570. Intentionally NOT the shop number above: the rental program is
 * booked through its own line, so only the Reusable Moving Bin Rentals section
 * uses these.
 */
export const SMS_PHONE_NUMBER = '8886757570';
export const SMS_PHONE_LABEL = '888-675-7570';
export const SMS_PHONE_TEL = `tel:${SMS_PHONE_NUMBER}`;

/** Builds an sms: link to the rental line with a pre-filled message body. */
export function smsLink(body: string): string {
  return `sms:${SMS_PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}
