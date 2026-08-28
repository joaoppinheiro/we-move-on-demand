import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  CartContext,
  MAX_QTY,
  roundCents,
  type CartContextValue,
  type CartLine,
  type NewCartLine,
} from './cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((line: NewCartLine, qty = 1) => {
    if (qty < 1) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id);
      if (existing) {
        return prev.map((l) =>
          l.id === line.id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l
        );
      }
      return [...prev, { ...line, qty: Math.min(qty, MAX_QTY) }];
    });
  }, []);

  /** qty < 1 removes the line — the stepper's min is 0 inside the cart. */
  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty < 1
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = roundCents(
      lines.reduce((sum, l) => (l.price === null ? sum : sum + l.price * l.qty), 0)
    );
    return {
      lines,
      itemCount,
      subtotal,
      hasReusable: lines.some((l) => l.kind === 'reusable'),
      hasPricedLines: lines.some((l) => l.price !== null),
      isOpen,
      add,
      setQty,
      remove,
      clear,
      openCart,
      closeCart,
      setOpen: setIsOpen,
    };
  }, [lines, isOpen, add, setQty, remove, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
