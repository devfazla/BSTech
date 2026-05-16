import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ChevronRight, ShoppingCart, Info, ShieldCheck, Zap, Users } from 'lucide-react';
import { Product } from '../types';
import { useState, useEffect, MouseEvent } from 'react';
import { useShop } from '../ShopContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onProductClick: (id: string) => void;
}

export default function ProductDetail({ product, onBack, onProductClick }: ProductDetailProps) {
  const { toggleFavorite, isFavorite, addToCart } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.image);
  const [visibleReviews, setVisibleReviews] = useState(6);

  // Reset state when product changes to fix switching bug
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setMainImage(product.image);
    setVisibleReviews(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

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
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square">
            {product.badge && (
              <div className="absolute top-8 left-8 z-20 bg-neon text-dark-bg px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-xl pointer-events-none">
                {product.badge}
              </div>
            )}
            
            <button 
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-8 right-8 z-20 p-4 backdrop-blur-md border rounded-full transition-all ${
                favorite 
                  ? "bg-red-500/10 border-red-500/20 text-red-500" 
                  : "bg-white/5 border-white/5 text-white/40 hover:text-white"
              }`}
            >
              <Heart size={24} fill={favorite ? "currentColor" : "none"} />
            </button>

            <ZoomImage src={mainImage} alt={product.name} />

            <div className="absolute right-8 bottom-8 flex gap-3 z-10">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedColor === color ? 'border-neon ring-4 ring-neon/20 shadow-lg' : 'border-white/20'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {(product.images || [product.image]).map((img, i) => (
              <button 
                key={i}
                onMouseEnter={() => setMainImage(img)}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                  mainImage === img 
                    ? 'border-neon ring-4 ring-neon/10' 
                    : 'border-white/5 hover:border-white/20 blur-[0.5px] hover:blur-0'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">{product.brand}</span>
            <h1 className="text-5xl font-bold font-tech leading-none tracking-tighter uppercase">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-neon/10 px-3 py-1 rounded-full border border-neon/10">
                <Star size={16} className="fill-neon text-neon" />
                <span className="text-lg font-bold font-tech text-neon">{product.rating}</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-sm font-bold text-white/40 border-b border-white/5 group-hover:text-white group-hover:border-white/20 transition-all uppercase tracking-tighter">
                  {product.reviews.toLocaleString()} Input Cycles
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
            <p className="text-[10px] font-bold text-neon uppercase tracking-widest">+ Priority distribution protocols active</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-2">Core Attributes</h3>
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
              Confirm Deployment
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

      <div className="mt-32 space-y-48">
        {/* Engineering Specifications */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neon">
                <Info size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module Specifications</span>
              </div>
              <h2 className="text-5xl font-bold font-tech tracking-tighter uppercase">Engineering Blueprint</h2>
            </div>
            <p className="max-w-md text-white/40 text-sm leading-relaxed">
              Detailed technical parameters and hardware architecture optimized for maximum industrial throughput and interface stability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] group-hover:text-white/40 transition-colors">{spec.label}</span>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-neon transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-10 bg-dark-bg border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-neon/10 transition-colors">
                  <ShieldCheck size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center text-neon">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-tight">Security & Build</h4>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Built with aeronautical grade composites and secure boot protocols to ensure data integrity and physical longevity in high-stress environments.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-dark-bg border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-neon/10 transition-colors">
                  <Zap size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center text-neon">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-tight">Performance Flow</h4>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Optimized energy distribution algorithms reduce latency by 45% while maintaining consistent thermal thresholds during peak operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Reviews */}
        <section id="reviews" className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neon">
                <Users size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Consensus Data</span>
              </div>
              <h2 className="text-5xl font-bold font-tech tracking-tighter uppercase">User Feedback Loop</h2>
            </div>
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-bold font-tech text-neon leading-none">{product.rating}</div>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-neon text-neon' : 'text-white/10'} />
                  ))}
                </div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-3">Aggregate Index</div>
              </div>
              
              <div className="hidden sm:flex flex-col gap-2 min-w-[200px]">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.userReviews.filter(r => r.rating === star).length;
                  const percentage = product.userReviews.length > 0 ? (count / product.userReviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-white/20 w-4">{star}</span>
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-neon/40"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/20 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {product.userReviews.slice(0, visibleReviews).map((review, idx) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-white/10 transition-all flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} className={idx < review.rating ? 'fill-neon text-neon' : 'text-white/10'} />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{review.date}</span>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <p className="text-lg text-white/80 leading-relaxed font-medium italic relative">
                      <span className="absolute -top-4 -left-2 text-4xl text-neon/10 font-serif">"</span>
                      {review.comment}
                      <span className="absolute -bottom-6 -right-2 text-4xl text-neon/10 font-serif">"</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-5 mt-12 pt-8 border-t border-white/5">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-dark-bg p-0.5">
                        <img 
                          src={review.avatar} 
                          alt={review.user} 
                          className="w-full h-full rounded-[0.9rem] object-cover grayscale brightness-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 p-1 bg-neon text-dark-bg rounded-full border-2 border-dark-bg">
                        <ShieldCheck size={8} strokeWidth={3} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-neon transition-colors truncate">
                        {review.user}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1 h-1 rounded-full bg-neon animate-pulse" />
                        <span className="text-[9px] text-white/20 font-mono uppercase tracking-widest truncate">Verified Hardware Specialist</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic grid overlay */}
                  <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-neon/10 to-transparent" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {visibleReviews < product.userReviews.length && (
            <div className="flex flex-col items-center gap-8 pt-10">
              <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
              <button 
                onClick={() => setVisibleReviews(prev => prev + 6)}
                className="px-12 py-5 border border-white/5 bg-white/[0.02] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-neon hover:text-dark-bg hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all"
              >
                Initialize More Feedback
              </button>
            </div>
          )}
        </section>

        <RelatedProducts currentProduct={product} onProductClick={onProductClick} />
        <RecommendedProducts onProductClick={onProductClick} />
      </div>
    </motion.div>
  );
}

function RecommendedProducts({ onProductClick }: { onProductClick: (id: string) => void }) {
  const { products } = useShop();
  
  const recommended = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <h2 className="text-3xl font-bold font-tech tracking-tighter uppercase">Elite Recommendations</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommended.map(product => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group cursor-pointer bg-white/[0.01] p-4 rounded-3xl border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.03] overflow-hidden"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex items-center justify-between gap-4 px-2">
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-neon transition-colors truncate">{product.name}</h4>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">{product.category}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs font-bold text-neon">${product.price.toFixed(0)}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="relative w-full h-full cursor-zoom-in overflow-hidden rounded-[2.5rem] border border-white/5 bg-dark-bg/40 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-300 ease-out select-none pointer-events-none ${showZoom ? 'scale-[2.2]' : 'scale-100'}`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`
        }}
        referrerPolicy="no-referrer"
      />
      
      {/* Magnifier indicator crosshair */}
      {showZoom && (
        <div className="absolute inset-0 pointer-events-none border border-neon/10 pointer-events-none" />
      )}
    </div>
  );
}

function RelatedProducts({ currentProduct, onProductClick }: { currentProduct: Product, onProductClick: (id: string) => void }) {
  const { products } = useShop();
  
  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <h2 className="text-3xl font-bold font-tech tracking-tighter uppercase">Related Hardware</h2>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-bold text-neon uppercase tracking-widest border-b border-neon/30 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          View All Matrix
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map(product => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative aspect-square bg-card-bg rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-neon/20 transition-colors">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-1 px-1">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{product.brand}</span>
              <h4 className="text-sm font-bold text-white group-hover:text-neon transition-colors line-clamp-1">{product.name}</h4>
              <div className="text-lg font-bold font-tech text-white/90">${product.price.toFixed(2)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
