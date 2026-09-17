import { Package, ArrowDown, Truck, ShieldCheck } from 'lucide-react';

/**
 * Full-bleed hero: the team photo covers the whole fold and the copy sits on a
 * frosted panel over it.
 *
 * Contrast notes — the panel is #151735 at 70% plus a left-to-right scrim, so
 * white text clears ~12:1 over the dark left third and never drops below ~6:1
 * even where the photo is blown out. The crimson brand tones (#a02135 /
 * #c41e46) are mid-luminance and cannot reach 4.5:1 as text on ANY dark
 * surface, so on this panel red appears only as a fill behind white text (the
 * badge and the CTA) instead of as coloured text.
 */
export function BoxesHero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#0d0f22]">
      <img
        src="/images/team-reusable-bins-hero.jpg"
        alt="We Move On Demand crew taping a moving box beside stacks of reusable moving bins"
        className="absolute inset-0 -z-10 w-full h-full object-cover object-center"
        width="1600"
        height="900"
        fetchPriority="high"
        decoding="async"
      />

      {/* Scrim — darkest under the panel, clearing towards the right so the
          crew and the bins stay readable in the photo. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0f22]/90 via-[#0d0f22]/65 to-[#0d0f22]/25"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        {/* Panel stays under 2xl so the right side of the photo shows through on
            desktop; on mobile it takes the full column width inside the padding. */}
        <div className="max-w-2xl rounded-3xl bg-[#151735]/70 backdrop-blur-xl ring-1 ring-white/15 shadow-2xl p-6 sm:p-9 lg:p-11">
          <div className="inline-flex items-center gap-2 bg-[#c41e46] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            <Package className="w-3.5 h-3.5" aria-hidden="true" />
            Boxes &amp; Supplies Shop
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-white mb-5">
            Moving Boxes &amp;<br />
            Packing Supplies
          </h1>

          <p className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">
            Everything You Need to Pack, Move &amp; Store
          </p>

          <p className="text-lg text-white/85 leading-relaxed mb-8">
            Get professional-quality moving boxes and packing supplies from We Move On Demand. Shop
            individual boxes and supplies, or make packing easier with one of our ready-to-go moving
            bundles based on the size of your home. Local delivery available.
          </p>

          {/* Primary CTA — full width on mobile. Points at the buy-vs-rent
              chooser rather than straight at the cardboard shop, so both
              paths get the same billing. */}
          <a
            href="#choose"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-[#c41e46] hover:scale-[1.02] transition-all shadow-lg"
          >
            Shop Boxes &amp; Bin Rentals
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/75">
              <Truck className="w-4 h-4 text-white" aria-hidden="true" />
              Local delivery available
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/75">
              <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
              Professional-grade materials
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
