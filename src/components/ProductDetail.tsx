import { motion } from 'motion/react';
import { Star, Heart, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';
import { useShop } from '../ShopContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { toggleFavorite, isFavorite, addToCart } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.image);

  const favorite = isFavorite(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] mx-auto px-6 py-8"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-12 font-mono tracking-tighter">
        <button onClick={onBack} className="hover:text-neon transition-colors uppercase">HOME</button>
        <ChevronRight size={10} className="opacity-20" />
        <button onClick={onBack} className="hover:text-neon transition-colors uppercase">CATALOG</button>
        <ChevronRight size={10} className="opacity-20" />
        <span className="text-neon/60 uppercase">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-1 flex lg:flex-col gap-4 order-2 lg:order-1 overflow-x-auto no-scrollbar">
          {(product.images || [product.image]).map((img, i) => (
            <button 
              key={i}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border transition-all ${
                mainImage === img ? 'border-neon shadow-[0_0_10px_rgba(0,255,102,0.3)]' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="lg:col-span-6 relative aspect-square bg-card-bg rounded-3xl overflow-hidden border border-white/5 order-1 lg:order-2">
          {product.badge && (
            <div className="absolute top-8 left-8 z-10 bg-neon text-dark-bg px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-xl">
              {product.badge}
            </div>
          )}
          
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={`absolute top-8 right-8 z-10 p-4 backdrop-blur-md border rounded-full transition-all ${
              favorite 
                ? "bg-red-500/10 border-red-500/20 text-red-500" 
                : "bg-white/5 border-white/5 text-white/40 hover:text-white"
            }`}
          >
            <Heart size={24} fill={favorite ? "currentColor" : "none"} />
          </button>

          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="absolute right-8 bottom-8 flex lg:flex-col gap-4">
            {product.colors.map(color => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-4 transition-all hover:scale-110 ${
                  selectedColor === color ? 'border-neon ring-4 ring-neon/20 shadow-lg' : 'border-white/20'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10 order-3">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">{product.brand}</span>
            <h1 className="text-5xl font-bold font-tech leading-none tracking-tighter uppercase">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-neon/10 px-3 py-1 rounded-full">
                <Star size={16} className="fill-neon text-neon" />
                <span className="text-lg font-bold font-tech text-neon">{product.rating}</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-sm font-bold text-white/40 border-b border-white/5 group-hover:text-white group-hover:border-white/20 transition-all uppercase tracking-tighter">
                  {product.reviews.toLocaleString()} Technical Reviews
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-lg leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-bold font-tech tracking-tighter">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-2xl font-tech text-white/10 line-through tracking-tighter">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-[10px] font-bold text-neon uppercase tracking-widest">+ Free hyper-speed shipping included</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-2">Specification Matrix</h3>
            <ul className="grid grid-cols-1 gap-4">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_rgba(0,255,102,0.6)] group-hover:scale-150 transition-transform" />
                  <span className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={() => { addToCart(product); onBack(); }}
              className="flex-1 py-5 bg-neon text-dark-bg rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Initialize Order
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 py-5 border border-white/10 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 hover:border-white/20 active:scale-[0.98] transition-all"
            >
              <ShoppingCart size={20} />
              Add to Buffer
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
