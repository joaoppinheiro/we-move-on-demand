import { Star, ExternalLink, MessageSquareHeart, MapPin, Phone } from 'lucide-react';
import { BBB_LEAVE_REVIEW_URL, PHONE_TEL, PHONE_LABEL } from '@/lib/constants';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CV2LbXgNR2dvEBE/review';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F1] flex flex-col">
      {/* Minimal Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/images/logo-color.png" alt="We Move On Demand" className="h-10 w-auto" />
          </a>
          <a
            href={PHONE_TEL}
            className="hidden sm:inline-flex items-center gap-2 text-[#a02135] text-xs font-bold uppercase tracking-widest hover:underline"
          >
            <Phone className="w-4 h-4" />
            {PHONE_LABEL}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden bg-white shadow-xl">
                  <img
                    src="/images/eduardo-2.png"
                    alt="Eduardo — Owner of We Move On Demand"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-2 lg:bottom-8 lg:-right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-3">
                  <img src="/images/bbb-logo.png" alt="BBB A+ Rated" className="h-10 w-auto" />
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#a02135]">A+ Rated</p>
                    <p className="text-[10px] text-gray-500">BBB Accredited</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="order-1 lg:order-2">
                <span className="section-label mb-4 block">Thank You · We Appreciate You</span>

                <h1 className="heading-section mb-6">
                  How Did We <span className="text-[#a02135]">Do?</span>
                </h1>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p className="paragraph-large">
                    Hey there! If we just wrapped up your move here in sunny South Florida, first off ,{' '}
                    <strong className="text-[#0A0A0A]">thank you</strong> for trusting We Move On Demand with your home and your belongings.
                  </p>

                  <p className="paragraph-base">
                    We know moving can be a lot. Between the heat, the traffic on I-95, and trying to figure out where every box goes… it's no small thing. That's why we truly appreciate you letting us be part of your fresh start.
                  </p>

                  <p className="paragraph-base">
                    Your feedback helps other Florida families and businesses find a moving crew they can count on. If you have a quick minute, we'd be so grateful if you could leave us a review.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-[#a02135] flex-shrink-0" />
                  Boca Raton, FL · Serving all of South Florida
                </div>

                <p className="mt-6 text-sm font-semibold text-[#0A0A0A]">
                  Thanks again, and welcome home!
                  <br />
                  <span className="text-[#a02135]">— Eduardo & the We Move On Demand Team</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Review Cards Section */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-section mb-4">
                Leave Us a <span className="text-[#a02135]">Review</span>
              </h2>
              <p className="paragraph-base max-w-xl mx-auto">
                Pick your favorite platform below. Every single review helps us grow and serve our Florida community better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Review Card */}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F3F3F1] flex items-center justify-center mb-6 group-hover:bg-[#a02135]/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Google Review</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Share your experience on Google and help neighbors across Florida find a mover they can trust.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full group-hover:bg-[#c41e46] transition-colors">
                  <Star className="w-4 h-4" />
                  Leave a Google Review
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </span>
              </a>

              {/* BBB Review Card */}
              <a
                href={BBB_LEAVE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F3F3F1] flex items-center justify-center mb-6 group-hover:bg-[#a02135]/10 transition-colors">
                  <img src="/images/bbb-logo.png" alt="BBB" className="w-10 h-auto" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">BBB Review</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Support our A+ accredited business on the Better Business Bureau — the gold standard for trust.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full group-hover:bg-[#242550] transition-colors">
                  <MessageSquareHeart className="w-4 h-4" />
                  Review Us on BBB
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </span>
              </a>
            </div>

            {/* Trust Stats */}
            <div className="mt-12 bg-[#0A0A0A] rounded-3xl p-8 lg:p-10 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Why Your Review Matters</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl lg:text-4xl font-bold text-[#a02135]">16,000+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-bold text-[#a02135]">A+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">BBB Rating</p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-bold text-[#a02135]">16+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years Serving FL</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo-color.png" alt="We Move On Demand" className="h-8 w-auto opacity-80" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">© {new Date().getFullYear()} We Move On Demand</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-xs text-gray-500 hover:text-[#a02135] transition-colors uppercase tracking-wider font-medium">
              Back to Website
            </a>
            <a href={PHONE_TEL} className="text-xs text-gray-500 hover:text-[#a02135] transition-colors uppercase tracking-wider font-medium">
              {PHONE_LABEL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
