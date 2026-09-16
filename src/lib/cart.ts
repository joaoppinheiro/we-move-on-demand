import { createContext, useContext } from 'react';

/**
 * Cart types, context and helpers for /moving-boxes.
 *
 * Split from the provider component (see CartProvider.tsx) so this module
 * exports no components — keeps react-refresh happy and lets any consumer
 * import the hook without pulling in the provider.
 *
 * The cart is client-side only and deliberately not persisted: the whole box
 * shop lives on a single page, so cart state only needs to survive scrolling,
 * not navigation.
 */

/**
 * 'bundle' and 'item' are bought and kept; 'rental' is a reusable moving bin
 * package rented for a fixed term and picked back up. Every kind carries a real
 * price — there is no priced-on-request line anymore.
 */
export type CartLineKind = 'bundle' | 'item' | 'rental';

export type CartLine = {
  id: string;
  name: string;
  kind: CartLineKind;
  price: number;
  /** Short descriptor shown under the name, e.g. "44 Boxes + Packing Supplies". */
  meta?: string;
  qty: number;
};

export type NewCartLine = Omit<CartLine, 'qty'>;

export type CartContextValue = {
  lines: CartLine[];
  /** Total units across all lines (what the header badge shows). */
  itemCount: number;
  /** Sum of every line, rounded to cents. */
  subtotal: number;
  /** True when at least one reusable bin rental package is in the cart. */
  hasRental: boolean;
  isOpen: boolean;
  add: (line: NewCartLine, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

/** Hard cap per line so a stray keypress can't create an absurd order. */
export const MAX_QTY = 999;

export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a <CartProvider>');
  return ctx;
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
