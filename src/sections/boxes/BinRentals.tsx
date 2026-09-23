import {
  Repeat,
  CalendarClock,
  Truck,
  Boxes as BoxesIcon,
  Check,
  Star,
  CheckCircle2,
  Info,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  rentalPrograms,
  RENTAL_INTRO,
  RENTAL_DELIVERY_POLICY,
  RENTAL_CARD_FOOTNOTE,
  RENTAL_SMS_BODY,
  RENTAL_BIN_HELP_NUDGE,
  RENTAL_TERM_DAYS,
  type RentalKind,
  type RentalPackage,
} from '@/data/rentals';
import { formatPrice } from '@/lib/cart';
import { useZipCheck } from '@/hooks/useZipCheck';
import { deliveryAreas } from '@/data/delivery';
import { smsLink, SMS_PHONE_TEL, SMS_PHONE_LABEL } from '@/lib/constants';
import { AddToCartButton } from './AddToCartButton';
import { ProductImage } from './ProductImage';

/**
 * Per-program accents. Kept as literal class strings in a static map (not built
 * from data) so Tailwind can see every class at build time.
 */
const accents: Record<RentalKind, { text: string; pill: string; button: 'primary' | 'dark' }> = {
  totes: {
    text: 'text-[#c41e46]',
    pill: 'bg-[#c41e46]/15 text-[#ff8da3]',
    button: 'primary',
  },
  crates: {
    text: 'text-[#7aa7ff]',
    pill: 'bg-[#7aa7ff]/15 text-[#7aa7ff]',
    button: 'dark',
  },
};

const introIcons = [CalendarClock, Truck, BoxesIcon];

function dollyLabel(count: number) {
  return `${count} ${count === 1 ? 'dolly' : 'dollies'}`;
}

