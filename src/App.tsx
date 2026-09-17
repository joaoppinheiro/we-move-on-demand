import { useEffect, lazy, Suspense } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
/*
 * Box shop teaser — REMOVED FROM THE HOME PAGE, component kept on purpose.
 * The condensed "Our Services" section now carries this job through its
 * "Moving Supplies" card, which links to the same /moving-boxes route, so the
 * dark teaser band was saying it twice. Left commented (not deleted) so
 * restoring it is a two-line uncomment; src/sections/OrderBoxes.tsx still
 * exists untouched.
 *
 * const OrderBoxes = lazy(() => import('./sections/OrderBoxes').then(m => ({ default: m.OrderBoxes })));
 */
const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const RealMoves = lazy(() => import('./sections/RealMoves').then(m => ({ default: m.RealMoves })));
const FAQ = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const FreeEstimate = lazy(() => import('./sections/FreeEstimate').then(m => ({ default: m.FreeEstimate })));

function App() {
  useEffect(() => {
    document.title = 'We Move On Demand - Top Moving Services in Florida';
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F3F1]">
      <Header />
      <main>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" />}>
            <Services />
          </Suspense>
        </ErrorBoundary>
        {/* Box shop teaser removed — see the note by the commented-out
            OrderBoxes import above. To restore, uncomment that import and this
            block:

        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-[#0A0A0A]" />}>
            <OrderBoxes />
          </Suspense>
        </ErrorBoundary>
        */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-[#F3F3F1]" />}>
            <About />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" />}>
            <RealMoves />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-[#F3F3F1]" />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" />}>
            <FreeEstimate />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
