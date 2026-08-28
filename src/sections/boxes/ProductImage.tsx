import { Package } from 'lucide-react';

type ProductImageProps = {
  /** Public path, e.g. '/images/products/small-box.webp'. Omit for placeholder. */
  src?: string;
  alt: string;
  /** Card background this sits on, so the placeholder stays legible. */
  tone?: 'light' | 'dark';
};

/**
 * Product thumbnail with a built-in placeholder.
 *
 * ---------------------------------------------------------------------------
 * TODO: IMAGENS REAIS DOS PRODUTOS PENDENTES
 * ---------------------------------------------------------------------------
 * No product photography exists yet, so every catalog entry currently has no
 * `image` and renders the neutral placeholder below.
 *
 * The placeholder is drawn in CSS + a lucide icon on purpose — no external
 * placeholder service (picsum / via.placeholder), so nothing ships a
 * third-party URL and the page keeps working offline and in CI.
 *
 * TO SWAP IN A REAL IMAGE (no logic changes needed):
 *   1. Drop the file in `public/images/products/` — this project serves static
 *      images from `public/images/`, which is why there is no src/assets dir.
 *   2. Set `image: '/images/products/<file>.webp'` on that item in
 *      src/data/items.ts or src/data/reusable.ts.
 * Items without an `image` keep the placeholder, so the catalog can be
 * populated one product at a time.
 */
export function ProductImage({ src, alt, tone = 'light' }: ProductImageProps) {
  const frame =
    tone === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-[#F3F3F1] border-gray-100';

  return (
    <div
      className={`relative w-full aspect-[4/3] mb-5 rounded-2xl border overflow-hidden ${frame}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Placeholder: neutral block + generic box icon. Decorative only —
           the product name next to it already carries the meaning. */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" aria-hidden="true">
          <Package
            className={`w-8 h-8 ${tone === 'dark' ? 'text-white/25' : 'text-gray-300'}`}
          />
          <span
            className={`text-[9px] font-bold uppercase tracking-widest ${
              tone === 'dark' ? 'text-white/25' : 'text-gray-300'
            }`}
          >
            Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}
