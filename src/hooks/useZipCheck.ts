import { useState } from 'react';
import { isEligibleZip } from '@/data/delivery';

/**
 * Shared ZIP entry + eligibility state for the delivery bar and the Local
 * Delivery section.
 *
 * Single source of truth for both the ZIP list and the check itself: the list
 * lives in src/data/delivery.ts and is read through isEligibleZip() only —
 * nothing here or in either consumer re-declares ZIPs or re-implements the
 * comparison.
 *
 * This is a UI convenience, NOT authoritative. Delivery eligibility must be
 * re-validated server-side before a Stripe checkout session is created
 * (see api/_checkout-stub.ts).
 */

export type ZipStatus = 'empty' | 'incomplete' | 'eligible' | 'ineligible';

export function useZipCheck() {
  const [zip, setZip] = useState('');

  /** Keeps the field numeric and capped at 5 digits. */
  const onZipChange = (value: string) => setZip(value.replace(/\D/g, '').slice(0, 5));

  const status: ZipStatus =
    zip.length === 0
      ? 'empty'
      : zip.length < 5
        ? 'incomplete'
        : isEligibleZip(zip)
          ? 'eligible'
          : 'ineligible';

  return { zip, onZipChange, status };
}
