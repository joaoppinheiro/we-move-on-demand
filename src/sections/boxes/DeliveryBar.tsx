import { Truck, CheckCircle2, XCircle, Phone } from 'lucide-react';
import { useZipCheck } from '@/hooks/useZipCheck';
import { FREE_DELIVERY_THRESHOLD, LOCAL_DELIVERY_FEE } from '@/data/delivery';
import { PHONE_TEL, PHONE_LABEL } from '@/lib/constants';

/**
 * Compact sticky delivery strip with an inline ZIP check.
 *
 * Sits at `top-20`, directly under the h-20 sticky header, so the two stack
 * instead of overlapping. Kept to a single short row (no wrapping on mobile)
 * so it costs ~48px of viewport rather than a full band.
 *
 * ZIP list and eligibility logic come from useZipCheck → src/data/delivery.ts,
 * the same source the Local Delivery section reads. Nothing is duplicated here.
 */
export function DeliveryBar() {
  const { zip, onZipChange, status } = useZipCheck();

  return (
    <div className="sticky top-20 z-30 bg-[#151735] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-2.5 min-h-[48px]">
          {/* Prompt — shortened on small screens to keep one row */}
          <p className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold min-w-0">
            <Truck className="w-4 h-4 text-[#c41e46] flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">
              Free delivery on orders ${FREE_DELIVERY_THRESHOLD}+ — check your ZIP
            </span>
            <span className="sm:hidden">Free delivery ${FREE_DELIVERY_THRESHOLD}+</span>
          </p>

          <label htmlFor="delivery-bar-zip" className="sr-only">
            Delivery ZIP code
          </label>
          <input
            id="delivery-bar-zip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => onZipChange(e.target.value)}
            placeholder="ZIP"
            className="w-[5.5rem] flex-shrink-0 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white text-center tabular-nums placeholder:text-gray-400 focus:outline-none focus:border-[#c41e46] focus:bg-white/15 transition-colors"
          />

          {/* Result — truncates rather than wrapping the bar onto a second row */}
          <div aria-live="polite" className="min-w-0 flex-1">
            {status === 'eligible' && (
              <p className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-green-400 truncate">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">
                  <span className="hidden md:inline">
                    Delivery available in your area — free on orders ${FREE_DELIVERY_THRESHOLD}+,
                    otherwise ${LOCAL_DELIVERY_FEE}
                  </span>
                  <span className="md:hidden">Available</span>
                </span>
              </p>
            )}

            {status === 'ineligible' && (
              <p className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 truncate">
                <XCircle className="w-4 h-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span className="truncate">
                  <span className="hidden md:inline">Not available in this ZIP — </span>
                  <a href={PHONE_TEL} className="underline hover:text-white transition-colors">
                    <span className="hidden md:inline">call us to check</span>
                    <span className="md:hidden">Call us</span>
                  </a>
                </span>
              </p>
            )}
          </div>

          {/* Phone shortcut, desktop only — the bar must stay one row on mobile */}
          <a
            href={PHONE_TEL}
            className="hidden lg:inline-flex items-center gap-2 flex-shrink-0 text-[11px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            {PHONE_LABEL}
          </a>
        </div>
      </div>
    </div>
  );
}
