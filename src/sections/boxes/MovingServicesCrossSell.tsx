import { Truck, Phone } from 'lucide-react';
import { PHONE_TEL, PHONE_LABEL } from '@/lib/constants';

export function MovingServicesCrossSell() {
  return (
    <section
      id="moving-services"
      className="relative py-16 lg:py-24 bg-white scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-[#F3F3F1] rounded-3xl p-8 lg:p-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Truck className="w-3.5 h-3.5" aria-hidden="true" />
              Full-Service Moving
            </div>

            <h2 className="heading-section mb-4">
              Need More Than <span className="text-[#a02135]">Boxes?</span>
            </h2>

            <p className="text-xl md:text-2xl font-bold text-[#0A0A0A] tracking-tight mb-5">
              We can handle the move, too.
            </p>

            <p className="paragraph-large mb-8">
              We Move On Demand provides professional residential and commercial moving, packing and
              specialty moving services. From packing supplies to moving day, our team can help make
              the entire process easier.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              {/*
                TODO: linkar quando o novo formulário de estimate for definido.
                Rendered as a disabled <button> (not an <a>) so it is inert and
                announced as disabled by assistive tech until the destination
                exists. Swap for an <a href="..."> with the primary button
                styling once the estimate form is live.
              */}
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-500 text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full cursor-not-allowed"
              >
                Get a Moving Estimate
              </button>

              {/* Working alternative while the estimate form is pending. */}
              <a
                href={PHONE_TEL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#a02135] text-sm font-bold uppercase tracking-widest px-8 py-5 rounded-full border border-[#a02135]/30 hover:bg-[#a02135]/10 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call {PHONE_LABEL}
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Online moving estimates are coming soon — call us in the meantime and we'll quote your
              move right away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
