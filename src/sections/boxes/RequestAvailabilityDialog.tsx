import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, MessageSquare, Phone, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCart, formatPrice } from '@/lib/cart';
import { useAvailabilityRequest } from '@/hooks/useAvailabilityRequest';
import { PHONE_TEL, smsLink, IS_SMS_CONFIGURED } from '@/lib/constants';
import { REUSABLE_SMS_BODY } from '@/data/reusable';

const inputCls =
  'w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#0A0A0A] placeholder:text-gray-500 focus:outline-none focus:border-[#a02135] focus:ring-2 focus:ring-[#a02135]/10 transition-all disabled:opacity-60';

type RequestAvailabilityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Availability request form — REUSABLE BOXES ONLY.
 *
 * Reusable boxes have no online price and depend on current inventory, so a
 * cart containing them can't go through checkout. This form collects the
 * customer's contact details plus the cart contents for manual confirmation.
 *
 * Do NOT reuse this as a fallback for ordinary carts (bundles + individual
 * items). Those must go through automated Stripe checkout — see the disabled
 * checkout button in CartSheet.tsx and the stub in api/_checkout-stub.ts.
 */
export function RequestAvailabilityDialog({ open, onOpenChange }: RequestAvailabilityDialogProps) {
  const { lines, clear } = useCart();
  const [fields, setFields] = useState({ name: '', phone: '', email: '', notes: '' });
  const { submit, isLoading, state, errorMessage, reset } = useAvailabilityRequest(
    'moving-boxes-reusable-availability'
  );

  const canSubmit = fields.name.trim().length >= 2 && fields.phone.trim().length >= 7;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || lines.length === 0) return;
    await submit(
      fields,
      lines.map((l) => ({ name: l.name, qty: l.qty, kind: l.kind, price: l.price }))
    );
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      // Only wipe the cart after a confirmed send, so a failed attempt keeps
      // the customer's selection intact for a retry.
      if (state === 'success') clear();
      reset();
      setFields({ name: '', phone: '', email: '', notes: '' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#F3F3F1] border-gray-200 text-[#0A0A0A] max-w-lg max-h-[90vh] overflow-y-auto">
        {state === 'success' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
                </div>
                Request Sent!
              </DialogTitle>
              <DialogDescription className="sr-only">
                Your request was sent successfully.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Thank you, {fields.name.trim()}! Our team will confirm availability for your requested
                quantities and get back to you at {fields.phone.trim()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PHONE_TEL}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#c41e46] transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Now
                </a>
                {/* Hidden until SMS_PHONE_NUMBER is set — no dead sms: links. */}
                {IS_SMS_CONFIGURED && (
                  <a
                    href={smsLink(REUSABLE_SMS_BODY)}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#a02135]/30 text-[#a02135] text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#a02135]/10 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    Text Us
                  </a>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Request Availability</DialogTitle>
              <DialogDescription className="text-gray-600">
                Reusable boxes are confirmed against current inventory. Send us your details and we'll
                confirm availability for your requested quantities.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                placeholder="Full name *"
                aria-label="Full name"
                disabled={isLoading}
                className={inputCls}
              />
              <input
                type="tel"
                required
                value={fields.phone}
                onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                placeholder="Phone *"
                aria-label="Phone number"
                disabled={isLoading}
                className={inputCls}
              />
              <input
                type="email"
                value={fields.email}
                onChange={(e) => setFields({ ...fields, email: e.target.value })}
                placeholder="Email"
                aria-label="Email address"
                disabled={isLoading}
                className={inputCls}
              />
              <textarea
                value={fields.notes}
                onChange={(e) => setFields({ ...fields, notes: e.target.value })}
                placeholder="Anything else we should know? (delivery ZIP, move date, etc.)"
                aria-label="Additional notes"
                rows={3}
                disabled={isLoading}
                className={`${inputCls} resize-none`}
              />

              {/* Read-only summary of what is being requested */}
              <div className="bg-white rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Your Request ({lines.length} {lines.length === 1 ? 'line' : 'lines'})
                </p>
                <ul className="space-y-2">
                  {lines.map((line) => (
                    <li key={line.id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-gray-600">
                        <strong className="text-[#0A0A0A]">{line.qty}×</strong> {line.name}
                      </span>
                      <span className="text-gray-500 flex-shrink-0 tabular-nums">
                        {line.price === null ? 'On request' : formatPrice(line.price * line.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {state === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !canSubmit || lines.length === 0}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#c41e46] transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Request
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-500 text-center pt-1">
                No payment is taken now. We'll confirm availability and pricing first.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
