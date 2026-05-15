import { Building2, Home, MapPin, Warehouse, Truck, Package, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Commercial Services',
    description: 'Let We Move On Demand take care of your statewide moving needs in Florida. We handle offices, retail spaces, and more with minimal downtime.',
    link: '#contact',
  },
  {
    icon: Home,
    title: 'Residential Services',
    description: "Don't trust your move to just anyone. We Move on Demand will guarantee your satisfaction and give you peace of mind with our white-glove service.",
    link: '#contact',
  },
  {
    icon: MapPin,
    title: 'Local Services',
    description: 'Whether you are moving across the state or across the street, We Move on Demand is the company for you. Same-day service available.',
    link: '#contact',
  },
  {
    icon: Warehouse,
    title: 'Storage Services',
    description: 'Moving has never been so easy. We offer secure storage solutions for your belongings until you are ready to move into your new home or office.',
    link: '#contact',
  },
  {
    icon: Truck,
    title: 'Statewide Moving',
    description: "Long distance moves don't have to be daunting. We can make this easy on you and handle your belongings with safety and care.",
    link: '#contact',
  },
  {
    icon: Package,
    title: 'Moving Supplies',
    description: 'We provide all boxes and moving supplies necessary to pack your stuff and maintain their integrity during the move.',
    link: '#contact',
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-4 block">What We Offer</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0A0A] mb-6">
            Our <span className="text-[#a02135]">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From local moves to statewide relocations, we provide comprehensive moving 
            solutions tailored to your needs. Experience the difference of a 5-star moving company.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#F3F3F1] rounded-3xl p-8 hover:bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#a02135] rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-white group-hover:text-[#0A0A0A] transition-colors" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 group-hover:text-gray-300 transition-colors leading-relaxed">
                {service.description}
              </p>
              
              {/* Link */}
              <a
                href={service.link}
                className="inline-flex items-center gap-2 text-[#a02135] text-sm font-semibold uppercase tracking-wider group-hover:text-white hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Not sure which service you need? Let's talk about your move.
          </p>
          <a href="tel:5612127570" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a02135] hover:scale-105 transition-all shadow-lg">
            <ArrowRight className="w-4 h-4" />
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
