import { ShoppingBag, Repeat, ArrowRight } from 'lucide-react';

/**
 * BUY vs RENT — the first decision on /moving-boxes.
 *
 * The shop sells two things that work very differently: cardboard that is
 * bought and kept, and reusable bins that are rented and picked back up.
 * Splitting that choice before the catalogs means neither path has to explain
 * itself inside a product grid.
 *
 * Both CTAs are in-page anchors, not routes — the page is a single Vite entry
 * and the cart is in memory, so a real navigation would drop it.
 */
const paths = [
  {
    eyebrow: 'Buy',
    icon: ShoppingBag,
    title: 'Moving Boxes & Packing Supplies',
    description:
      'Cardboard moving bundles, individual boxes, office/file boxes and packing supplies. Products are purchased and kept/recycled.',
    cta: 'Shop Moving Boxes',
    href: '#shop',
    tone: 'light' as const,
  },
  {
    eyebrow: 'Rent',
    icon: Repeat,
    title: 'Reusable Moving Bins',
    description:
      'Red/black reusable totes and blue professional moving crates. Standard 7-day rental with delivery, pickup and dollies.',
    cta: 'Rent Moving Bins',
    href: '#rentals',
    tone: 'dark' as const,
  },
];

export function ChoosePath() {
  return (
    <section id="choose" className="relative py-16 lg:py-20 bg-white scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <span className="section-label mb-4 block">Two Ways to Pack</span>
          <h2 className="heading-section mb-6">
            Buy Boxes or <span className="text-[#a02135]">Rent Bins?</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            Pick the path that fits your move — you can mix both in one order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paths.map((path) => (
            <a
              key={path.eyebrow}
              href={path.href}
              className={`group flex flex-col rounded-3xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                path.tone === 'dark'
                  ? 'bg-[#0A0A0A] border-2 border-[#0A0A0A]'
                  : 'bg-[#F3F3F1] border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    path.tone === 'dark' ? 'bg-[#c41e46]' : 'bg-[#a02135]'
                  }`}
                >
                  <path.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-[0.3em] ${
                    path.tone === 'dark' ? 'text-[#c41e46]' : 'text-[#a02135]'
                  }`}
                >
                  {path.eyebrow}
                </span>
              </div>

              <h3
                className={`text-2xl lg:text-3xl font-bold tracking-tight mb-4 ${
                  path.tone === 'dark' ? 'text-white' : 'text-[#0A0A0A]'
                }`}
              >
                {path.title}
              </h3>

              <p
                className={`leading-relaxed flex-1 mb-8 ${
                  path.tone === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {path.description}
              </p>

              {/* Rendered as a span — the whole card is the link */}
              <span
                className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-colors ${
                  path.tone === 'dark'
                    ? 'bg-white text-[#0A0A0A] group-hover:bg-[#c41e46] group-hover:text-white'
                    : 'bg-[#151735] text-white group-hover:bg-[#a02135]'
                }`}
              >
                {path.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
