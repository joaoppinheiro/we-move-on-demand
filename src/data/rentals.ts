/**
 * Reusable moving bin RENTAL program.
 *
 * Deliberately separate from the cardboard catalog (src/data/bundles.ts and
 * src/data/items.ts): those products are bought and kept, these are rented for
 * a fixed term and picked back up. Keeping the two data sets apart means the
 * checkout rules for each can diverge without cross-contaminating the other.
 *
 * Replaces the old "reusable box, price on request" concept entirely — there is
 * no priced-on-request path here, every package has a real 7-day rental price.
 *
 * Delivery eligibility is NOT redefined here. The rental section reads the same
 * ZIP list every other delivery affordance on the page uses, via
 * src/data/delivery.ts → useZipCheck.
 */

export type RentalKind = 'totes' | 'crates';

export type RentalPackage = {
  id: string;
  kind: RentalKind;
  /** Card title, e.g. "25 Totes — 1 Bedroom". */
  name: string;
  /** Number of bins in the package. */
  unitCount: number;
  /** Move size the package is sized for. Not defined by the client for crates. */
  bestFor?: string;
  /** Price for the standard RENTAL_TERM_DAYS term, USD. */
  price: number;
  /** Dollies delivered with the package, included in the price. */
  dollies: number;
  /** Flat add-on price per additional week, USD. */
  additionalWeekPrice: number;
  /** Highlighted as the recommended package. */
  popular?: boolean;
  /**
   * Public path to the product photo. Omit when there is no photo yet —
   * ProductImage renders a placeholder. See ProductImage.tsx.
   */
  image?: string;
};

/** Standard rental term for every package. */
export const RENTAL_TERM_DAYS = 7;

export type RentalProgram = {
  kind: RentalKind;
  title: string;
  /** Short client-supplied positioning line, e.g. "Heavy-Duty & Versatile". */
  positioning: string;
  /**
   * One-line "best for" tagline shown under the program title, so the two
   * programs can be told apart before reading the full description. The full
   * comparison lives in the rental FAQ — keep this to a single decisive line.
   */
  tagline: string;
  description: string;
  packages: RentalPackage[];
};

// Same photo on every tote package — it is one standard tote sold in quantity.
const TOTE_IMAGE = '/images/products/reusable-tote-red-black.jpg';

const totePackages: RentalPackage[] = [
  {
    id: 'rental-totes-15',
    kind: 'totes',
    image: TOTE_IMAGE,
    name: '15 Totes — Small Move',
    unitCount: 15,
    bestFor: 'Small Move',
    price: 129,
    dollies: 1,
    additionalWeekPrice: 25,
  },
  {
    id: 'rental-totes-25',
    kind: 'totes',
    image: TOTE_IMAGE,
    name: '25 Totes — 1 Bedroom',
    unitCount: 25,
    bestFor: '1 Bedroom',
    price: 149,
    dollies: 2,
    additionalWeekPrice: 30,
    popular: true,
  },
  {
    id: 'rental-totes-35',
    kind: 'totes',
    image: TOTE_IMAGE,
    name: '35 Totes — 2 Bedroom',
    unitCount: 35,
    bestFor: '2 Bedroom',
    price: 169,
    dollies: 2,
    additionalWeekPrice: 40,
  },
  {
    id: 'rental-totes-50',
    kind: 'totes',
    image: TOTE_IMAGE,
    name: '50 Totes — Large Move',
    unitCount: 50,
    bestFor: 'Large Move',
    price: 199,
    dollies: 3,
    additionalWeekPrice: 50,
  },
];

// NOTE: blue crate pricing is launch working pricing per client — expect
// revision after initial rental period, verify before assuming stable.
const cratePackages: RentalPackage[] = [
  {
    id: 'rental-crates-15',
    kind: 'crates',
    name: '15 Crates',
    unitCount: 15,
    price: 129,
    dollies: 1,
    additionalWeekPrice: 35,
  },
  {
    id: 'rental-crates-25',
    kind: 'crates',
    name: '25 Crates',
    unitCount: 25,
    price: 149,
    dollies: 2,
    additionalWeekPrice: 45,
  },
  {
    id: 'rental-crates-35',
    kind: 'crates',
    name: '35 Crates',
    unitCount: 35,
    price: 159,
    dollies: 2,
    additionalWeekPrice: 55,
  },
  {
    id: 'rental-crates-50',
    kind: 'crates',
    name: '50 Crates',
    unitCount: 50,
    price: 179,
    dollies: 3,
    additionalWeekPrice: 70,
  },
  {
    id: 'rental-crates-75',
    kind: 'crates',
    name: '75 Crates',
    unitCount: 75,
    price: 239,
    dollies: 4,
    additionalWeekPrice: 100,
  },
  {
    id: 'rental-crates-100',
    kind: 'crates',
    name: '100 Crates',
    unitCount: 100,
    price: 279,
    dollies: 5,
    additionalWeekPrice: 130,
  },
];

