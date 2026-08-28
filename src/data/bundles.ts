/**
 * Moving box bundle catalog.
 *
 * Data lives here (not inside components) so pricing can be updated without
 * touching UI. Prices are USD, tax excluded.
 *
 * NOTE: "3 Bedroom Deluxe" carries a proportionally smaller discount than the
 * other bundles. This is intentional and confirmed by the client — do not
 * "fix" it to match the pattern of the other Deluxe tiers.
 */

export type Bundle = {
  id: string;
  name: string;
  /** Total number of boxes in the bundle. */
  boxCount: number;
  /** Short line rendered next to the name, e.g. "44 Boxes + Packing Supplies". */
  summary: string;
  price: number;
  includes: string[];
  /** Rough home size this bundle is sized for — used as a card eyebrow. */
  bestFor: string;
  /** Deluxe tiers add specialty boxes (dish packs, wardrobes) + more paper. */
  deluxe: boolean;
};

export const bundles: Bundle[] = [
  {
    id: 'bundle-college',
    name: 'College Moving Bundle',
    boxCount: 10,
    summary: '10 Boxes + Packing Supplies',
    price: 53.5,
    bestFor: 'Dorm / Studio',
    deluxe: false,
    includes: [
      '2 Small Boxes',
      '5 Medium Boxes',
      '2 Large Boxes',
      '1 Wardrobe Box 18"',
      '1 Small Bubble Wrap',
      'Tape 3 Pack',
    ],
  },
  {
    id: 'bundle-1br',
    name: '1 Bedroom Bundle',
    boxCount: 27,
    summary: '27 Boxes + Packing Supplies',
    price: 93.32,
    bestFor: '1 Bedroom',
    deluxe: false,
    includes: [
      '10 Small Boxes',
      '10 Medium Boxes',
      '5 Large Boxes',
      '2 X-Large Boxes',
      '10lb White Packing Paper',
      '1 Small Bubble Wrap',
      'Tape 6 Pack',
    ],
  },
  {
    id: 'bundle-1br-deluxe',
    name: '1 Bedroom Deluxe Bundle',
    boxCount: 30,
    summary: '30 Boxes + Packing Supplies',
    price: 135.6,
    bestFor: '1 Bedroom',
    deluxe: true,
    includes: [
      '10 Small Boxes',
      '10 Medium Boxes',
      '5 Large Boxes',
      '2 X-Large Boxes',
      '1 Dish Pack',
      '2 Wardrobe Boxes 18"',
      '25lb White Packing Paper',
      '1 Small Bubble Wrap',
      'Tape 6 Pack',
    ],
  },
  {
    id: 'bundle-2br',
    name: '2 Bedroom Bundle',
    boxCount: 39,
    summary: '39 Boxes + Packing Supplies',
    price: 142.05,
    bestFor: '2 Bedrooms',
    deluxe: false,
    includes: [
      '15 Small Boxes',
      '15 Medium Boxes',
      '7 Large Boxes',
      '2 X-Large Boxes',
      '25lb White Packing Paper',
      '1 Small Bubble Wrap',
      'Tape 9 Pack',
    ],
  },
  {
    id: 'bundle-2br-deluxe',
    name: '2 Bedroom Deluxe Bundle',
    boxCount: 44,
    summary: '44 Boxes + Packing Supplies',
    price: 192.09,
    bestFor: '2 Bedrooms',
    deluxe: true,
    includes: [
      '15 Small Boxes',
      '15 Medium Boxes',
      '7 Large Boxes',
      '2 X-Large Boxes',
      '2 Dish Packs',
      '3 Wardrobe Boxes 18"',
      '25lb White Packing Paper',
      '1 Small Bubble Wrap',
      'Tape 9 Pack',
    ],
  },
  {
    id: 'bundle-3br',
    name: '3 Bedroom Bundle',
    boxCount: 60,
    summary: '60 Boxes + Packing Supplies',
    price: 227.23,
    bestFor: '3 Bedrooms',
    deluxe: false,
    includes: [
      '20 Small Boxes',
      '20 Medium Boxes',
      '15 Large Boxes',
      '5 X-Large Boxes',
      '50lb White Packing Paper',
      '1 Small Bubble Wrap',
      'Tape 12 Pack',
    ],
  },
  {
    id: 'bundle-3br-deluxe',
    name: '3 Bedroom Deluxe Bundle',
    boxCount: 69,
    summary: '69 Boxes + Packing Supplies',
    price: 342.16,
    bestFor: '3 Bedrooms',
    deluxe: true,
    includes: [
      '20 Small Boxes',
      '20 Medium Boxes',
      '15 Large Boxes',
      '5 X-Large Boxes',
      '4 Dish Packs',
      '5 Wardrobe Boxes 18"',
      '50lb White Packing Paper',
      '1 Large Bubble Wrap',
      'Tape 12 Pack',
    ],
  },
  {
    id: 'bundle-4br',
    name: '4 Bedroom Bundle',
    boxCount: 94,
    summary: '94 Boxes + Packing Supplies',
    price: 341.3,
    bestFor: '4 Bedrooms',
    deluxe: false,
    includes: [
      '25 Small Boxes',
      '30 Medium Boxes',
      '29 Large Boxes',
      '10 X-Large Boxes',
      '75lb White Packing Paper',
      '1 Large Bubble Wrap',
      'Tape 18 Pack',
    ],
  },
  {
    id: 'bundle-4br-deluxe',
    name: '4 Bedroom Deluxe Bundle',
    boxCount: 105,
    summary: '105 Boxes + Packing Supplies',
    price: 446.28,
    bestFor: '4 Bedrooms',
    deluxe: true,
    includes: [
      '25 Small Boxes',
      '30 Medium Boxes',
      '29 Large Boxes',
      '10 X-Large Boxes',
      '5 Dish Packs',
      '6 Wardrobe Boxes 18"',
      '75lb White Packing Paper',
      '1 Large Bubble Wrap',
      'Tape 18 Pack',
    ],
  },
];
