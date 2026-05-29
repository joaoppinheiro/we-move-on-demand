import { useState } from 'react';
import { ArrowRight, Phone, Star, AlertCircle, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteSubmit } from '@/hooks/useQuoteSubmit';
import { BBB_PROFILE_URL, PHONE_TEL } from '@/lib/constants';

function HeroQuoteForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    movingDate: '',
    fromZip: '',
    toZip: '',
  });
  const { submit, isLoading, state, errorMessage } = useQuoteSubmit('hero-primary');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.phone) return;
    const ok = await submit(fields);
    if (ok) {
      onSuccess();
      setFields({ name: '', phone: '', email: '', movingDate: '', fromZip: '', toZip: '' });
    }
  };

  const inputCls =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#a02135] focus:ring-2 focus:ring-[#a02135]/10 transition-all disabled:opacity-60';

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl shadow-[#a02135]/10 border border-gray-100 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Free • No Obligation
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A] tracking-tight leading-tight">
          Get your free moving quote
          <br />
          <span className="text-[#a02135]">in minutes.</span>
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          required
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          placeholder="Full name *"
          disabled={isLoading}
          className={inputCls}
        />
        <input
          type="tel"
          required
          value={fields.phone}
          onChange={(e) => setFields({ ...fields, phone: e.target.value })}
          placeholder="Phone *"
          disabled={isLoading}
          className={inputCls}
        />
        <input
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          placeholder="Email"
          disabled={isLoading}
          className={inputCls}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={fields.fromZip}
            onChange={(e) => setFields({ ...fields, fromZip: e.target.value })}
            placeholder="From ZIP"
            disabled={isLoading}
            className={inputCls}
          />
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={fields.toZip}
            onChange={(e) => setFields({ ...fields, toZip: e.target.value })}
            placeholder="To ZIP"
            disabled={isLoading}
            className={inputCls}
          />
        </div>

        <input
          type="date"
          value={fields.movingDate}
          onChange={(e) => setFields({ ...fields, movingDate: e.target.value })}
          disabled={isLoading}
          className={`${inputCls} text-gray-500`}
        />

        {state === 'error' && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#c41e46] hover:scale-[1.02] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={isLoading || !fields.name || !fields.phone}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get My Free Quote
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 text-center pt-1 leading-relaxed">
          No Hidden Fees. Honest Pricing. Every Time.
        </p>
      </form>
    </div>
  );
}

export function Hero() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section id="hero" className="relative bg-[#F3F3F1] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a02135]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#242550]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 lg:pt-32 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-5">
              5 Star Rated Moving Company • Florida
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tighter leading-[0.9] text-[#0A0A0A] mb-6">
              Stress-Free
              <br />
              <span className="relative inline-block">
                Moving Starts Here
                <span className="absolute -top-2 -right-2 lg:-top-3 lg:-right-4 bg-[#a02135] text-white px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-[0.5rem] lg:text-[0.6rem] font-bold uppercase tracking-widest shadow-lg transform rotate-3 z-10">
                  Talk to the Owner
                </span>
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
              For a <span className="text-[#a02135] font-semibold">5-star move</span>, choose a 5-star company
              known for care and attention. Serving all of Florida — residential and commercial.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#0A0A0A]">16,000+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a02135]" />
                <span className="text-sm text-gray-600">Same Trusted Crew For Years</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a02135]" />
                <span className="text-sm text-gray-600">Licensed & Insured (FL Reg: IM1733)</span>
              </div>
            </div>

            {/* BBB A+ + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white border border-gray-200 rounded-2xl pl-3 pr-4 py-2 hover:shadow-md transition-shadow"
                aria-label="View our BBB A+ accredited profile"
              >
                <img src="/images/bbb-logo.png" alt="" className="h-9 w-auto" />
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#a02135]">A+ Rated</p>
                  <p className="text-[10px] text-gray-500">BBB Accredited Since 2009</p>
                </div>
              </a>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a02135] hover:scale-105 transition-all shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>

          {/* Right Column - Quote Form (above the fold) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <HeroQuoteForm onSuccess={() => setIsQuoteOpen(true)} />
          </div>
        </div>
      </div>

      {/* Quote Dialog */}
      <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
        <DialogContent className="bg-white border-gray-200 text-[#0A0A0A] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Thank You!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            We've received your request. Our team will contact you within 24 hours to discuss your move.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] transition-all flex-1"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
