import { useState } from 'react';
import { Package, X, ZoomIn } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

type ProductImageProps = {
  /** Public path, e.g. '/images/products/small-box.jpg'. Omit for placeholder. */
  src?: string;
  alt: string;
  /** Card background this sits on, so the placeholder stays legible. */
  tone?: 'light' | 'dark';
};

/**
 * Product thumbnail with a built-in placeholder.
 *
 * Catalog entries without an `image` (photo not uploaded yet) render the
 * neutral placeholder below.
 *
 * The placeholder is drawn in CSS + a lucide icon on purpose — no external
 * placeholder service (picsum / via.placeholder), so nothing ships a
 * third-party URL and the page keeps working offline and in CI.
 *
 * TO SWAP IN A REAL IMAGE (no logic changes needed):
 *   1. Drop the file in `public/images/products/` — this project serves static
 *      images from `public/images/`, which is why there is no src/assets dir.
 *   2. Set `image: '/images/products/<file>.jpg'` on that item in
 *      src/data/items.ts or src/data/rentals.ts.
 * Items without an `image` keep the placeholder, so the catalog can be
 * populated one product at a time.
 *
 * Photos are shown with object-contain on a white frame: the product shots are
 * 3:2 infographics on white with text near the edges, so cropping to the 4:3
 * frame would cut labels off. Keep uploads ~1000px wide on a white background.
 *
 * Real photos open in a lightbox (click / tap) so buyers can read dimensions and
 * labels. Pointer devices get a hover overlay with a magnifier; touch devices
 * (no hover) get an always-visible magnifier badge instead. The placeholder is
 * not interactive — there is nothing to zoom into.
 */
export function ProductImage({ src, alt, tone = 'light' }: ProductImageProps) {
  const [open, setOpen] = useState(false);

  const frame = src
    ? 'bg-white border-gray-100'
    : tone === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-[#F3F3F1] border-gray-100';

  return (
    <div
      className={`relative w-full aspect-[4/3] mb-5 rounded-2xl border overflow-hidden ${frame}`}
    >
      {src ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`View larger photo: ${alt}`}
            className="group absolute inset-0 w-full h-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a02135]"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Pointer devices: darken + centered magnifier on hover/focus.
                Absolutely positioned, so the card never grows or shifts. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 hidden [@media(hover:hover)]:flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#0A0A0A] shadow-lg opacity-0 scale-90 transition-all group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                <ZoomIn className="w-5 h-5" />
              </span>
            </span>

            {/* Touch devices: no hover, so the magnifier is always shown as a badge. */}
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 right-2.5 hidden [@media(hover:none)]:flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white shadow"
            >
              <ZoomIn className="w-4 h-4" />
            </span>
          </button>

          {/* Full-viewport, transparent content so a click/tap anywhere off the
              image (the padding around it) closes; Radix handles Esc + focus. */}
          <DialogContent
            showCloseButton={false}
            aria-describedby={undefined}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
            className="inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-dvh max-w-none sm:max-w-none flex items-center justify-center p-4 pt-16 sm:p-12 bg-black/40 border-0 rounded-none shadow-none"
          >
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <img
              src={src}
              alt={alt}
              decoding="async"
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl bg-white shadow-2xl"
            />
            <DialogClose
              aria-label="Close photo"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#0A0A0A] shadow-lg transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </DialogClose>
          </DialogContent>
        </Dialog>
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
