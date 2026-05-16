import { X, Search, ChevronDown, ChevronUp, SlidersHorizontal, Star, Box, Palette } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../ShopContext';
import { Category } from '../types';

const BRANDS = ['Apple', 'LG', 'KitchenAid', 'SMEG', 'Samsung', 'Sony', 'Remez', 'Bose', 'Retro-Tech', 'BSTech'];
const CATEGORIES: Category[] = ['All items', 'Smartphones', 'Kitchen', 'Game Console', 'TV & Video', 'Home Comfort', 'Sale'];
const COLORS = ['#000000', '#FFFFFF', '#71717A', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#7C3AED'];

export default function Sidebar() {
  const { 
    selectedBrands, 
    setSelectedBrands, 
    priceRange, 
    setPriceRange,
    setSelectedCategory,
    selectedCategory,
    selectedRating,
    setSelectedRating,
    selectedColors,
    setSelectedColors
  } = useShop();
  
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [brandSearch, setBrandSearch] = useState('');

  const onBrandToggle = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const onColorToggle = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color)
        ? selectedColors.filter(c => c !== color)
        : [...selectedColors, color]
    );
  };

  const onReset = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setPriceRange([0, 2000]);
    setSelectedCategory('All items');
  };

  const filteredBrands = BRANDS.filter(b => 
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside className="w-68 hidden xl:flex flex-col shrink-0 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pr-4 pb-20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon/10 rounded-lg text-neon">
            <SlidersHorizontal size={14} strokeWidth={3} />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Interface</h3>
        </div>
        <button 
          onClick={onReset}
          className="text-[10px] font-black text-white/20 hover:text-neon transition-colors uppercase tracking-widest"
        >
          Reset All
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 shrink-0">
        {selectedBrands.map(brand => (
          <button 
            key={brand}
            onClick={() => onBrandToggle(brand)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neon/10 border border-neon/20 rounded-full text-[10px] font-bold text-neon hover:bg-neon/20 transition-colors uppercase"
          >
            {brand}
            <X size={10} />
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {/* Category Filter */}
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <div className="flex items-center gap-3">
              <Box size={14} className="text-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-neon transition-colors">Categories</span>
            </div>
            {isCategoryOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
          </button>
          
          {isCategoryOpen && (
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat 
                      ? 'bg-neon text-dark-bg' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
          <button 
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-neon transition-colors">Value Range</span>
            </div>
            {isPriceOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
          </button>
          
          {isPriceOpen && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter ml-1">Threshold_Min</span>
                  <div className="bg-dark-bg/50 border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neon/40">$</span>
                    <input 
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="bg-transparent w-full text-xs font-mono text-right outline-none text-white/80"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter ml-1">Threshold_Max</span>
                  <div className="bg-dark-bg/50 border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neon/40">$</span>
                    <input 
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="bg-transparent w-full text-xs font-mono text-right outline-none text-white/80"
                    />
                  </div>
                </div>
              </div>
              
              <div className="relative h-6 flex items-center">
                <div className="absolute inset-x-0 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-neon shadow-[0_0_10px_rgba(0,255,102,0.5)]"
                    style={{ width: `${(priceRange[1] / 2000) * 100}%` }}
                  />
                </div>
                <input 
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="absolute inset-x-0 w-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute w-4 h-4 bg-neon rounded-full border-4 border-dark-bg shadow-lg pointer-events-none transition-transform"
                  style={{ left: `calc(${(priceRange[1] / 2000) * 100}% - 8px)` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
          <button 
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-neon transition-colors">Brands</span>
            {isBrandOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
          </button>
          
          {isBrandOpen && (
            <div className="space-y-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Filter brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-[10px] focus:outline-none focus:border-neon/30 transition-colors uppercase tracking-widest"
                />
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {filteredBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group py-1">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => onBrandToggle(brand)}
                        className="peer appearance-none w-4 h-4 border-2 border-white/10 rounded checked:bg-neon checked:border-neon transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                        <svg className="w-2.5 h-2.5 text-dark-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-white/20 group-hover:text-white transition-colors uppercase tracking-widest">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
          <button 
            onClick={() => setIsRatingOpen(!isRatingOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <div className="flex items-center gap-3">
              <Star size={14} className="text-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-neon transition-colors">Rating Threshold</span>
            </div>
            {isRatingOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
          </button>
          
          {isRatingOpen && (
            <div className="space-y-3">
              {[5, 4, 3].map(rating => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all ${
                    selectedRating === rating 
                      ? 'border-neon/50 bg-neon/5 text-neon' 
                      : 'border-white/5 hover:bg-white/5 text-white/40'
                  }`}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < rating ? 'fill-current' : 'opacity-20'} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold">{rating}+</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
          <button 
            onClick={() => setIsColorOpen(!isColorOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <div className="flex items-center gap-3">
              <Palette size={14} className="text-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-neon transition-colors">Color Buffer</span>
            </div>
            {isColorOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
          </button>
          
          {isColorOpen && (
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => onColorToggle(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-lg ${
                    selectedColors.includes(color) 
                      ? 'border-neon ring-4 ring-neon/20 scale-110' 
                      : 'border-white/10'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
