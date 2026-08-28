import { useState } from 'react';
import { Recycle, Info, MessageSquare, ArrowRight } from 'lucide-react';
import {
  reusableItems,
  REUSABLE_AVAILABILITY_NOTICE,
  REUSABLE_SMS_BODY,
} from '@/data/reusable';
import { useCart } from '@/lib/cart';
import { smsLink, SMS_PHONE_NUMBER } from '@/lib/constants';
import { QuantityStepper } from './QuantityStepper';
import { AddToCartButton } from './AddToCartButton';

function ReusableCard({ id, name, note }: { id: string; name: string; note: string }) {
  const [qty, setQty] = useState(1);

  return (
    <article className="flex flex-col bg-white/5 border border-white/10 rounded-3xl p-6">
      <h3 className="text-lg font-bold text-white leading-tight mb-2">{name}</h3>

      <div className="flex-1 mb-5">
        <p className="text-sm text-gray-400 leading-relaxed">{note}</p>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-[#c41e46] mb-5">
        Price confirmed on request
      </p>

      <div className="flex flex-col gap-3">
        <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${name}`} />
        <AddToCartButton
          line={{ id, name, kind: 'reusable', price: null, meta: 'Availability to be confirmed' }}
          qty={qty}
          label="Add to Request"
          onAdded={() => setQty(1)}
        />
      </div>
    </article>
  );
}

/**
 * Reusable (plastic) moving boxes. Priced-on-request today, so items added here
 * put the cart into the "Request Availability" flow instead of checkout.
 */
export function ReusableBoxes() {
  const { hasReusable, openCart } = useCart();

  return (
    <section id="reusable" className="relative py-16 lg:py-24 bg-[#0A0A0A] scroll-mt-20 overflow-hidden">
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#a02135]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            <Recycle className="w-3.5 h-3.5" aria-hidden="true" />
            Reusable Moving Boxes
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Pack. Stack. <span className="text-[#c41e46]">Move. Reuse.</span>
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            We also offer durable reusable moving boxes for customers looking for an alternative to
            traditional cardboard. They're stackable, easy to handle and great for moving, organizing,
            office relocations and storage. Reusable boxes will be available individually and in
            bundles, subject to availability.
          </p>
        </div>

        {/* Availability notice */}
        <div className="flex items-start gap-4 bg-[#a02135]/15 border border-[#a02135]/40 rounded-2xl p-5 lg:p-6 mb-12">
          <div className="w-10 h-10 bg-[#a02135] rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white font-bold mb-1.5">{REUSABLE_AVAILABILITY_NOTICE.title}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{REUSABLE_AVAILABILITY_NOTICE.body}</p>
          </div>
        </div>

        {/* Request-only catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {reusableItems.map((item) => (
            <ReusableCard key={item.id} id={item.id} name={item.name} note={item.note} />
          ))}
        </div>

        {/* Text Us — lives here rather than as a second floating button, so it
            doesn't compete with the floating cart on mobile. */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href={smsLink(REUSABLE_SMS_BODY)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-[#c41e46] hover:text-white transition-colors shadow-lg"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            Text Us to Confirm Availability
          </a>

          {hasReusable && (
            <button
              type="button"
              onClick={openCart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/25 text-white text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-white/10 transition-colors"
            >
              Review Request
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Visible build-time reminder — remove together with the placeholder. */}
        {SMS_PHONE_NUMBER.startsWith('[') && (
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-yellow-400">
            ⚠ TODO: replace SMS_PHONE_NUMBER placeholder in src/lib/constants.ts — the Text Us link is
            not functional yet.
          </p>
        )}
      </div>
    </section>
  );
}
