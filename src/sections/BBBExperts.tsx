import { ExternalLink, Award, Shield, Star, CheckCircle } from 'lucide-react';

const bbbCredentials = [
  { label: 'A+ Rating', icon: Award },
  { label: 'BBB Accredited', icon: Shield },
  { label: 'Verified Reviews', icon: Star },
  { label: 'Trusted Since 2009', icon: CheckCircle },
];

export function BBBExperts() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-[#0A0A0A] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a02135]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#242550]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left - BBB Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="/images/bbb-logo-white.png" 
                    alt="BBB Logo" 
                    className="h-16 w-auto"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Better Business Bureau</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mt-1">BBB Accredited</h3>
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  A+ Rated Moving Experts
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  We are proud to be <span className="text-white font-semibold">BBB Accredited</span> with an 
                  <span className="text-[#a02135] font-bold"> A+ rating</span>. Our commitment to excellence, 
                  transparency, and customer satisfaction has earned us the highest possible rating from the 
                  Better Business Bureau — the gold standard in business trust.
                </p>

                {/* Credentials Grid - 1 col mobile, 2 cols desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {bbbCredentials.map((cred, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <cred.icon className="w-5 h-5 text-[#a02135]" />
                      </div>
                      <span className="text-white font-medium text-sm">{cred.label}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right - Trust Stats - 1 col mobile, 2 cols desktop */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl lg:text-5xl font-bold text-[#a02135] mb-2">A+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">BBB Rating</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl lg:text-5xl font-bold text-white mb-2">16+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Years Accredited</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl lg:text-5xl font-bold text-white mb-2">16000+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Happy Customers</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl lg:text-5xl font-bold text-white mb-2">5★</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Star Reviews</p>
                  </div>
                </div>

                {/* BBB Profile Button */}
                <a 
                  href="https://www.bbb.org/us/fl/boca-raton/profile/movers/we-move-on-demand-0653-90345921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg whitespace-nowrap w-full"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  View Our BBB Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
