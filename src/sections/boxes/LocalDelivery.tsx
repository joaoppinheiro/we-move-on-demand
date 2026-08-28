import { useState } from 'react';
import { Truck, MapPin, CheckCircle2, XCircle, PackageCheck } from 'lucide-react';
import {
  deliveryAreas,
  isEligibleZip,
  FREE_DELIVERY_THRESHOLD,
  LOCAL_DELIVERY_FEE,
} from '@/data/delivery';

/*
 * TODO: lógica de cálculo de frete precisa rodar como Vercel Function antes de
 * criar a sessão de checkout do Stripe — a checagem de ZIP abaixo é só uma
 * conveniência de UI e NÃO é fonte de verdade (cliente pode burlar).
 * The authoritative rules (free at $75+, otherwise $15, restricted to the ZIPs
 * in src/data/delivery.ts) must be re-validated server-side.
 * Stub: api/_checkout-stub.ts
 */

function ZipChecker() {
  const [zip, setZip] = useState('');
  const trimmed = zip.trim();
  const isComplete = /^\d{5}$/.test(trimmed);
  const eligible = isComplete && isEligibleZip(trimmed);

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-7">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
        Check Your ZIP Code
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter ZIP code"
          aria-label="Delivery ZIP code"
          className="flex-1 bg-[#F3F3F1] border border-gray-200 rounded-xl px-4 py-3.5 text-[#0A0A0A] placeholder:text-gray-500 focus:outline-none focus:border-[#a02135] focus:ring-2 focus:ring-[#a02135]/10 transition-all"
        />
      </div>

      <div aria-live="polite" className="mt-4 min-h-[24px]">
        {isComplete && eligible && (
          <p className="flex items-start gap-2 text-sm font-semibold text-green-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            Great news — we deliver to {trimmed}.
          </p>
        )}
        {isComplete && !eligible && (
          <p className="flex items-start gap-2 text-sm font-semibold text-gray-600">
            <XCircle className="w-5 h-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {trimmed} isn't in our local delivery area yet — give us a call and we'll find an option
            for you.
          </p>
        )}
      </div>
    </div>
  );
}

export function LocalDelivery() {
  return (
    <section id="delivery" className="relative py-16 lg:py-24 bg-[#F3F3F1] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Truck className="w-3.5 h-3.5" aria-hidden="true" />
              Local Delivery
            </div>

            <h2 className="heading-section mb-6">
              Need Your Boxes <span className="text-[#a02135]">Delivered?</span>
            </h2>

            <p className="paragraph-large mb-6">
              Skip the trip to the store. We offer local delivery of moving boxes, bundles and packing
              supplies in select South Florida service areas.
            </p>

            {/* Pricing rules */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white rounded-2xl p-4">
                <PackageCheck className="w-5 h-5 text-[#a02135] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-[#0A0A0A]">
                    Free next-business-day local delivery on orders ${FREE_DELIVERY_THRESHOLD}+.
                  </strong>{' '}
                  For orders under ${FREE_DELIVERY_THRESHOLD}, a ${LOCAL_DELIVERY_FEE} local delivery
                  fee applies. Available in select Boca Raton, Delray Beach and Deerfield Beach ZIP
                  codes.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <ZipChecker />
            </div>
          </div>

          {/* Eligible ZIPs */}
          <div className="bg-white rounded-3xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#a02135]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Service Area
                </p>
                <p className="font-bold text-[#0A0A0A]">Eligible Delivery ZIP Codes</p>
              </div>
            </div>

            <div className="space-y-6">
              {deliveryAreas.map((area) => (
                <div key={area.city}>
                  <p className="text-sm font-bold text-[#0A0A0A] mb-3">{area.city}</p>
                  <ul className="flex flex-wrap gap-2">
                    {area.zips.map((zip) => (
                      <li
                        key={zip}
                        className="bg-[#F3F3F1] text-[#0A0A0A] text-sm font-semibold px-3 py-1.5 rounded-lg tabular-nums"
                      >
                        {zip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
              Outside these ZIP codes? Call us — we'll let you know what we can do for your area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
