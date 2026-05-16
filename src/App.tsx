import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
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

      <footer className="w-full bg-white/[0.01] border-t border-white/5 pt-32 pb-20 mt-32 relative overflow-hidden">
        {/* Aesthetic background elements */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5 -z-10" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/5 -z-10" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
        
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <div className="text-3xl font-bold font-tech tracking-tighter uppercase text-neon drop-shadow-[0_0_10px_rgba(0,255,102,0.2)]">BSTECH</div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Precision hardware for the digital avant-garde. Engineered in the cloud, deployed across the physical matrix.
              </p>
            </div>
            
            <div className="space-y-4 pt-10 border-t border-white/5">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">System Status</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Global Matrix Operational</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neon">Navigation</h4>
              <ul className="space-y-4">
                <li><button onClick={() => { setShowWishlist(false); setSelectedProductId(null); }} className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all">Catalog</button></li>
                <li><button onClick={() => setShowWishlist(true)} className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all">Archive</button></li>
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Showcase</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neon">Protocols</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Support</a></li>
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Privacy</a></li>
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Terms</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neon">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Terminal</a></li>
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Signals</a></li>
                <li><a href="#" className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all block">Discord</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Action */}
          <div className="lg:col-span-3 space-y-8">
            <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neon">Join the Loop</div>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="ID@DOMAIN.COM" 
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-mono uppercase focus:border-neon/50 outline-none transition-all"
                />
                <button className="p-3 bg-white/5 hover:bg-neon hover:text-dark-bg rounded-xl border border-white/5 transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto px-6 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase">
            © 2026 BSTECH. Systems fully synchronized.
          </div>
          <div className="flex gap-12">
            <div className="text-[10px] font-mono text-white/10 italic">#EST.2024</div>
            <div className="text-[10px] font-mono text-white/10 uppercase">v4.0.2-release</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
