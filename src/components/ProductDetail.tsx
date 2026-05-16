import { motion } from 'motion/react';
import { ArrowLeft, Star, Heart, Check, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.image);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] mx-auto px-6 py-8"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-12">
        <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
        <ChevronRight size={12} className="opacity-20" />
        <button onClick={onBack} className="hover:text-white transition-colors">Catalog</button>
        <ChevronRight size={12} className="opacity-20" />
        <span className="hover:text-white transition-colors">{product.brand}</span>
        <ChevronRight size={12} className="opacity-20" />
        <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-1 flex lg:flex-col gap-4">
          {(product.images || [product.image]).map((img, i) => (
            <button 
              key={i}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 rounded-xl overflow-hidden border transition-all ${
                mainImage === img ? 'border-neon' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="lg:col-span-6 relative aspect-square bg-card-bg rounded-3xl overflow-hidden border border-white/5">
          {product.badge && (
            <div className="absolute top-8 left-8 z-10 bg-neon text-dark-bg px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
              {product.badge}
            </div>
          )}
          
          <button className="absolute top-8 right-8 z-10 p-3 bg-white/5 backdrop-blur-md border border-white/5 rounded-full text-white/40 hover:text-white transition-all">
            <Heart size={24} />
          </button>

          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="absolute left-8 bottom-8 flex flex-col gap-4">
            {product.colors.map(color => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  selectedColor === color ? 'border-neon scale-125' : 'border-white/20'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">{product.brand}</span>
            <h1 className="text-4xl font-bold font-tech leading-tight tracking-tighter">
              {product.name.toUpperCase()}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-neon text-neon" />
                <span className="text-lg font-bold font-tech text-neon">{product.rating}</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-sm font-bold border-b border-white/20 group-hover:border-white/60 transition-colors">
                  {product.reviews.toLocaleString()} reviews
                </span>
                <ChevronRight size={14} className="text-white/40" />
              </div>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed max-w-md">
            {product.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold font-tech tracking-tighter">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Key features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neon" />
                  <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button className="w-full py-5 bg-neon text-dark-bg rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all">
              Buy Now
            </button>
            <button className="w-full py-5 border border-white/10 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/5 active:scale-[0.98] transition-all">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