export const rentalPrograms: RentalProgram[] = [
  {
    kind: 'totes',
    title: 'Red/Black Reusable Totes',
    positioning: 'Heavy-Duty & Versatile',
    tagline: 'Best for bulky household items',
    description:
      '27-gallon reusable moving totes with separate secure snap-on lids. Best for residential moves, apartments, condos and everyday packing. Stackable up to 5 high.',
    packages: totePackages,
  },
  {
    kind: 'crates',
    title: 'Blue Professional Moving Crates',
    positioning: 'Built for Efficient Moving',
    tagline: 'Best for organized everyday packing',
    description:
      'Commercial-style reusable crates with attached/hinged lids. Approximately 27 x 17 x 12 inches. Best for organized residential moves, offices and larger projects. Stackable up to 5 high. No adhesive labels.',
    packages: cratePackages,
  },
];

/** Every rental package, both programs, in display order. */
export const rentalPackages: RentalPackage[] = rentalPrograms.flatMap((p) => p.packages);

export const RENTAL_INTRO = {
  title: 'Reusable Moving Bin Rentals',
  subtitle: 'Pack. Stack. Move. Return.',
  body:
    'Skip the cardboard. We deliver reusable moving bins before your move. Pack, move and unpack — then we pick them up.',
  pills: ['7-Day Rentals', 'Local Delivery & Pickup', 'Dollies Included'],
} as const;

/**
 * Delivery policy copy for the rental section. Wording is the client's, with
 * one rule of its own: never promise a delivery time — the window is confirmed
 * with the customer before delivery.
 */
export const RENTAL_DELIVERY_POLICY = {
  title: 'Local Delivery & Pickup Included',
  body:
    'Reusable moving bin rentals include complimentary delivery and pickup within our standard South Florida service area. Outside that area, an additional delivery/pickup fee may apply based on distance — contact us to confirm.',
} as const;

/** Footnote repeated on every rental package card. */
export const RENTAL_CARD_FOOTNOTE =
  'Complimentary delivery and pickup within our standard service area. Additional charges may apply outside the service area.';

/** Pre-filled SMS body for the rental section's Text Us affordance. */
export const RENTAL_SMS_BODY =
  "Hi! I'd like to rent reusable moving bins. Can you help me pick a package?";

/**
 * Nudge shown under the rental packages, for the customer who has read both
 * programs and still is not sure. Deliberately points at a person rather than
 * at more copy — the full tote/crate comparison is already in the FAQ.
 */
export const RENTAL_BIN_HELP_NUDGE = {
  text: 'Not sure which bin is right for your move?',
  linkLabel: 'Text our team',
  after: 'and a real person will help you choose.',
  smsBody:
    "Hi! I'm not sure whether the red/black totes or the blue crates are right for my move. Can you help me choose?",
} as const;

/**
 * Cardboard products cross-sold inside the rental section ("Need Specialty
 * Boxes Too?"). These are ids into src/data/items.ts — the names, prices and
 * notes are read from there, never copied, so the two never drift apart.
 */
export const rentalCrossSellIds = [
  'box-wardrobe-18',
  'box-dish-pack',
  'box-mirror-pack',
  'supply-paper-25lb',
  'supply-bubble-small-12',
  'supply-tape-6',
] as const;

export type RentalFaq = {
  question: string;
  answer: string;
  /**
   * Optional side-by-side comparison rendered as a short list under the answer.
   * Only the decisive points belong here — the specs (gallons, dimensions,
   * stacking height) stay in the prose answer and the program descriptions.
   */
  comparison?: {
    label: string;
    kind: RentalKind;
    points: { label: string; value: string }[];
  }[];
};

/**
 * Rental FAQ — static content, no logic. Answers stay inside what the client
 * defined (7-day term, delivery/pickup and dollies included in the service
 * area, bins stack 5 high) and avoid committing to a delivery time.
 */
