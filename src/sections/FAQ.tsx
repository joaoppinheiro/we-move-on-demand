import { useState } from 'react';
import { ChevronDown, Phone, Mail } from 'lucide-react';

const faqs = [
  {
    question: 'How much does a typical move cost?',
    answer: 'The cost of your move depends on several factors including distance, volume of items, and any additional services like packing. We offer free estimates with no hidden fees. Call us at (561) 212-7570 for a personalized quote.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes! We Move On Demand is fully licensed and insured. Our Florida registration number is IM1733. Your belongings are protected throughout the entire moving process.',
  },
  {
    question: 'Do you offer same-day moving services?',
    answer: 'Absolutely! We understand that sometimes moves happen unexpectedly. We offer same-day and emergency moving services throughout Florida, subject to availability.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the entire state of Florida. Whether you\'re moving locally within West Palm Beach, across the state to Miami or Orlando, or anywhere in between, we\'ve got you covered.',
  },
  {
    question: 'Do you provide packing materials?',
    answer: 'Yes, we provide all necessary packing materials including boxes, tape, bubble wrap, and protective blankets. We can also handle the packing for you with our full-service option.',
  },
  {
    question: 'How do I prepare for my move?',
    answer: 'We recommend decluttering before the move, labeling boxes by room, and keeping important documents with you. Our team will provide a detailed checklist when you book your move.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit cards (Visa, MasterCard, American Express), and bank transfers. Payment is typically due upon completion of the move.',
  },
  {
    question: 'Can I track my belongings during the move?',
    answer: 'Yes! For long-distance moves, we provide real-time tracking so you always know where your belongings are. You\'ll also have direct contact with your moving coordinator.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 bg-[#F3F3F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header - Single Column */}
        <div className="text-center mb-10">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-4 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Frequently Asked <span className="text-[#a02135]">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, 
            feel free to reach out to us directly.
          </p>
        </div>

        {/* FAQ Items - Single Column */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#0A0A0A] font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#a02135] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA - Below FAQs */}
        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-3xl p-6 shadow-sm text-center">
          <p className="text-[#0A0A0A] font-bold mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <a
              href="tel:5612127570"
              className="flex items-center gap-2 text-gray-600 hover:text-[#a02135] transition-colors"
            >
              <Phone className="w-5 h-5" />
              (561) 212-7570
            </a>
            <a
              href="mailto:move@wemoveondemand.com"
              className="flex items-center gap-2 text-gray-600 hover:text-[#a02135] transition-colors"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
