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
};

export const items: CatalogItem[] = [
  // ---------------------------------------------------------------- Boxes ---
  {
    id: 'box-small',
    name: 'Small Box',
    price: 1.72,
    category: 'boxes',
    note: 'Books, canned goods, small heavy items',
  },
  {
    id: 'box-medium',
    name: 'Medium Box',
    price: 2.86,
    category: 'boxes',
    note: 'The all-purpose box — kitchen, toys, decor',
  },
  {
    id: 'box-large',
    name: 'Large Box',
    price: 3.24,
    category: 'boxes',
    note: 'Linens, pillows, lampshades',
  },
  {
    id: 'box-xlarge',
    name: 'X-Large Box',
    price: 4.22,
    category: 'boxes',
    note: 'Comforters, large bulky-but-light items',
  },
  {
    id: 'box-dish-pack',
    name: 'Dish Pack Box',
    price: 5.45,
    category: 'boxes',
    note: 'Double-wall protection for dishes and glassware',
  },
  {
    id: 'box-wardrobe-18',
    name: 'Wardrobe Box 18"',
    price: 14.9,
    category: 'boxes',
    note: 'Hang clothes straight from the closet',
  },
  {
    id: 'box-wardrobe-24',
    name: 'Wardrobe Box 24"',
    price: 18.7,
    category: 'boxes',
    note: 'Extra-wide wardrobe for longer garments',
  },
  {
    id: 'box-mirror-pack',
    name: 'Mirror Pack / Picture Box (4 Pieces)',
    price: 8.26,
    category: 'boxes',
    note: 'Adjustable 4-piece kit for mirrors, art and frames',
  },

  // -------------------------------------------------- Office & File Boxes ---
  {
    id: 'box-banker-record',
    name: 'Banker Box with Lid (Record Size)',
    price: 3.8,
    category: 'office',
    note: 'Letter/record files, archives and documents',
  },
  {
    id: 'box-banker-legal',
    name: 'Banker Box with Lid (Legal Size)',
    price: 4.1,
    category: 'office',
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
    note: 'Small bubble — fragile surfaces and scratch protection',
  },
  {
    id: 'supply-bubble-small-24',
    name: 'Bubble Wrap Small 24"',
    price: 31.4,
    category: 'supplies',
    note: 'Small bubble, double-width roll',
  },
  {
    id: 'supply-bubble-large-12',
    name: 'Bubble Wrap Large 12"',
    price: 23.3,
    category: 'supplies',
    note: 'Large bubble — impact cushioning for bulky items',
  },
  {
    id: 'supply-bubble-large-24',
    name: 'Bubble Wrap Large 24"',
    price: 46.45,
    category: 'supplies',
    note: 'Large bubble, double-width roll',
  },
  {
    id: 'supply-paper-10lb',
    name: 'White Packing Paper 10lb',
    price: 14.5,
    category: 'supplies',
    note: 'Ink-free newsprint — wrap, cushion and fill voids',
  },
  {
    id: 'supply-paper-25lb',
    name: 'White Packing Paper 25lb',
    price: 29.0,
    category: 'supplies',
    note: 'Ink-free newsprint — bulk pack',
  },
  // TODO: preço avulso 50lb/75lb pendente. The 50lb and 75lb packing paper
  // weights currently exist ONLY inside the pre-configured bundles (3BR / 4BR)
  // — do not add them here until standalone pricing is confirmed.
];

export function itemsByCategory(category: ItemCategory): CatalogItem[] {
  return items.filter((item) => item.category === category);
}
