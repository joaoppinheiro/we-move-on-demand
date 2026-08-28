import { Package, ArrowDown, Truck, ShieldCheck } from 'lucide-react';

export function BoxesHero() {
  return (
    <section id="hero" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-[#F3F3F1] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Package className="w-3.5 h-3.5" aria-hidden="true" />
              Boxes &amp; Supplies Shop
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-[#0A0A0A] mb-5">
              Moving Boxes &amp;<br />
              <span className="text-[#a02135]">Packing Supplies</span>
            </h1>

            <p className="text-xl md:text-2xl font-bold text-[#0A0A0A] tracking-tight mb-5">
              Everything You Need to Pack, Move &amp; Store
            </p>

            <p className="paragraph-large max-w-2xl mb-8">
              Get professional-quality moving boxes and packing supplies from We Move On Demand. Shop
              individual boxes and supplies, or make packing easier with one of our ready-to-go moving
              bundles based on the size of your home. Local delivery available.
            </p>

            {/* Primary CTA — full width on mobile */}
            <a
              href="#shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-[#c41e46] hover:scale-[1.02] transition-all shadow-lg"
            >
              Order Moving Boxes
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                <Truck className="w-4 h-4 text-[#a02135]" aria-hidden="true" />
                Local delivery available
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#a02135]" aria-hidden="true" />
                Professional-grade materials
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-white shadow-xl">
              <img
                src="/images/movers-furniture.webp"
                alt="We Move On Demand crew handling packed moving boxes"
                className="absolute inset-0 w-full h-full object-cover"
                width="600"
                height="600"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
