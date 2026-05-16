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
    <div className="flex gap-12 max-w-[1400px] mx-auto px-6 py-8">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-6 font-mono tracking-tighter">
            <span>HQ</span>
            <span className="opacity-20">/</span>
            <span className="text-neon/60 uppercase">{selectedCategory}</span>
            {searchQuery && (
              <>
                <span className="opacity-20">/</span>
                <span className="text-white/60">"{searchQuery}"</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold tracking-tighter font-tech uppercase">
                {selectedCategory === 'Favorites' ? (
                  <span className="flex items-center gap-4">
                    Favorites <Heart className="text-red-500 fill-red-500" size={40} />
                  </span>
                ) : selectedCategory === 'Sale' ? (
                  "Flash Sale"
                ) : searchQuery ? (
                  "Search Results"
                ) : (
                  "Trending"
                )}
              </h1>
              <p className="text-white/40 font-medium max-w-md">
                {selectedCategory === 'Favorites' 
                  ? "Access your curated selection of high-performance gear."
                  : "Discover the pinnacle of consumer electronics and industrial design."}
              </p>
            </div>
            
            <div className="flex items-center gap-8 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
              <nav className="flex items-center gap-6 whitespace-nowrap">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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
