import { useEffect } from 'react';
import { CartProvider } from '@/lib/CartProvider';
import { itemsByCategory } from '@/data/items';
import { Footer } from '@/sections/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BoxesHeader } from '@/sections/boxes/BoxesHeader';
import { BoxesHero } from '@/sections/boxes/BoxesHero';
import { ShopByCategory } from '@/sections/boxes/ShopByCategory';
import { BundlesCatalog } from '@/sections/boxes/BundlesCatalog';
import { ItemsSection } from '@/sections/boxes/ItemsSection';
import { ReusableBoxes } from '@/sections/boxes/ReusableBoxes';
import { LocalDelivery } from '@/sections/boxes/LocalDelivery';
import { MovingServicesCrossSell } from '@/sections/boxes/MovingServicesCrossSell';
import { CartSheet } from '@/sections/boxes/CartSheet';

/**
 * /moving-boxes — box & packing supply shop.
 *
 * Built as ONE page with in-page anchors rather than sub-routes per category:
 * the site has no client-side router (each route is a separate Vite/HTML entry),
 * so category sub-routes would mean full page loads — which would wipe the
 * client-side cart between "Shop Bundles" and "Shop Boxes". Single page keeps
 * the cart intact while the category cards still act as navigation.
 */
export default function MovingBoxesPage() {
  useEffect(() => {
    document.title = 'Moving Boxes & Packing Supplies — We Move On Demand';
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F3F3F1]">
        <BoxesHeader />

        <main>
          <BoxesHero />

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

          <ErrorBoundary>
            <ReusableBoxes />
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

        {/* Cart lives outside <main> so it overlays every section */}
        <CartSheet />
      </div>
    </CartProvider>
  );
}
