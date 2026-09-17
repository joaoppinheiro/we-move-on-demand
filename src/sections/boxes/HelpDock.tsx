import { MessageSquare } from 'lucide-react';
import { shopSmsLink } from '@/lib/constants';

const HELP_SMS_BODY =
  "Hi! I need help choosing moving boxes or a reusable bin rental package.";

/**
 * Persistent "Text Our Team" control for the box shop.
 *
 * A single sms: link rather than a disclosure panel or a pop-up: one tap opens
 * the messaging app with the body pre-filled, which is the fastest path to a
 * human and needs no open/close state. Calling is still one tap away in the
 * shop header and the delivery bar.
 *
 * Bottom-right is free on this page — the cart button lives in the sticky
 * header — and z-30 keeps it under the header (z-40) and the cart sheet (z-50)
 * rather than floating over them.
 */
export function HelpDock() {
  return (
    <div className="fixed bottom-5 right-5 z-30 print:hidden">
      <a
        href={shopSmsLink(HELP_SMS_BODY)}
        className="inline-flex items-center gap-2 bg-[#151735] text-white text-[11px] font-bold uppercase tracking-widest pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:bg-[#a02135] transition-colors"
      >
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
        Text Our Team
      </a>
    </div>
  );
}
