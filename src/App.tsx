import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/Wishlist';
import NotFound from './components/NotFound';
import CartDrawer from './components/CartDrawer';
import CheckoutSuccessDialog from './components/CheckoutSuccessDialog';
import { useShop } from './ShopContext';

export default function App() {
  const { products, isCartOpen, setIsCartOpen } = useShop();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const selectedProduct = useMemo(() => 
    selectedProductId ? products.find(p => p.id === selectedProductId) : null, 
    [selectedProductId, products]
  );

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setShowWishlist(false);
  };

  return (
    <div id="app-root" className="min-h-screen bg-dark-bg text-white selection:bg-neon selection:text-dark-bg">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenWishlist={() => { setShowWishlist(true); setSelectedProductId(null); }} 
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutSuccess={setCheckoutData} />
      
      <CheckoutSuccessDialog 
        isOpen={!!checkoutData} 
        onClose={() => setCheckoutData(null)}
        orderData={checkoutData}
      />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {showWishlist ? (
            <Wishlist 
              key="wishlist"
              onBack={() => setShowWishlist(false)} 
              onProductClick={handleProductClick}
            />
          ) : selectedProductId ? (
            selectedProduct ? (
              <motion.div
                key={selectedProductId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductDetail 
                  product={selectedProduct} 
                  onBack={() => setSelectedProductId(null)} 
                  onProductClick={handleProductClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="404"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFound onHome={() => setSelectedProductId(null)} />
              </motion.div>
            )
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductList 
                onProductClick={handleProductClick} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-[1400px] mx-auto px-6 py-20 border-t border-white/5 opacity-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold font-tech tracking-tighter">BSTech</div>
          <div className="flex gap-8 text-sm font-medium">
            <button onClick={() => { setShowWishlist(false); setSelectedProductId(null); }} className="hover:text-white transition-colors">Catalog</button>
            <button onClick={() => setShowWishlist(true)} className="hover:text-white transition-colors">Archive</button>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="text-sm font-mono tracking-tighter">© 2026 BSTECH. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
