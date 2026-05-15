// Site Configuration - We Move On Demand - Dark Design System

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "We Move On Demand - Top Moving Services In Florida",
  siteDescription: "Professional moving services in Florida. Residential, commercial, local and statewide moving. Licensed and insured. Get your free quote today!",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "MOVE",
  heroImage: "/images/hero-movers.jpg",
  heroImageAlt: "Professional movers loading boxes into truck",
  overlayText: "Trusted by 600+ happy customers",
  brandName: "We Move On Demand",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};

// Intro Grid Section - About Preview
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "5 Star Moving",
  titleLine2: "Experience",
  description: "For a 5 star move, choose a 5 star company known by their care and attention. We have the right plan for you. Serving all of Florida with professional residential and commercial moving services.",
  portfolioImages: [
    { src: "/images/movers-truck.jpg", alt: "Movers with truck" },
    { src: "/images/family-moving.jpg", alt: "Happy family moving" },
    { src: "/images/movers-furniture.jpg", alt: "Movers carrying furniture" },
    { src: "/images/storage.jpg", alt: "Storage facility" },
    { src: "/images/happy-family.jpg", alt: "Family in new home" },
  ],
  accentText: "Trusted Moving Partner Since 2010",
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "WHAT WE OFFER",
  titleLine1: "Our",
  titleLine2: "Services",
  description: "From local moves to statewide relocations, we provide comprehensive moving solutions tailored to your needs.",
  services: [
    {
      iconName: "building",
      title: "Commercial Services",
      description: "Let We Move On Demand take care of your statewide moving needs in Florida. We handle offices, retail spaces, and more.",
    },
    {
      iconName: "home",
      title: "Residential Services",
      description: "Don't trust your move to just anyone. We Move on Demand will guarantee your satisfaction and give you peace of mind.",
    },
    {
      iconName: "mapPin",
      title: "Local Services",
      description: "Whether you are moving across the state or across the street We Move on Demand is the company for you.",
    },
    {
      iconName: "warehouse",
      title: "Storage Services",
      description: "Moving has never been so easy. We offer storage solutions for your belongings until you are ready to move into your new home or office.",
    },
    {
      iconName: "truck",
      title: "State Wide Moving",
      description: "Long distance moves don't have to be daunting. We can make this easy on you and handle your belongings with safety.",
    },
    {
      iconName: "package",
      title: "Moving Supplies",
      description: "We provide all boxes and moving supplies necessary to pack your stuff and maintain their integrity.",
    },
  ],
};

// Why Choose Us Section (Stats & Features)
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "WHY CHOOSE US",
  titleRegular: "Top Moving",
  titleItalic: "Services in Florida",
  statsLabel: "By The Numbers",
  stats: [
    { value: 600, suffix: "+", label: "Happy Clients" },
    { value: 24, suffix: "/7", label: "Availability" },
    { value: 5, suffix: "★", label: "Star Rating" },
    { value: 14, suffix: "+", label: "Years Experience" },
  ],
  featureCards: [
    {
      image: "/images/movers-loading.png",
      imageAlt: "Professional movers loading truck",
      title: "Expertly Trained Team",
      description: "Our crews are specially trained across various sectors – be it commercial, residential, or business relocations.",
    },
    {
      image: "/images/commercial-moving.jpg",
      imageAlt: "Commercial moving services",
      title: "Professional & Skilled",
      description: "We prioritize the secure packing and transportation of your furniture and valuables with utmost care.",
    },
  ],
  wideImage: "/images/movers-truck.jpg",
  wideImageAlt: "Moving truck on the road",
  wideTitle: "Keep Moving With Us!",
  wideDescription: "We are available 24/7, always on the road (day or night) to fit your deadline and budget.",
};

