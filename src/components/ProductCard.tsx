import { Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-[4/3] bg-card-bg rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-white/10 transition-colors">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-neon text-dark-bg px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {product.badge}
          </div>
        )}
        
        <button 
          className="absolute top-4 right-4 z-10 p-2 bg-white/5 backdrop-blur-md border border-white/5 rounded-full text-white/40 hover:text-neon hover:bg-white/10 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // wishlist logic
          }}
        >
          <Heart size={18} />
        </button>

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-neon text-neon" />
            <span className="text-xs font-bold font-tech text-neon">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-tech tracking-tighter">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm font-tech text-white/20 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{product.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}
