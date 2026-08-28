export const BBB_PROFILE_URL =
  'https://www.bbb.org/us/fl/boca-raton/profile/moving-companies/we-move-on-demand-0633-90605068';

export const BBB_LEAVE_REVIEW_URL =
  'https://www.bbb.org/us/fl/boca-raton/profile/moving-companies/we-move-on-demand-0633-90605068/leave-a-review';

export const PHONE_TEL = 'tel:5612127570';
export const PHONE_LABEL = '(561) 212-7570';
export const LEAD_EMAIL = 'move@wemoveondemand.com';

/** Box shop route (rewritten to /moving-boxes.html by vercel.json). */
export const MOVING_BOXES_URL = '/moving-boxes';

/**
 * ⚠️ TODO: NÚMERO DE TELEFONE DO NEGÓCIO PARA SMS AINDA NÃO DEFINIDO. ⚠️
 *
 * Replace the placeholder below with the real SMS-capable business number
 * (digits only, e.g. '5612127570') — that single edit is all it takes to turn
 * every "Text Us" button back on.
 *
 * While the placeholder is here, IS_SMS_CONFIGURED is false and every Text Us
 * button is hidden from the UI, so customers never see a dead sms: link. The
 * reminder banner in the Reusable section is dev-only.
 */
export const SMS_PHONE_NUMBER = '[PHONE_NUMBER_TBD]';

/**
 * False while SMS_PHONE_NUMBER is still the bracketed placeholder. Gate every
 * Text Us affordance on this.
 */
export const IS_SMS_CONFIGURED = !SMS_PHONE_NUMBER.startsWith('[');

/** Builds an sms: link with a pre-filled message body. */
export function smsLink(body: string): string {
  return `sms:${SMS_PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}
