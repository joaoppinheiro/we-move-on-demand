import { useEffect } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { BBBExperts } from './sections/BBBExperts';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { FreeEstimate } from './sections/FreeEstimate';
import { Footer } from './sections/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Set page title
    document.title = 'We Move On Demand - Top Moving Services in Florida';
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F3F1]">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <BBBExperts />
        <Testimonials />
        <FAQ />
        <FreeEstimate />
      </main>
      <Footer />
    </div>
  );
}

export default App;
