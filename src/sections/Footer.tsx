import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Residential Moving', href: '#services' },
  { label: 'Commercial Moving', href: '#services' },
  { label: 'Local Moving', href: '#services' },
  { label: 'Long Distance', href: '#services' },
  { label: 'Storage Services', href: '#services' },
  { label: 'Packing Services', href: '#services' },
];

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo-white.png"
              alt="We Move On Demand"
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-400 mb-4 leading-relaxed">
              Florida's premier moving company. Licensed, insured, and trusted by over 16000+ 
              satisfied customers. Founded and registered in 2009.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/wemoveondemandfl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#a02135] transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/wemoveondemand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#a02135] transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com/wemoveondemand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#a02135] transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#a02135] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-[#a02135] transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:5612127570"
                className="flex items-center gap-3 text-gray-400 hover:text-[#a02135] transition-colors"
              >
                <Phone className="w-5 h-5" />
                (561) 212-7570
              </a>
              <a
                href="mailto:move@wemoveondemand.com"
                className="flex items-center gap-3 text-gray-400 hover:text-[#a02135] transition-colors"
              >
                <Mail className="w-5 h-5" />
                move@wemoveondemand.com
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>29 NW 13th St Suite 22 1<br />Boca Raton, FL 33432</span>
              </div>
              
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/images/bbb-logo-white.png" alt="BBB A+ Rated" className="h-8 w-auto opacity-80" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Licensed & Insured</p>
                    <p className="text-lg font-bold text-[#a02135]">FL Reg: IM1733</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} We Move On Demand. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
