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
 * Replace the placeholder below with the real SMS-capable business number
 * (digits only, e.g. '5612127570'). Until then the "Text Us" buttons render
 * with a visibly broken href on purpose so this can't ship unnoticed.
 */
export const SMS_PHONE_NUMBER = '[PHONE_NUMBER_TBD]';

/** Builds an sms: link with a pre-filled message body. */
export function smsLink(body: string): string {
  return `sms:${SMS_PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}
