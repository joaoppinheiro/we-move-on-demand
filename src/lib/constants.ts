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
 * SMS-capable business line, digits only — confirmed by the client as
 * 888-675-7570. Used by both the sms: and the tel: links in the box shop's
 * help controls, which is why the label and tel: form live here too.
 */
export const SMS_PHONE_NUMBER = '8886757570';
export const SMS_PHONE_LABEL = '888-675-7570';
export const SMS_PHONE_TEL = `tel:${SMS_PHONE_NUMBER}`;

/** Builds an sms: link with a pre-filled message body. */
export function smsLink(body: string): string {
  return `sms:${SMS_PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}