export const rentalFaqs: RentalFaq[] = [
  {
    question: 'What is the difference between the red totes and blue crates?',
    answer:
      'Both are reusable, both stack up to 5 high, and both come with the dollies listed on the package. The quickest way to choose:',
    comparison: [
      {
        label: 'Red/Black Totes',
        kind: 'totes',
        points: [
          {
            label: 'Best for',
            value:
              'bulky, lightweight household items — linens, bedding, pillows, clothing, seasonal decor',
          },
          { label: 'Lid', value: 'separate, secure snap-on lid' },
          { label: 'Ideal moves', value: 'homes, apartments and condos' },
        ],
      },
      {
        label: 'Blue Crates',
        kind: 'crates',
        points: [
          {
            label: 'Best for',
            value:
              'everyday items that benefit from organized stacking — kitchenware, dishes, small appliances, books, office supplies, electronics',
          },
          { label: 'Lid', value: 'attached hinged lid, no loose lid to keep track of' },
          { label: 'Ideal moves', value: 'residential moves, offices and larger organized projects' },
        ],
      },
    ],
  },
  {
    question: 'How many bins do I need?',
    answer:
      "As a starting point: 15 bins for a small move or studio, 25 for a one-bedroom, 35 for a two-bedroom, and 50 or more for a larger home. Every home packs differently, so if you're between two packages, call or text us and we'll help you decide — you can also add cardboard boxes and packing supplies for anything that doesn't fit a bin.",
  },
  {
    question: 'How long is the rental?',
    answer:
      'Every package is a standard 7-day rental. The 7 days begin when your bins are delivered, and we come back for them at the end of the rental period. Your delivery window will be confirmed before delivery.',
  },
  {
    question: 'Can I extend my rental?',
    answer:
      'Yes. Each package lists a flat price per additional week, so you know the cost up front. Let us know before your scheduled pickup and we will extend the rental for you.',
  },
  {
    question: 'Is delivery and pickup included?',
    answer:
      'Yes. Reusable moving bin rentals include complimentary delivery and pickup within our standard South Florida service area, along with the dollies listed on your package. Outside that area, an additional delivery/pickup fee may apply based on distance — contact us to confirm.',
  },
  {
    question: 'What areas do you deliver to?',
    answer:
      "Our standard service area covers select Boca Raton, Delray Beach and Deerfield Beach ZIP codes, and you can check yours right in the rental delivery box above. If your ZIP is not on the list, that is not a no — send it to us and our team will confirm availability and any additional delivery fee for your address.",
  },
  {
    question: 'Can I rent bins if We Move On Demand is not doing my move?',
    answer:
      "Absolutely. Bin rentals stand on their own — you do not need to book a move with us to rent them. If you would like help with the move itself as well, we are happy to quote that separately.",
  },
  {
    question: 'Can I add cardboard boxes and packing supplies?',
    answer:
      'Yes. Wardrobe boxes, dish packs, mirror/picture boxes, packing paper, bubble wrap and tape can all go on the same order. Most moves end up using a mix: bins for everyday packing, specialty cardboard for hanging clothes, dishes and artwork.',
  },
  {
    question: 'Can pickup be at a different address?',
    answer:
      'In most cases, yes. Tell us the pickup address when you book so we can confirm it is within our service area. If it falls outside the standard area, an additional fee may apply based on distance.',
  },
  {
    question: 'What happens if equipment is lost or damaged?',
    answer:
      'Normal wear from a move is expected and is not charged. Bins, lids or dollies that are missing or damaged beyond normal use are charged at replacement cost, which our team will review with you. We count the equipment with you at delivery and again at pickup so there are no surprises.',
  },
  {
    question: 'Do you service apartments and high-rise buildings?',
    answer:
      'Yes — apartments, condos and high-rises are a large part of what we do, and the dollies included with every package make elevator and hallway trips much faster. Let us know the building when you book, since some require a certificate of insurance or a reserved elevator, and we will work through those details with management.',
  },
  {
    question: 'Do you offer reusable crates for office/commercial moves?',
    answer:
      'Yes. The blue professional crates were built for it: attached hinged lids, uniform stacking and no adhesive labels needed, so files and equipment stay organized in transit. For larger offices we can put together a package beyond the sizes listed here — call or text us with your headcount and timeline.',
  },
];
