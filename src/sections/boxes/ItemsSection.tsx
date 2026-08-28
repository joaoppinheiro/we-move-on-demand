import { useState } from 'react';
import { formatPrice } from '@/lib/cart';
import type { CatalogItem } from '@/data/items';
import { QuantityStepper } from './QuantityStepper';
import { AddToCartButton } from './AddToCartButton';
import { ProductImage } from './ProductImage';

function ItemCard({ item, variant }: { item: CatalogItem; variant: 'primary' | 'dark' }) {
  const [qty, setQty] = useState(1);

  return (
    <article className="flex flex-col bg-white rounded-3xl p-6 border-2 border-transparent hover:shadow-xl transition-shadow">
      <ProductImage src={item.image} alt={item.name} />

      <h3 className="text-lg font-bold text-[#0A0A0A] leading-tight mb-2">{item.name}</h3>

      {/* flex-1 wrapper (not the <p>) so cards without a note still align */}
      <div className="flex-1 mb-5">
        {item.note && <p className="text-sm text-gray-500 leading-relaxed">{item.note}</p>}
      </div>

      <div className="flex items-baseline gap-1.5 mb-5">
        <span className="text-2xl font-bold text-[#a02135] tracking-tight">{formatPrice(item.price)}</span>
        <span className="text-xs text-gray-400">each</span>
      </div>

      <div className="flex flex-col gap-3">
        <QuantityStepper
          value={qty}
          onChange={setQty}
          label={`Quantity of ${item.name}`}
        />
        <AddToCartButton
          line={{ id: item.id, name: item.name, kind: 'item', price: item.price }}
          qty={qty}
          variant={variant}
          onAdded={() => setQty(1)}
        />
      </div>
    </article>
  );
}

type ItemsSectionProps = {
  id: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  items: CatalogItem[];
  background: 'white' | 'gray';
  /** Extra note rendered under the grid (e.g. cross-sell hint for office moves). */
  footnote?: string;
  buttonVariant?: 'primary' | 'dark';
};

/**
 * Shared layout for the three "shop individual products" sections (boxes,
 * office/file boxes, packing supplies). One component driven by data keeps the
 * three catalogs visually identical and the markup in one place.
 */
export function ItemsSection({
  id,
  label,
  title,
  titleAccent,
  description,
  items,
  background,
  footnote,
  buttonVariant = 'dark',
}: ItemsSectionProps) {
  return (
    <section
      id={id}
      className={`relative py-16 lg:py-24 scroll-mt-32 overflow-hidden ${
        background === 'white' ? 'bg-white' : 'bg-[#F3F3F1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-label mb-4 block">{label}</span>
          <h2 className="heading-section mb-6">
            {title} <span className="text-[#a02135]">{titleAccent}</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} variant={buttonVariant} />
          ))}
        </div>

        {footnote && (
          <p className="mt-10 text-center text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
