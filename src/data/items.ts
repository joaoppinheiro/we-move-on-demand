/**
 * Individually sold boxes, office/file boxes and packing supplies.
 *
 * Grouped by `category` so the three shop sections on /moving-boxes are driven
 * from this one list. Prices are USD, tax excluded, per unit as described in
 * the item name (e.g. "Packing Tape (6 Pack)" is one price for the 6 pack).
 */

export type ItemCategory = 'boxes' | 'office' | 'supplies';

export type CatalogItem = {
  id: string;
  name: string;
  price: number;
  category: ItemCategory;
  /** Optional helper line under the name. */
  note?: string;
  /**
   * Public path to the product photo, e.g. '/images/products/small-box.jpg'.
   * Omit when there is no photo yet — ProductImage renders a placeholder.
   * See ProductImage.tsx for the swap-in steps.
   */
  image?: string;
};

export const items: CatalogItem[] = [
  // ---------------------------------------------------------------- Boxes ---
  {
    id: 'box-small',
    name: 'Small Box',
    price: 1.72,
    category: 'boxes',
    image: '/images/products/small-box.jpg',
    note: 'Books, canned goods, small heavy items',
  },
  {
    id: 'box-medium',
    name: 'Medium Box',
    price: 2.86,
    category: 'boxes',
    image: '/images/products/medium-box.jpg',
    note: 'The all-purpose box — kitchen, toys, decor',
  },
  {
    id: 'box-large',
    name: 'Large Box',
    price: 3.24,
    category: 'boxes',
    image: '/images/products/large-box.jpg',
    note: 'Linens, pillows, lampshades',
  },
  {
    id: 'box-xlarge',
    name: 'X-Large Box',
    price: 4.22,
    category: 'boxes',
    image: '/images/products/x-large-box.jpg',
    note: 'Comforters, large bulky-but-light items',
  },
  {
    id: 'box-dish-pack',
    name: 'Dish Pack Box',
    price: 5.45,
    category: 'boxes',
    image: '/images/products/dish-pack-box.jpg',
    note: 'Double-wall protection for dishes and glassware',
  },
  {
    id: 'box-wardrobe-18',
    name: 'Wardrobe Box 18"',
    price: 14.9,
    category: 'boxes',
    image: '/images/products/wardrobe-box-18.jpg',
    note: 'Hang clothes straight from the closet',
  },
  {
    id: 'box-wardrobe-24',
    name: 'Wardrobe Box 24"',
    price: 18.7,
    category: 'boxes',
    image: '/images/products/wardrobe-box-24.jpg',
    note: 'Extra-wide wardrobe for longer garments',
  },
  {
    id: 'box-mirror-pack',
    name: 'Mirror Pack / Picture Box (4 Pieces)',
    price: 8.26,
    category: 'boxes',
    image: '/images/products/mirror-pack.jpg',
    note: 'Adjustable 4-piece kit for mirrors, art and frames',
  },

  // -------------------------------------------------- Office & File Boxes ---
  {
    id: 'box-banker-record',
    name: 'Banker Box with Lid (Record Size)',
    price: 3.8,
    category: 'office',
    image: '/images/products/banker-box-record.jpg',
    note: 'Letter/record files, archives and documents',
  },
  {
    id: 'box-banker-legal',
    name: 'Banker Box with Lid (Legal Size)',
    price: 4.1,
    category: 'office',
    image: '/images/products/banker-box-legal.jpg',
    note: 'Legal-size files and folders',
  },

  // ------------------------------------------------------ Packing Supplies ---
  {
    id: 'supply-tape-6',
    name: 'Packing Tape (6 Pack)',
    price: 8.34,
    category: 'supplies',
    note: 'Heavy-duty carton sealing tape',
  },
  {
    id: 'supply-bubble-small-12',
    name: 'Bubble Wrap Small 12"',
    price: 16.5,
    category: 'supplies',
    image: '/images/products/bubble-wrap-small-12.jpg',
    note: 'Small bubble — fragile surfaces and scratch protection',
  },
  {
    id: 'supply-bubble-small-24',
    name: 'Bubble Wrap Small 24"',
    price: 31.4,
    category: 'supplies',
    image: '/images/products/bubble-wrap-small-24.jpg',
    note: 'Small bubble, double-width roll',
  },
  {
    id: 'supply-bubble-large-12',
    name: 'Bubble Wrap Large 12"',
    price: 23.3,
    category: 'supplies',
    image: '/images/products/bubble-wrap-large-12.jpg',
    note: 'Large bubble — impact cushioning for bulky items',
  },
  {
    id: 'supply-bubble-large-24',
    name: 'Bubble Wrap Large 24"',
    price: 46.45,
    category: 'supplies',
    image: '/images/products/bubble-wrap-large-24.jpg',
    note: 'Large bubble, double-width roll',
  },
  {
    id: 'supply-paper-10lb',
    name: 'White Packing Paper 10lb',
    price: 14.5,
    category: 'supplies',
    image: '/images/products/white-packing-paper-10lb.jpg',
    note: 'Ink-free newsprint — wrap, cushion and fill voids',
  },
  {
    id: 'supply-paper-25lb',
    name: 'White Packing Paper 25lb',
    price: 29.0,
    category: 'supplies',
    image: '/images/products/white-packing-paper-25lb.jpg',
    note: 'Ink-free newsprint — bulk pack',
  },
  // TODO: preço avulso 50lb/75lb pendente. The 50lb and 75lb packing paper
  // weights currently exist ONLY inside the pre-configured bundles (3BR / 4BR)
  // — do not add them here until standalone pricing is confirmed.
];

export function itemsByCategory(category: ItemCategory): CatalogItem[] {
  return items.filter((item) => item.category === category);
}

/**
 * Looks up items by id, in the order the ids were given, skipping ids that
 * don't exist. Used by the rental section's cross-sell so it can reference
 * cardboard products by id instead of restating their names and prices.
 */
export function itemsByIds(ids: readonly string[]): CatalogItem[] {
  return ids
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is CatalogItem => item !== undefined);
}

/** Anchor of the shop section a given item lives in, for in-page links. */
export const categoryAnchors: Record<ItemCategory, string> = {
  boxes: '#boxes',
  office: '#office-boxes',
  supplies: '#packing-supplies',
};
