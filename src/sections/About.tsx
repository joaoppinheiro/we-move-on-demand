import { Shield, Clock, Award, Users, CheckCircle, Phone, MapPin } from 'lucide-react';
import { BBB_PROFILE_URL } from '@/lib/constants';

const stats = [
  { value: '16000+', label: 'Happy Customers', icon: Users },
  { value: '24/7', label: 'Available', icon: Clock },
  { value: '5★', label: 'Rating', icon: Award },
  { value: '16+', label: 'Years Experience', icon: Shield },
];

const features = [
  'Licensed & Insured (FL Reg: IM1733)',
  'Same-Day Service Available',
  'No Hidden Fees. Honest Pricing. Every Time.',
  'Professional Packing & Unpacking',
  'Secure Storage Solutions',
  'Statewide Florida Coverage',
];

export function About() {
  return (
    <section id="about" className="relative py-24 bg-[#F3F3F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Image (desktop only) */}
          <div className="hidden lg:block relative">
            <div className="relative z-10">
              <img
                src="/images/eduardo-2.png"
                alt="Eduardo - Professional Mover"
                className="w-full max-w-md mx-auto h-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-8 -left-4 w-24 h-24 bg-[#a02135]/10 rounded-full blur-2xl" />
          </div>

          {/* Right Column - Content */}
          <div>
            <span className="section-label mb-4 block">About Us</span>
            
            <h2 className="heading-section mb-6">
              Trusted Moving Partner
              <br />
              <span className="text-[#a02135]">Since 2009</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="paragraph-large">
                <strong className="text-[#0A0A0A]">Attention:</strong> Moving doesn't have to be stressful. 
                At We Move On Demand, we've helped over <strong className="text-[#0A0A0A]">16000+ customers</strong> relocate 
                across Florida with zero hassle and complete peace of mind. Founded and registered in 2009.
              </p>
              <p className="paragraph-base">
                <strong className="text-[#0A0A0A]">Interest:</strong> Our team of professional movers 
                treats your belongings like their own. From delicate antiques to heavy office 
                equipment, we have the expertise and equipment to handle it all.
              </p>
              <p className="paragraph-base">
                <strong className="text-[#0A0A0A]">Desire:</strong> Imagine settling into your new home 
                or office without lifting a finger. Our white-glove service includes packing, 
                moving, unpacking, and even furniture assembly.
              </p>
              <p className="paragraph-base">
                <strong className="text-[#0A0A0A]">Action:</strong> Don't wait until the last minute. 
                Book your move today and get a free estimate. Call us now at{' '}
                <a href="tel:5612127570" className="text-[#a02135] font-semibold hover:underline">
                  (561) 212-7570
                </a>
                {' '}or email{' '}
                <a href="mailto:move@wemoveondemand.com" className="text-[#a02135] font-semibold hover:underline">
                  move@wemoveondemand.com
                </a>.
              </p>
            </div>

            {/* Address & BBB - BBB first (desktop), address only (mobile) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 p-4 bg-white rounded-2xl">
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="View our BBB Accredited A+ profile"
              >
                <img src="/images/bbb-logo.png" alt="BBB A+ Rated Business" className="h-10 w-auto flex-shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a02135]">A+ Since 2009</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#a02135] flex-shrink-0" />
                29 NW 13th St Suite 22 1, Boca Raton, FL 33432
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#a02135] flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="tel:5612127570" className="btn-primary">
              <Phone className="w-4 h-4" />
              Talk to the Owner
            </a>
          </div>
        </div>

        {/* Stats Section - 1 col mobile, 4 cols desktop */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-[#a02135]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#a02135]" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
