import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';
import { products } from './data';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(() => 
    selectedProductId ? products.find(p => p.id === selectedProductId) : null, 
    [selectedProductId]
  );

  return (
    <div id="app-root" className="min-h-screen bg-dark-bg text-white selection:bg-neon selection:text-dark-bg">
      <Header />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {!selectedProductId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductList 
                products={products} 
                onProductClick={setSelectedProductId} 
              />
            </motion.div>
          ) : selectedProduct ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setSelectedProductId(null)} 
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
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-[1400px] mx-auto px-6 py-20 border-t border-white/5 opacity-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold font-tech tracking-tighter">BSTech</div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Catalog</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="text-sm font-mono tracking-tighter">© 2026 BSTECH. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
