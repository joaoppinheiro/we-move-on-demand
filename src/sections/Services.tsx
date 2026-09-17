import { Truck, Warehouse, Package, ArrowRight } from 'lucide-react';
import { MOVING_BOXES_URL } from '@/lib/constants';

/**
 * Three service cards, condensed from the previous six.
 *
 * The four moving variants (commercial, residential, local, statewide) now
 * share a single "Move" card: this page IS the moving page, so those cards had
 * no destination of their own to link to and their "Learn More" links all
 * pointed back at #contact. The four are kept visible as tags so nothing that
 * was advertised before disappears.
 *
 * Each card takes a distinct tone that already exists in the brand palette
 * (tailwind.config.js — midnight / midnight-light / crimson) rather than a new
 * colour. The ramp runs dark navy -> lighter navy -> crimson so it ends on the
 * site's action colour, on the only card with a live CTA.
 */
const CARD_BASE =
  'group rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl';
const ICON_TILE =
  'w-14 h-14 bg-white/10 ring-1 ring-white/15 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300';

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">What We Offer</span>
          <h2 className="heading-section mb-6">
            Our <span className="text-[#a02135]">Services</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            From local moves to statewide relocations, we provide comprehensive moving 
            solutions tailored to your needs. Experience the difference of a 5-star moving company.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1 — Move. No CTA on purpose: this page is the Move page. */}
          <div className={`${CARD_BASE} bg-[#151735]`}>
            <div className={ICON_TILE}>
              <Truck className="w-7 h-7 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Move</h3>
            <p className="text-white/85 leading-relaxed mb-6">
              Homes and businesses, across the street or across Florida. Our crews handle houses,
              apartments, offices and retail spaces with white-glove care and minimal downtime —
              from same-day local jobs to long-distance statewide relocations.
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {['Residential', 'Commercial', 'Local', 'Statewide'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 2 — Storage. */}
          <div className={`${CARD_BASE} bg-[#242550]`}>
            <div className={ICON_TILE}>
              <Warehouse className="w-7 h-7 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Storage</h3>
            <p className="text-white/85 leading-relaxed mb-6">
              Moving has never been so easy. We offer secure storage solutions for your belongings
              until you are ready to move into your new home or office.
            </p>

            {/*
              TODO: linkar quando a página de Storage existir.
              Same treatment as "Get a Moving Estimate" on /moving-boxes: an
              inert disabled <button>, not an <a>, so assistive tech announces
              it as disabled until the destination exists. The fill is a
              translucent white instead of that page's bg-gray-300 only because
              a light grey pill on a navy card would read as the most prominent
              button on the row. Swap for an <a href="..."> once the page lands.
            */}
            <div className="mt-auto">
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex items-center gap-2 bg-white/15 text-white/70 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full cursor-not-allowed"
              >
                Storage Details
              </button>
              <p className="mt-3 text-xs text-white/60">
                Storage page coming soon — call us and we'll walk you through the options.
              </p>
            </div>
          </div>

          {/* 3 — Moving Supplies. The only card with a live destination. */}
          <div className={`${CARD_BASE} bg-[#a02135]`}>
            <div className={ICON_TILE}>
              <Package className="w-7 h-7 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Moving Supplies</h3>
            <p className="text-white/85 leading-relaxed mb-6">
              Buy or rent boxes — moving bundles, packing supplies and reusable bin rentals, all in
              one place.
            </p>

            <div className="mt-auto">
              <a
                href={MOVING_BOXES_URL}
                className="inline-flex items-center gap-2 bg-white text-[#a02135] text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Shop Boxes &amp; Bin Rentals
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Not sure which service you need? Let's talk about your move.
          </p>
          <a href="tel:5612127570" className="btn-primary">
            <ArrowRight className="w-4 h-4" />
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