// Featured Projects - Discount/Offer Section
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "SPECIAL OFFER",
  titleRegular: "Hot",
  titleItalic: "Discount",
  viewAllText: "Learn More",
  viewAllHref: "#contact",
  viewProjectText: "Get Discount",
  projects: [
    {
      id: 1,
      title: "10% OFF",
      category: "First Responders & Military",
      year: "2024",
      image: "/images/movers-furniture.jpg",
      description: "Moving to a new place shouldn't be one more thing for you to worry about. If you are a first responder or military, give us a call for a 10% discount on your next move!",
    },
  ],
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "CLIENT STORIES",
  titleRegular: "What Our Customers",
  titleItalic: "Are Saying",
  testimonials: [
    {
      id: 1,
      name: "Jennifer",
      role: "Residential Client",
      image: "/images/happy-family.jpg",
      quote: "Prompt, pleasant and on time. I'm not an individual to write reviews BUT I now see the necessity to do this from henceforth.",
    },
    {
      id: 2,
      name: "Rachel",
      role: "Residential Client",
      image: "/images/family-moving.jpg",
      quote: "I VERY, VERY HIGHLY RECOMMEND USING 'WE MOVE ON DEMAND' for all of your moving needs. You will NOT be disappointed.",
    },
    {
      id: 3,
      name: "Hannah",
      role: "Commercial Client",
      image: "/images/storage.jpg",
      quote: "Excellent moving company from start to end. The company was in contact with me prior moving date and readily responded to me with my concerns.",
    },
    {
      id: 4,
      name: "Jan",
      role: "Residential Client",
      image: "/images/movers-truck.jpg",
      quote: "Five guys arrived to handle the move, all I can say is they were remarkable. I have referred several friends to WMOD, they all had the same experience.",
    },
    {
      id: 5,
      name: "Jane",
      role: "Repeat Client",
      image: "/images/happy-family.jpg",
      quote: "I just completed my second major home move (8 years apart) with We Move on Demand. My first experience was phenomenal, this last move was equally as phenomenal.",
    },
    {
      id: 6,
      name: "Michelle",
      role: "Residential Client",
      image: "/images/family-moving.jpg",
      quote: "Phenomenal! Totally professional, polite and efficient. The best move ever! Over and above the call of duty. Thank you guys so much.",
    },
  ],
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "COMMON QUESTIONS",
  titleRegular: "Frequently",
  titleItalic: "Asked Questions",
  ctaText: "Still have questions?",
  ctaButtonText: "Get in Touch",
  ctaHref: "#contact",
  faqs: [
    {
      id: "1",
      question: "What areas do you serve?",
      answer: "We serve the entire state of Florida, from Miami to Jacksonville and everywhere in between. Whether you're moving locally or across the state, we've got you covered.",
    },
    {
      id: "2",
      question: "Are you licensed and insured?",
      answer: "Yes, we are fully licensed and insured. Our Florida Registration number is IM1733. You can trust that your belongings are protected throughout the entire moving process.",
    },
    {
      id: "3",
      question: "How do I get a free estimate?",
      answer: "You can get a free estimate by filling out the form on our website, calling us at (561) 212-7570, or emailing us at move@wemoveondemand.com. We'll provide you with a detailed quote based on your specific needs.",
    },
    {
      id: "4",
      question: "Do you offer packing services?",
      answer: "Yes, we offer full packing services. Our professional team can pack your entire home or office efficiently and securely, using high-quality packing materials to ensure your items are protected.",
    },
    {
      id: "5",
      question: "What are your operating hours?",
      answer: "We operate 24 hours a day, 7 days a week. We understand that moving doesn't always happen during business hours, so we're available to fit your schedule and deadline.",
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "WE MOVE",
  contactLabel: "Get in Touch",
  email: "move@wemoveondemand.com",
  locationText: "Serving All of Florida",
  navigationLabel: "Quick Links",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  socialLabel: "Follow Us",
  socialLinks: [
    { iconName: "facebook", href: "https://facebook.com/wemoveondemandfl", label: "Facebook" },
    { iconName: "twitter", href: "https://twitter.com/wemoveondemand", label: "Twitter" },
    { iconName: "instagram", href: "https://instagram.com/wemoveondemand", label: "Instagram" },
    { iconName: "mail", href: "mailto:move@wemoveondemand.com", label: "Email" },
  ],
  tagline: "Professional moving services you can trust. Licensed and insured in Florida.",
  copyright: "2024 We Move On Demand. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#privacy" },
  ],
};
