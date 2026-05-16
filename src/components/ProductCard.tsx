import { Star, Heart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useShop } from '../ShopContext';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  key?: string | number;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { toggleFavorite, isFavorite, addToCart } = useShop();
  const favorite = isFavorite(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-[4/3] bg-card-bg rounded-2xl overflow-hidden mb-6 border border-white/5 group-hover:border-neon/20 transition-colors">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-neon text-dark-bg px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,102,0.4)]">
            {product.badge}
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
          <button 
            className={`p-2 backdrop-blur-md border rounded-full transition-all ${
              favorite 
                ? "bg-red-500/10 border-red-500/20 text-red-500" 
                : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
          </button>
          
          <button 
            className="p-2 bg-neon text-dark-bg rounded-full hover:bg-white transition-all shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{product.brand}</span>
          <div className="flex items-center gap-1.5 bg-neon/10 px-2 py-0.5 rounded-full">
            <Star size={10} className="fill-neon text-neon" />
            <span className="text-[10px] font-bold font-tech text-neon">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white/90 group-hover:text-neon transition-colors line-clamp-1 font-tech tracking-tight">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-tech tracking-tighter text-white">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs font-tech text-white/20 line-through tracking-tighter">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
