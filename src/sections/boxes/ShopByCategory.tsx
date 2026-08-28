import { Boxes, Package, Briefcase, Scissors, ArrowRight } from 'lucide-react';

const categories = [
  {
    icon: Boxes,
    title: 'Moving Box Bundles',
    lead: 'Not sure how many boxes you need?',
    description:
      'Choose one of our ready-to-go moving bundles based on the size of your move. We offer College, 1 Bedroom, 2 Bedroom, 3 Bedroom and 4 Bedroom bundles, with Deluxe options that include additional specialty boxes and packing materials.',
    cta: 'Shop Bundles',
    href: '#bundles',
  },
  {
    icon: Package,
    title: 'Individual Moving Boxes',
    lead: 'Need just a few boxes or prefer to build your own order?',
    description:
      'Shop individual Small, Medium, Large and X-Large moving boxes, plus Dish Packs, Wardrobe Boxes and Mirror/Picture Boxes.',
    cta: 'Shop Boxes',
    href: '#boxes',
  },
  {
    icon: Briefcase,
    title: 'Office & File Boxes',
    lead: 'Moving an office, packing files or organizing important documents?',
    description:
      'Shop Banker Boxes with lids for files, records and documents. Customers can also add our regular moving boxes and packing supplies to create an order that works for their office move.',
    cta: 'Shop Office Boxes',
    href: '#office-boxes',
  },
  {
    icon: Scissors,
    title: 'Packing Supplies',
    lead: 'Everything needed to help protect belongings during packing and moving.',
    description: 'Includes Packing Tape, Bubble Wrap and White Newsprint Packing Paper.',
    cta: 'Shop Packing Supplies',
    href: '#packing-supplies',
  },
];

export function ShopByCategory() {
  return (
    <section id="shop" className="relative py-16 lg:py-24 bg-white scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-label mb-4 block">Where to Start</span>
          <h2 className="heading-section mb-6">
            Shop by <span className="text-[#a02135]">Category</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            Pick a ready-made bundle for your home size, or build your own order box by box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group flex flex-col bg-[#F3F3F1] rounded-3xl p-7 lg:p-8 hover:bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#a02135] rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                <category.icon
                  className="w-7 h-7 text-white group-hover:text-[#0A0A0A] transition-colors"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-[#0A0A0A] mb-3 group-hover:text-white transition-colors">
                {category.title}
              </h3>

              <p className="text-base font-semibold text-[#a02135] mb-3 group-hover:text-[#c41e46] transition-colors">
                {category.lead}
              </p>

              <p className="text-gray-600 mb-7 group-hover:text-gray-300 transition-colors leading-relaxed flex-1">
                {category.description}
              </p>

              {/* Rendered as a span — the whole card is the link */}
              <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start bg-[#151735] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full group-hover:bg-[#a02135] transition-colors">
                {category.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