function RentalPackageCard({ pkg }: { pkg: RentalPackage }) {
  const accent = accents[pkg.kind];
  const unitWord = pkg.kind === 'totes' ? 'totes' : 'crates';
  const dollies = dollyLabel(pkg.dollies);

  return (
    <article
      className={`flex flex-col bg-white/5 border rounded-3xl p-6 transition-colors ${
        pkg.popular ? 'border-[#c41e46]/50' : 'border-white/10'
      }`}
    >
      <ProductImage src={pkg.image} alt={pkg.name} tone="dark" />

      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {pkg.bestFor ?? `${RENTAL_TERM_DAYS}-Day Rental`}
        </span>
        {pkg.popular && (
          <span className="inline-flex items-center gap-1.5 bg-[#c41e46] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3" aria-hidden="true" />
            Most Popular
          </span>
        )}
      </div>

      <h4 className="text-lg font-bold text-white leading-tight mb-4">{pkg.name}</h4>

      <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-white/10">
        <span className={`text-3xl font-bold tracking-tight ${accent.text}`}>
          {formatPrice(pkg.price)}
        </span>
        <span className="text-xs text-gray-400">{RENTAL_TERM_DAYS}-day rental</span>
      </div>

      <ul className="space-y-2 mb-5 flex-1">
        {[
          `${pkg.unitCount} ${unitWord} with lids`,
          `${dollies} included`,
          'Delivery & pickup included',
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-gray-300">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accent.text}`} aria-hidden="true" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs font-semibold text-gray-400 mb-5">
        + {formatPrice(pkg.additionalWeekPrice)} per additional week
      </p>

      <AddToCartButton
        line={{
          id: pkg.id,
          name: pkg.name,
          kind: 'rental',
          price: pkg.price,
          meta: `${RENTAL_TERM_DAYS}-day rental · ${dollies}`,
        }}
        variant={accent.button}
      />

      <p className="mt-4 text-[10px] text-gray-500 leading-relaxed">{RENTAL_CARD_FOOTNOTE}</p>
    </article>
  );
}

/**
 * ZIP check for the rental section.
 *
 * Reads the SAME ZIP list as the sticky delivery bar and the Local Delivery
 * section, through useZipCheck → src/data/delivery.ts. Nothing is redeclared
 * here.
 *
 * A ZIP outside the list is never a blocker: the rental program travels beyond
 * the complimentary-delivery area for a fee, so an out-of-area ZIP only changes
 * the message to "our team will confirm", matching the rest of the site's
 * to-be-confirmed flows.
 */
function RentalZipCheck() {
  const { zip, onZipChange, status } = useZipCheck();

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-7">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
        Check Your ZIP Code
      </p>

      <label htmlFor="rental-zip" className="sr-only">
        Rental delivery ZIP code
      </label>
      <input
        id="rental-zip"
        type="text"
        inputMode="numeric"
        maxLength={5}
        value={zip}
        onChange={(e) => onZipChange(e.target.value)}
        placeholder="Enter ZIP code"
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#c41e46] focus:bg-white/15 transition-colors"
      />

      <div aria-live="polite" className="mt-4 min-h-[24px]">
        {status === 'eligible' && (
          <p className="flex items-start gap-2 text-sm font-semibold text-green-400">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {zip} is in our standard service area — delivery and pickup are included.
          </p>
        )}
        {status === 'ineligible' && (
          <p className="flex items-start gap-2 text-sm font-semibold text-gray-300">
            <Info className="w-5 h-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {zip} is outside our standard service area — our team will confirm availability and any
            additional delivery/pickup fee for your address.
          </p>
        )}
      </div>

      <p className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
        Standard service area:{' '}
        {deliveryAreas.map((area) => area.city).join(', ')} — your delivery window will be confirmed
        before delivery.
      </p>
    </div>
  );
}

/**
 * Reusable moving bin rentals — red/black totes and blue professional crates.
 *
 * Rental packages carry real prices and go into the same cart as cardboard, but
 * rental checkout is materially more involved (term, delivery window, pickup,
 * equipment count), so the cart still ends on the shared "coming soon" state.
 * See the notice in CartSheet.tsx.
 */
export function BinRentals() {
  return (
    <section
      id="rentals"
      className="relative py-16 lg:py-24 bg-[#0A0A0A] scroll-mt-32 overflow-hidden"
    >
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#a02135]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            <Repeat className="w-3.5 h-3.5" aria-hidden="true" />
            Rent
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {RENTAL_INTRO.title}
          </h2>

          <p className="text-xl md:text-2xl font-bold text-[#c41e46] tracking-tight mb-5">
            {RENTAL_INTRO.subtitle}
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">{RENTAL_INTRO.body}</p>
        </div>

        {/* Program pills */}
        <ul className="flex flex-wrap gap-3 mb-14">
          {RENTAL_INTRO.pills.map((pill, i) => {
            const Icon = introIcons[i] ?? CalendarClock;
            return (
              <li
                key={pill}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full"
              >
                <Icon className="w-3.5 h-3.5 text-[#c41e46]" aria-hidden="true" />
                {pill}
              </li>
            );
          })}
        </ul>

        {/* Programs */}
        <div className="space-y-16 lg:space-y-20">
          {rentalPrograms.map((program) => (
            <div key={program.kind}>
              <div className="max-w-3xl mb-8">
                <p
                  className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${accents[program.kind].text}`}
                >
                  {program.positioning}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-sm font-semibold text-gray-400 mb-4">{program.tagline}</p>
                <p className="text-gray-300 leading-relaxed">{program.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {program.packages.map((pkg) => (
                  <RentalPackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still-not-sure nudge, straight after both package grids */}
        <p className="mt-10 lg:mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-300">
          <span>{RENTAL_BIN_HELP_NUDGE.text}</span>
          <a
            href={smsLink(RENTAL_BIN_HELP_NUDGE.smsBody)}
            className="inline-flex items-center gap-1.5 font-bold text-white underline decoration-[#c41e46] decoration-2 underline-offset-4 hover:text-[#c41e46] transition-colors"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            {RENTAL_BIN_HELP_NUDGE.linkLabel}
          </a>
          <span>{RENTAL_BIN_HELP_NUDGE.after}</span>
        </p>

        {/* Delivery policy */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="bg-[#a02135]/15 border border-[#a02135]/40 rounded-3xl p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#a02135] rounded-xl flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">
                  {RENTAL_DELIVERY_POLICY.title}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {RENTAL_DELIVERY_POLICY.body}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={SMS_PHONE_TEL}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#c41e46] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call {SMS_PHONE_LABEL}
              </a>
              <a
                href={smsLink(RENTAL_SMS_BODY)}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                Text Us
              </a>
            </div>
          </div>

          <RentalZipCheck />
        </div>
      </div>
    </section>
  );
}
