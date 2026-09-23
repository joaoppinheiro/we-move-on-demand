import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { rentalFaqs, type RentalFaq, type RentalKind } from '@/data/rentals';

/**
 * Per-program accent for the comparison headings. Literal class strings in a
 * static map so Tailwind sees them at build time, same as BinRentals.tsx.
 */
const comparisonAccents: Record<RentalKind, string> = {
  totes: 'text-[#a02135]',
  crates: 'text-[#2f5fb8]',
};

/**
 * Side-by-side tote/crate comparison inside an answer. A plain two-column list
 * rather than a table: it collapses to one column on narrow screens without any
 * of the overflow handling a real table would need.
 */
function FaqComparison({ comparison }: { comparison: NonNullable<RentalFaq['comparison']> }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {comparison.map((column) => (
        <div key={column.label} className="bg-white rounded-xl p-5">
          <p
            className={`text-xs font-bold uppercase tracking-widest mb-3 ${comparisonAccents[column.kind]}`}
          >
            {column.label}
          </p>
          <dl className="space-y-2.5 text-sm leading-relaxed">
            {column.points.map((point) => (
              <div key={point.label}>
                <dt className="inline font-bold text-[#0A0A0A]">{point.label}: </dt>
                <dd className="inline text-gray-600">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/**
 * Rental FAQ — static content, no logic.
 *
 * Built on the design system's Radix accordion (src/components/ui/accordion)
 * rather than the hand-rolled open/close in src/sections/FAQ.tsx, so keyboard
 * navigation and aria-expanded come for free. Questions and answers live in
 * src/data/rentals.ts with the rest of the rental content.
 */
export function RentalFAQ() {
  return (
    <section id="rental-faq" className="relative py-16 lg:py-24 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <span className="section-label mb-4 block">Rental FAQ</span>
          <h2 className="heading-section mb-5">
            Bin Rental <span className="text-[#a02135]">Questions</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            How the 7-day rental works — delivery, pickup, extensions and everything in between.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
          {rentalFaqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="bg-[#F3F3F1] rounded-2xl border-b-0 px-6"
            >
              <AccordionTrigger className="py-5 text-base font-bold text-[#0A0A0A] hover:no-underline [&>svg]:text-[#a02135]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-gray-600 leading-relaxed">
                {faq.answer}
                {faq.comparison && <FaqComparison comparison={faq.comparison} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
