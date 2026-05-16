import { motion } from 'motion/react';
import { ArrowLeft, Heart, Search, ShoppingBag } from 'lucide-react';
import { useShop } from '../ShopContext';
import ProductCard from './ProductCard';

interface WishlistProps {
  onBack: () => void;
  onProductClick: (id: string) => void;
  key?: string;
}

export default function Wishlist({ onBack, onProductClick }: WishlistProps) {
  const { products, favorites } = useShop();
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1400px] mx-auto px-6 py-8"
    >
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-12 font-mono tracking-tighter">
          <button onClick={onBack} className="hover:text-neon transition-colors uppercase">HOME</button>
          <span className="opacity-20">/</span>
          <span className="text-neon/60 uppercase">WISHLIST</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tighter font-tech uppercase flex items-center gap-6">
              Saved Gear <Heart className="text-red-500 fill-red-500" size={48} />
            </h1>
            <p className="text-white/40 font-medium max-w-md">
              Your curated collection of high-tech assets and futuristic hardware.
            </p>
          </div>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {favoriteProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick} 
              />
            ))}
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-white/10 group">
              <Heart size={48} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-tech font-bold uppercase">Wishlist is Empty</h3>
              <p className="text-white/40 max-w-sm mx-auto">
                No gadgets preserved in your archive. Start scouting for elite hardware.
              </p>
            </div>
            <button 
              onClick={onBack}
              className="bg-neon text-dark-bg px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all"
            >
              Start Scouting
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
