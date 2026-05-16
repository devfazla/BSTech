import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { Product, Category } from '../types';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

const CATEGORIES: Category[] = ['All items', 'Smartphones', 'Kitchen', 'Game Console', 'TV & Video', 'Home Comfort'];

export default function ProductList({ products, onProductClick }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All items');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'All items' || p.category === selectedCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand.toUpperCase());
    return categoryMatch && brandMatch;
  });

  return (
    <div className="flex gap-12 max-w-[1400px] mx-auto px-6 py-8">
      <Sidebar 
        selectedBrands={selectedBrands} 
        onBrandToggle={toggleBrand} 
        onReset={() => setSelectedBrands([])}
      />

      <main className="flex-1 min-w-0">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-6">
            <span>Home</span>
            <span className="opacity-20">/</span>
            <span className="text-white/60">Trending</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h1 className="text-5xl font-bold tracking-tighter font-tech">Trending</h1>
            
            <div className="flex items-center gap-8 border-b border-white/5 pb-1">
              <nav className="flex items-center gap-6">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-medium pb-2 transition-all relative ${
                      selectedCategory === cat ? 'text-neon' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <motion.div 
                        layoutId="activeCategory"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                      />
                    )}
                  </button>
                ))}
              </nav>
              
              <button className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors pb-2">
                <SlidersHorizontal size={16} />
                <span>Top rated</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick} 
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
