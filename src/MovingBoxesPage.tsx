import { useEffect } from 'react';
import { CartProvider } from '@/lib/CartProvider';
import { itemsByCategory } from '@/data/items';
import { Footer } from '@/sections/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BoxesHeader } from '@/sections/boxes/BoxesHeader';
import { DeliveryBar } from '@/sections/boxes/DeliveryBar';
import { BoxesHero } from '@/sections/boxes/BoxesHero';
import { ChoosePath } from '@/sections/boxes/ChoosePath';
import { ShopByCategory } from '@/sections/boxes/ShopByCategory';
import { BundlesCatalog } from '@/sections/boxes/BundlesCatalog';
import { ItemsSection } from '@/sections/boxes/ItemsSection';
import { BinRentals } from '@/sections/boxes/BinRentals';
import { RentalCrossSell } from '@/sections/boxes/RentalCrossSell';
import { RentalFAQ } from '@/sections/boxes/RentalFAQ';
import { LocalDelivery } from '@/sections/boxes/LocalDelivery';
import { MovingServicesCrossSell } from '@/sections/boxes/MovingServicesCrossSell';
import { CartSheet } from '@/sections/boxes/CartSheet';
import { HelpDock } from '@/sections/boxes/HelpDock';

/**
 * /moving-boxes — box shop and reusable bin rentals.
 *
 * Built as ONE page with in-page anchors rather than sub-routes per category:
 * the site has no client-side router (each route is a separate Vite/HTML entry),
 * so category sub-routes would mean full page loads — which would wipe the
 * client-side cart between "Shop Bundles" and "Shop Boxes". Single page keeps
 * the cart intact while the category cards still act as navigation.
 *
 * Section order follows the BUY / RENT split introduced by ChoosePath: the
 * cardboard shop in full, then the rental program with its own delivery policy,
 * cross-sell and FAQ, then the shared local-delivery details.
 */
export default function MovingBoxesPage() {
  useEffect(() => {
    document.title = 'Moving Boxes, Packing Supplies & Bin Rentals — We Move On Demand';
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F3F3F1]">
        <BoxesHeader />
        {/* Sticky at top-20, stacking under the h-20 header rather than over it.
            Section anchors use scroll-mt-32 to clear both. */}
        <DeliveryBar />

        <main>
          <BoxesHero />

          <ErrorBoundary>
            <ChoosePath />
          </ErrorBoundary>

          {/* ------------------------------------------------------- BUY --- */}
          <ErrorBoundary>
            <ShopByCategory />
          </ErrorBoundary>

          <ErrorBoundary>
            <BundlesCatalog />
          </ErrorBoundary>

          <ErrorBoundary>
            <ItemsSection
              id="boxes"
              label="Build Your Own"
              title="Individual Moving"
              titleAccent="Boxes"
              description="Need just a few boxes or prefer to build your own order? Add exactly what you need, in the quantity you need."
              items={itemsByCategory('boxes')}
              background="white"
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <ItemsSection
              id="office-boxes"
              label="For the Workplace"
              title="Office & File"
              titleAccent="Boxes"
              description="Banker Boxes with lids for files, records and documents — built to stack and store."
              items={itemsByCategory('office')}
              background="gray"
              footnote="Moving an office? Add our regular moving boxes and packing supplies above to build one order that covers your whole office move."
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <ItemsSection
              id="packing-supplies"
              label="Protect Your Belongings"
              title="Packing"
              titleAccent="Supplies"
              description="Everything needed to help protect belongings during packing and moving — packing tape, bubble wrap and white newsprint packing paper."
              items={itemsByCategory('supplies')}
              background="white"
            />
          </ErrorBoundary>

          {/* ------------------------------------------------------ RENT --- */}
          <ErrorBoundary>
            <BinRentals />
          </ErrorBoundary>

          <ErrorBoundary>
            <RentalCrossSell />
          </ErrorBoundary>

          <ErrorBoundary>
            <RentalFAQ />
          </ErrorBoundary>

          <ErrorBoundary>
            <LocalDelivery />
          </ErrorBoundary>

          <ErrorBoundary>
            <MovingServicesCrossSell />
          </ErrorBoundary>
        </main>

        {/* hashPrefix="/" so the footer's home anchors resolve back to the home page */}
        <Footer hashPrefix="/" />

        {/* Cart and help dock live outside <main> so they overlay every section */}
        <CartSheet />
        <HelpDock />
      </div>
    </CartProvider>
  );
}
