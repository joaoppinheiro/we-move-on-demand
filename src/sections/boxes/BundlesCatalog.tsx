import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { bundles, bundleSizeFilters, type BundleSize } from '@/data/bundles';
import { formatPrice } from '@/lib/cart';
import { AddToCartButton } from './AddToCartButton';

type Filter = BundleSize | 'all';

export function BundlesCatalog() {
  const [filter, setFilter] = useState<Filter>('all');

  // Filtering by move size keeps the standard and Deluxe tiers of the same size
  // together, since they share a `size` value.
  const visible = filter === 'all' ? bundles : bundles.filter((b) => b.size === filter);

  return (
    <section id="bundles" className="relative py-16 lg:py-24 bg-[#F3F3F1] scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-label mb-4 block">Ready-to-Go</span>
          <h2 className="heading-section mb-6">
            Moving Box <span className="text-[#a02135]">Bundles</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            Everything for a move of your size in one order. Deluxe options add specialty boxes and
            extra packing materials.
          </p>
        </div>

        {/* Size filter. Radix ToggleGroup gives roving-tabindex arrow-key
            navigation and aria-pressed state for free. */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <ToggleGroup
            type="single"
            value={filter}
            /* Radix emits '' when the active item is clicked again — fall back
               to 'all' so the grid can never end up empty. */
            onValueChange={(value) => setFilter((value as Filter) || 'all')}
            spacing={2}
            aria-label="Filter bundles by move size"
            className="flex-wrap justify-center gap-2 w-full max-w-3xl bg-transparent rounded-none"
          >
            {bundleSizeFilters.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                aria-label={`Show ${option.label} bundles`}
                className="h-auto rounded-full border border-gray-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-600 shadow-none transition-colors hover:bg-[#a02135]/10 hover:text-[#a02135] focus-visible:ring-2 focus-visible:ring-[#a02135]/40 data-[state=on]:bg-[#a02135] data-[state=on]:text-white data-[state=on]:border-[#a02135]"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Announces the result of changing the filter to screen readers. */}
        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? 'bundle' : 'bundles'} shown
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((bundle) => (
            <article
              key={bundle.id}
              className={`flex flex-col bg-white rounded-3xl p-6 lg:p-7 border-2 transition-shadow hover:shadow-xl ${
                bundle.deluxe ? 'border-[#a02135]/30' : 'border-transparent'
              }`}
            >
              {/* Eyebrow */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {bundle.bestFor}
                </span>
                {bundle.deluxe && (
                  <span className="inline-flex items-center gap-1.5 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    Deluxe
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#0A0A0A] mb-1.5 leading-tight">{bundle.name}</h3>

              <p className="text-sm font-semibold text-gray-500 mb-4">{bundle.summary}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-bold text-[#a02135] tracking-tight">
                  {formatPrice(bundle.price)}
                </span>
                <span className="text-xs text-gray-400">
                  {bundle.boxCount} {bundle.boxCount === 1 ? 'box' : 'boxes'}
                </span>
              </div>

              {/* Contents */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                What's Included
              </p>
              <ul className="space-y-2 mb-7 flex-1">
                {bundle.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#a02135] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <AddToCartButton
                line={{
                  id: bundle.id,
                  name: bundle.name,
                  kind: 'bundle',
                  price: bundle.price,
                  meta: bundle.summary,
                }}
                variant={bundle.deluxe ? 'primary' : 'dark'}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
