import { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Info,
  CreditCard,
  MessageSquare,
  ArrowRight,
  Truck,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCart, formatPrice } from '@/lib/cart';
import {
  FREE_DELIVERY_THRESHOLD,
  LOCAL_DELIVERY_FEE,
} from '@/data/delivery';
import { smsLink, IS_SMS_CONFIGURED, SHOW_REUSABLE_BOXES } from '@/lib/constants';
import { REUSABLE_SMS_BODY } from '@/data/reusable';
import { QuantityStepper } from './QuantityStepper';
import { RequestAvailabilityDialog } from './RequestAvailabilityDialog';

export function CartSheet() {
  const {
    lines,
    itemCount,
    subtotal,
    hasReusable: cartHasReusable,
    isOpen,
    setOpen,
    setQty,
    remove,
    closeCart,
  } = useCart();
  const [requestOpen, setRequestOpen] = useState(false);

  /* The mixed-cart logic below is unchanged; this only makes sure the request
     flow stays unreachable while the reusable offering is switched off. In
     practice cartHasReusable is already always false then — the reusable
     section is the only entry point for those lines and the cart is
     in-memory — so this is belt-and-braces. Flipping SHOW_REUSABLE_BOXES back
     to true restores the original behaviour. */
  const hasReusable = SHOW_REUSABLE_BOXES && cartHasReusable;

  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-[#F3F3F1] p-0 gap-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200 gap-1">
            <SheetTitle className="text-xl font-bold text-[#0A0A0A] flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-[#a02135]" aria-hidden="true" />
              Your Order
              {itemCount > 0 && (
                <span className="text-sm font-semibold text-gray-500">
                  ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              Mix bundles, individual boxes and supplies in one order.
            </SheetDescription>
          </SheetHeader>

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5">
                  <ShoppingCart className="w-7 h-7 text-gray-300" aria-hidden="true" />
                </div>
                <p className="font-bold text-[#0A0A0A] mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-500 mb-6 max-w-[240px]">
                  Start with a bundle sized for your home, or add boxes one by one.
                </p>
                <a
                  href="#bundles"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#c41e46] transition-colors"
                >
                  Shop Bundles
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <ul className="space-y-3">
                {lines.map((line) => (
                  <li key={line.id} className="bg-white rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <p className="font-bold text-[#0A0A0A] text-sm leading-snug">{line.name}</p>
                        {line.meta && <p className="text-xs text-gray-500 mt-0.5">{line.meta}</p>}
                        {line.kind === 'reusable' && (
                          <span className="inline-block mt-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                            Reusable · On request
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${line.name} from cart`}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-[#a02135] hover:bg-[#F3F3F1] transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(qty) => setQty(line.id, qty)}
                        min={0}
                        label={`Quantity of ${line.name}`}
                        size="sm"
                        /* Shrink to content here so the line total keeps its room */
                        stretch={false}
                      />
                      <span className="font-bold text-[#0A0A0A] tabular-nums text-sm">
                        {line.price === null ? (
                          <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">
                            Quoted
                          </span>
                        ) : (
                          formatPrice(Math.round(line.price * line.qty * 100) / 100)
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Totals + checkout */}
          {lines.length > 0 && (
            <SheetFooter className="border-t border-gray-200 bg-white px-6 py-5 gap-4">
              {/* Reusable warning — drives the whole checkout switch */}
              {hasReusable && (
                <div
                  role="status"
                  className="w-full flex items-start gap-3 bg-[#a02135]/10 border border-[#a02135]/30 rounded-2xl p-4"
                >
                  <Info className="w-5 h-5 text-[#a02135] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A] mb-1">
                      Reusable boxes need availability confirmation
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your order includes reusable moving boxes, which are subject to current
                      inventory. Online checkout is unavailable for these — send a request and our
                      team will confirm availability and pricing for your whole order.
                    </p>
                  </div>
                </div>
              )}

              {/* Subtotal */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Subtotal
                    {hasReusable && <span className="text-xs text-gray-400"> (priced items)</span>}
                  </span>
                  <span className="text-2xl font-bold text-[#0A0A0A] tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Local delivery hint. Authoritative calculation happens server-side. */}
                <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                  <Truck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#a02135]" aria-hidden="true" />
                  {qualifiesForFreeDelivery ? (
                    <span>
                      <strong className="text-green-700">Free local delivery</strong> — your order
                      qualifies in eligible ZIP codes.
                    </span>
                  ) : (
                    <span>
                      Add {formatPrice(Math.round(amountToFreeDelivery * 100) / 100)} for free local
                      delivery, or a ${LOCAL_DELIVERY_FEE} fee applies in eligible ZIP codes.
                    </span>
                  )}
                </div>
              </div>

              {/* Primary action */}
              {hasReusable ? (
                <div className="w-full space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      setRequestOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#c41e46] transition-colors shadow-lg"
                  >
                    Request Availability
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {/* Hidden until SMS_PHONE_NUMBER is set — no dead sms: links. */}
                  {IS_SMS_CONFIGURED && (
                    <a
                      href={smsLink(REUSABLE_SMS_BODY)}
                      className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-[#F3F3F1] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      Text Us to Confirm Availability
                    </a>
                  )}
                </div>
              ) : (
                <div className="w-full space-y-2.5">
                  {/*
                    TODO: STRIPE CHECKOUT — conta Stripe ainda não existe.
                    This disabled button is the placeholder that the real
                    checkout replaces. When the account exists: POST the cart
                    lines + delivery ZIP to the Vercel Function stubbed in
                    api/_checkout-stub.ts, which validates the ZIP, prices
                    delivery (free $75+, else $15) and creates the Stripe
                    Checkout Session, then redirect to session.url.
                    Never trust client-side prices — re-price from src/data/*.

                    Do NOT route this path through api/box-availability.ts —
                    that inquiry form is exclusively for reusable boxes (which
                    have no online price). A normal cart must go to automated
                    Stripe checkout, not to a manual request form.
                  */}
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Online checkout coming soon"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-500 text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full cursor-not-allowed"
                  >
                    <CreditCard className="w-4 h-4" aria-hidden="true" />
                    Online Checkout Coming Soon
                  </button>

                  <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                    Secure online payment for boxes and supplies is coming soon. Your cart is saved
                    while you keep browsing.
                  </p>
                </div>
              )}
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      {/* Reusable-only form — not mounted while SHOW_REUSABLE_BOXES is false */}
      {SHOW_REUSABLE_BOXES && (
        <RequestAvailabilityDialog open={requestOpen} onOpenChange={setRequestOpen} />
      )}
    </>
  );
}
