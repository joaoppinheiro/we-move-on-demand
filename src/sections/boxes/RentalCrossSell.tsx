import { ArrowRight, Package } from 'lucide-react';
import { itemsByIds, categoryAnchors } from '@/data/items';
import { rentalCrossSellIds } from '@/data/rentals';
import { formatPrice } from '@/lib/cart';

/**
 * "Need Specialty Boxes Too?" — cardboard shortcuts from inside the rental
 * path. Bins cover everyday packing; hanging clothes, dishes and artwork still
 * need specialty cardboard.
 *
 * Products are resolved by id from src/data/items.ts (see rentalCrossSellIds),
 * so nothing about them is duplicated here — each card is a shortcut to the
 * section that already sells it.
 */
export function RentalCrossSell() {
  const items = itemsByIds(rentalCrossSellIds);

  return (
    <section
      id="rental-add-ons"
      className="relative py-16 lg:py-20 bg-[#F3F3F1] scroll-mt-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="section-label mb-4 block">Add-Ons</span>
          <h2 className="heading-section mb-5">
            Need Specialty <span className="text-[#a02135]">Boxes Too?</span>
          </h2>
          <p className="paragraph-large">
            Bins handle everyday packing. Add wardrobe boxes, dish packs and protective materials
            from our cardboard shop to the same order.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={categoryAnchors[item.category]}
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 h-full"
              >
                <div className="w-11 h-11 bg-[#F3F3F1] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#a02135] transition-colors">
                  <Package
                    className="w-5 h-5 text-[#a02135] group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0A0A0A] text-sm leading-snug">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    From {formatPrice(item.price)} each
                  </p>
                </div>

                <ArrowRight
                  className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-[#a02135] transition-colors"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#boxes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#151735] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#a02135] transition-colors"
          >
            All Individual Boxes
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="#packing-supplies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors"
          >
            All Packing Supplies
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
