import { useEffect, useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { useCart, type NewCartLine } from '@/lib/cart';

type AddToCartButtonProps = {
  line: NewCartLine;
  qty?: number;
  label?: string;
  /** After adding, reset the caller's quantity selector back to 1. */
  onAdded?: () => void;
  variant?: 'primary' | 'dark';
  className?: string;
};

/**
 * Add-to-cart button with inline "Added" confirmation. Inline feedback is used
 * instead of a toast so the whole flow works without an extra provider and the
 * confirmation lands where the user's finger already is on mobile.
 */
export function AddToCartButton({
  line,
  qty = 1,
  label = 'Add to Cart',
  onAdded,
  variant = 'primary',
  className = '',
}: AddToCartButtonProps) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const base =
    'w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full transition-all shadow-md active:scale-[0.98]';
  const palette = justAdded
    ? 'bg-green-600 text-white'
    : variant === 'dark'
      ? 'bg-[#151735] text-white hover:bg-[#a02135]'
      : 'bg-[#a02135] text-white hover:bg-[#c41e46]';

  return (
    <button
      type="button"
      onClick={() => {
        add(line, qty);
        setJustAdded(true);
        onAdded?.();
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setJustAdded(false), 1600);
      }}
      aria-label={`${label} — ${line.name}`}
      className={`${base} ${palette} ${className}`}
    >
      {justAdded ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          Added
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" aria-hidden="true" />
          {label}
        </>
      )}
    </button>
  );
}
