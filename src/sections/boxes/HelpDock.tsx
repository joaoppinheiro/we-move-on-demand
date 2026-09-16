import { useState } from 'react';
import { HelpCircle, Phone, MessageSquare, X } from 'lucide-react';
import { smsLink, SMS_PHONE_TEL, SMS_PHONE_LABEL } from '@/lib/constants';

const HELP_SMS_BODY =
  "Hi! I need help choosing moving boxes or a reusable bin rental package.";

/**
 * Persistent Call/Text help control for the box shop.
 *
 * Deliberately NOT a modal or an on-load pop-up: it renders collapsed as a
 * single small pill and only opens on click, so it stays available across the
 * shop and rental sections without interrupting anyone.
 *
 * Bottom-right is free on this page — the cart button lives in the sticky
 * header — and z-30 keeps it under the header (z-40) and the cart sheet (z-50)
 * rather than floating over them.
 */
export function HelpDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-30 print:hidden">
      {open ? (
        <div className="w-[min(20rem,calc(100vw-2.5rem))] bg-white rounded-3xl shadow-2xl border border-gray-200 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <p className="font-bold text-[#0A0A0A] leading-snug">Questions? We're Here to Help.</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help"
              className="w-8 h-8 -mt-1 -mr-1 flex items-center justify-center rounded-full text-gray-400 hover:text-[#a02135] hover:bg-[#F3F3F1] transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            Not sure which boxes, bins or package you need? Our moving team can help.
          </p>

          <div className="flex flex-col gap-2.5">
            <a
              href={SMS_PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#c41e46] transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call Us
            </a>
            <a
              href={smsLink(HELP_SMS_BODY)}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#F3F3F1] transition-colors"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Text Us
            </a>
          </div>

          <p className="mt-4 text-center text-sm font-bold text-[#0A0A0A] tabular-nums">
            <a href={SMS_PHONE_TEL} className="hover:text-[#a02135] transition-colors">
              {SMS_PHONE_LABEL}
            </a>
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-[#151735] text-white text-[11px] font-bold uppercase tracking-widest pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:bg-[#a02135] transition-colors"
        >
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
          Need Help?
        </button>
      )}
    </div>
  );
}
