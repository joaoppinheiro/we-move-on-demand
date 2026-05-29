import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteSubmit } from '@/hooks/useQuoteSubmit';

export function FreeEstimate() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const { submit, isLoading, state, errorMessage, reset } = useQuoteSubmit('free-estimate-section');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    const ok = await submit(formData);
    if (ok) setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="section-label mb-4 block">Get Started</span>
          <h2 className="heading-section mb-4">
            Get Your <span className="text-[#a02135]">Free Estimate</span>
          </h2>
          <p className="paragraph-large max-w-xl mx-auto">
            Fill in your details and our team will contact you within 24 hours.
          </p>
        </div>

        {/* 3 Equal Columns: Eduardo | Form | Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1 - Eduardo Phone Image */}
          <div className="hidden lg:block rounded-3xl overflow-hidden">
            <img
              src="/images/eduardo-3.png"
              alt="Eduardo - We Move On Demand"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Column 2 - Form */}
          <div className="bg-[#F3F3F1] rounded-3xl p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#a02135] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(561) 123-4567"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#a02135] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#a02135] transition-colors"
                />
              </div>

              {state === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg w-full whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!formData.name || !formData.phone || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    Get My Free Estimate
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center pt-1">
                No Hidden Fees. Honest Pricing. Every Time.
              </p>
            </form>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="space-y-4">
            <a href="tel:5612127570" className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#a02135]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="text-base font-bold text-[#0A0A0A] truncate">(561) 212-7570</p>
              </div>
            </a>

            <a href="mailto:move@wemoveondemand.com" className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#a02135]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="text-sm font-bold text-[#0A0A0A] truncate">move@wemoveondemand.com</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl">
              <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#a02135]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Office</p>
                <p className="text-sm font-bold text-[#0A0A0A]">Boca Raton, FL 33432</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl">
              <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#a02135]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Hours</p>
                <p className="text-base font-bold text-[#0A0A0A]">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSubmitted} onOpenChange={(open) => { setIsSubmitted(open); if (!open) { reset(); setFormData({ name: '', phone: '', email: '' }); } }}>
        <DialogContent className="bg-white border-gray-200 text-[#0A0A0A] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              Request Received!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Thank you, {formData.name}! We've received your request.
            </p>
            <p className="text-gray-600">
              Our team will contact you at {formData.phone} within 24 hours.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="tel:5612127570" className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] transition-all flex-1">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
