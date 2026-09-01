import { useEffect, useState } from 'react';
import { ShoppingCart, Phone, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { PHONE_TEL, PHONE_LABEL, SHOW_REUSABLE_BOXES } from '@/lib/constants';

/* The Reusable link is dropped while SHOW_REUSABLE_BOXES is false, so the nav
   never points at a section that isn't rendered. */
const shopLinks = [
  { label: 'Bundles', href: '#bundles' },
  { label: 'Boxes', href: '#boxes' },
  { label: 'Office', href: '#office-boxes' },
  { label: 'Supplies', href: '#packing-supplies' },
  ...(SHOW_REUSABLE_BOXES ? [{ label: 'Reusable', href: '#reusable' }] : []),
  { label: 'Delivery', href: '#delivery' },
];

/**
 * Sticky header for /moving-boxes. Kept separate from the home Header because
 * the home nav is built on same-page hash links that don't exist here, and this
 * page needs a persistent cart button instead of a quote CTA.
 */
export function BoxesHeader() {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F3F3F1]/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-[#F3F3F1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo → back to home */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="We Move On Demand — home">
            <img src="/images/logo.webp" alt="We Move On Demand" className="h-10 w-auto" decoding="async" />
          </a>

          {/* Desktop in-page nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Shop sections">
            {shopLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-[#0A0A0A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-2 text-gray-600 hover:text-[#0A0A0A] text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Main Site
            </a>

            <a
              href={PHONE_TEL}
              className="hidden md:inline-flex items-center gap-2 text-[#a02135] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {PHONE_LABEL}
            </a>

            {/* Cart — always visible, primary action on this page */}
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest px-4 sm:px-6 py-3.5 rounded-full hover:bg-[#a02135] transition-colors shadow-lg"
              aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 flex items-center justify-center bg-[#c41e46] text-white text-[11px] font-bold rounded-full border-2 border-[#F3F3F1]">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
