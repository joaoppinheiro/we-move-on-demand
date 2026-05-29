import { Camera, Play, ArrowRight } from 'lucide-react';

type MediaSlot = {
  id: string;
  label: string;
  hint: string;
  aspect: 'square' | 'portrait' | 'landscape' | 'wide';
  type: 'photo' | 'video';
};

const featuredVideo: MediaSlot = {
  id: 'hero-video',
  label: 'Behind the Scenes',
  hint: 'Featured video — crew loading a premium Boca Raton residence',
  aspect: 'wide',
  type: 'video',
};

const gallery: MediaSlot[] = [
  { id: 'premium-home', label: 'Premium Homes', hint: 'Exterior of a Florida luxury residence on moving day', aspect: 'portrait', type: 'photo' },
  { id: 'crew-working', label: 'Trusted Crew', hint: 'Same trusted crew, uniformed, handling client belongings', aspect: 'square', type: 'photo' },
  { id: 'clean-truck', label: 'Clean Trucks', hint: 'Branded We Move On Demand truck, clean and prepped', aspect: 'square', type: 'photo' },
  { id: 'pro-packing', label: 'Pro Packing', hint: 'Professional packing of fragile items / artwork', aspect: 'portrait', type: 'photo' },
  { id: 'assembly', label: 'Furniture Assembly', hint: 'Crew assembling furniture in the new home', aspect: 'square', type: 'photo' },
  { id: 'happy-customer', label: 'Real Customers', hint: 'Smiling customer next to Eduardo in the new home', aspect: 'square', type: 'photo' },
];

const beforeAfter: { id: string; hint: string }[] = [
  { id: 'before-after-1', hint: 'BEFORE: cluttered moving day chaos — AFTER: organized new home' },
  { id: 'before-after-2', hint: 'BEFORE: empty new place — AFTER: fully set up by our crew' },
];

function aspectClass(a: MediaSlot['aspect']): string {
  switch (a) {
    case 'square': return 'aspect-square';
    case 'portrait': return 'aspect-[3/4]';
    case 'landscape': return 'aspect-[4/3]';
    case 'wide': return 'aspect-[16/9]';
  }
}

function MediaPlaceholder({ slot }: { slot: MediaSlot }) {
  const Icon = slot.type === 'video' ? Play : Camera;
  return (
    <div
      data-placeholder={slot.id}
      data-media-type={slot.type}
      className={`group relative ${aspectClass(slot.aspect)} bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-lg`}
    >
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* red glow */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#a02135]/30 rounded-full blur-3xl" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a02135] mb-1.5">
          {slot.type === 'video' ? 'Video Slot' : 'Photo Slot'}
        </p>
        <p className="text-sm font-semibold text-white mb-2">{slot.label}</p>
        <p className="text-[11px] text-gray-400 max-w-[220px] leading-relaxed">{slot.hint}</p>
      </div>
    </div>
  );
}

export function RealMoves() {
  return (
    <section id="real-moves" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Real Operation</span>
          <h2 className="heading-section mb-4">
            Real Moves. <span className="text-[#a02135]">Real Customers.</span>
          </h2>
          <p className="paragraph-large max-w-xl mx-auto">
            No stock photos. Every photo and video below is from a real We Move On Demand job in Florida.
          </p>
        </div>

        {/* Featured Video */}
        <div className="mb-8">
          <MediaPlaceholder slot={featuredVideo} />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {gallery.map((slot) => (
            <MediaPlaceholder key={slot.id} slot={slot} />
          ))}
        </div>

        {/* Before / After */}
        <div className="mb-10">
          <div className="flex items-end justify-between mb-5">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">Before & After</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
              Side-by-Side
            </span>
          </div>
          <div className="space-y-6">
            {beforeAfter.map((pair) => (
              <div key={pair.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="relative">
                  <span className="absolute top-3 left-3 z-10 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Before</span>
                  <MediaPlaceholder slot={{ id: `${pair.id}-before`, label: 'Before', hint: pair.hint.split('—')[0]?.trim() || pair.hint, aspect: 'landscape', type: 'photo' }} />
                </div>
                <div className="relative">
                  <span className="absolute top-3 left-3 z-10 bg-[#a02135] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">After</span>
                  <MediaPlaceholder slot={{ id: `${pair.id}-after`, label: 'After', hint: pair.hint.split('—')[1]?.trim() || pair.hint, aspect: 'landscape', type: 'photo' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg"
          >
            Book Your Move
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4">
            No Hidden Fees · Honest Pricing · Every Time
          </p>
        </div>
      </div>
    </section>
  );
}
