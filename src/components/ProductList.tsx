import { motion } from 'motion/react';
import { SlidersHorizontal, Heart, Search } from 'lucide-react';
import { Category } from '../types';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { useShop } from '../ShopContext';

interface ProductListProps {
  onProductClick: (id: string) => void;
}

const CATEGORIES: Category[] = ['All items', 'Smartphones', 'Kitchen', 'Game Console', 'TV & Video', 'Home Comfort'];

export default function ProductList({ onProductClick }: ProductListProps) {
  const { filteredProducts, selectedCategory, setSelectedCategory, searchQuery } = useShop();

  return (
    <div className="flex gap-12 max-w-[1400px] mx-auto px-6 py-8 relative items-start">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="mb-12">
          <div className="border-b border-white/5 mb-12 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-8 whitespace-nowrap">
              {['All items', 'Smartphones', 'Kitchen', 'Game Console', 'TV & Video', 'Home Comfort'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`text-xs font-bold uppercase tracking-widest pb-4 transition-all relative ${
                    selectedCategory === cat ? 'text-neon' : 'text-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_rgba(0,255,102,0.5)]"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={onProductClick} 
                />
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                <Search size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-tech font-bold uppercase">No data found</p>
                <p className="text-white/40 text-sm">Adjust your parameters or reset filters to continue.</p>
              </div>
              <button 
                onClick={() => setSelectedCategory('All items')}
                className="text-neon text-xs font-bold border-b border-neon/30 pb-0.5"
              >
                View all inventory
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
