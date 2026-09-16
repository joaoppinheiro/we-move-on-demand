import { ShoppingBag } from 'lucide-react';

/**
 * "For purchase" marker for every card in the BUY path (bundles, individual
 * boxes, office/file boxes, packing supplies).
 *
 * The page now sells two things that look alike on a card — cardboard you buy
 * and keep, and reusable bins you rent and give back. This badge is the visual
 * tell on the purchase side; the rental cards carry the 7-day rental pill
 * instead. Wording is fixed by the client, so it lives here in one place.
 */
export function PurchaseBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 bg-[#151735]/[0.07] text-[#151735] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${className}`}
    >
      <ShoppingBag className="w-3 h-3" aria-hidden="true" />
      For Purchase — Keep or Recycle
    </span>
  );
}
