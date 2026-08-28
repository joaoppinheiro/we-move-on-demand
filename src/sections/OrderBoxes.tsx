import { Package, ArrowRight, Truck } from 'lucide-react';
import { MOVING_BOXES_URL } from '@/lib/constants';

/**
 * Home page teaser ("dobra") that funnels traffic to the box shop.
 * Sits directly after Services — supplies are the natural next question after
 * "what do you do?" — and uses the dark band treatment already used by the
 * footer and service card hovers so it reads as a distinct commerce moment.
 */
export function OrderBoxes() {
  return (
    <section id="order-boxes" className="relative py-16 lg:py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Soft crimson glow accent */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-[#a02135]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              <Package className="w-3.5 h-3.5" aria-hidden="true" />
              Moving Supplies Shop
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Need Boxes for <span className="text-[#c41e46]">Your Move?</span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Shop moving boxes, bundles and packing supplies online — with local delivery available.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              <Truck className="w-4 h-4 text-[#c41e46]" aria-hidden="true" />
              Free next-business-day delivery on orders $75+
            </div>
          </div>

          {/* CTA — full width on mobile for an easy tap target */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <a
              href={MOVING_BOXES_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-[#c41e46] hover:scale-[1.02] transition-all shadow-lg"
            >
              Order Moving Boxes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
