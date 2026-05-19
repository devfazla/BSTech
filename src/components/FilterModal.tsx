import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ChevronDown, ChevronUp, SlidersHorizontal, Star, Box, Palette } from 'lucide-react';
import { useShop } from '../ShopContext';
import { Category } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRANDS = ['Apple', 'LG', 'KitchenAid', 'SMEG', 'Samsung', 'Sony', 'Remez', 'Bose', 'Retro-Tech', 'BSTech'];
const CATEGORIES: Category[] = ['All items', 'Smartphones', 'Kitchen', 'Game Console', 'TV & Video', 'Home Comfort', 'Sale'];
const COLORS = ['#000000', '#FFFFFF', '#71717A', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#7C3AED'];

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="relative w-full max-w-lg bg-white/[0.03] border-t sm:border border-white/10 rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-dark-bg/40 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon/10 rounded-lg text-neon">
                  <SlidersHorizontal size={16} strokeWidth={3} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Advanced Matrix Filters</h3>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={onReset}
                  className="text-[10px] font-black text-white/20 hover:text-neon transition-colors uppercase tracking-widest"
                >
                  Clear
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 bg-white/5 hover:bg-neon hover:text-dark-bg rounded-xl border border-white/5 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar pb-20">
              {/* Category Filter */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Component Categories</span>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        selectedCategory === cat 
                          ? 'bg-neon text-dark-bg border-neon shadow-[0_0_15px_rgba(0,255,102,0.2)]' 
                          : 'bg-white/5 text-white/40 border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Value Threshold</span>
                <div className="relative h-6 flex items-center px-2">
                  <div className="absolute inset-x-2 h-1 bg-white/5 rounded-full overflow-hidden">
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
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute w-5 h-5 bg-neon rounded-full border-4 border-dark-bg shadow-lg pointer-events-none transition-transform"
                    style={{ left: `calc(${(priceRange[1] / 2000) * 100}% - 10px)` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neon/60 tracking-widest uppercase">
                  <span>$0</span>
                  <span className="text-white font-bold">${priceRange[1]}</span>
                  <span>$2k+</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Manufacturer Selection</span>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search manufacturers..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-neon/30 transition-colors uppercase tracking-widest font-mono"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {filteredBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => onBrandToggle(brand)}
                          className="peer appearance-none w-5 h-5 border-2 border-white/10 rounded-lg checked:bg-neon checked:border-neon transition-all"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                          <X className="w-3 h-3 text-dark-bg" strokeWidth={4} />
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        selectedBrands.includes(brand) ? 'text-neon' : 'text-white/30 group-hover:text-white'
                      }`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Chassis Colorway</span>
                <div className="flex flex-wrap gap-4">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => onColorToggle(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 shadow-lg ${
                        selectedColors.includes(color) 
                          ? 'border-neon ring-4 ring-neon/20 scale-110' 
                          : 'border-white/10'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="p-8 border-t border-white/10 bg-dark-bg/60 backdrop-blur-md">
              <button 
                onClick={onClose}
                className="w-full py-5 bg-neon text-dark-bg font-black uppercase tracking-[0.3em] text-xs rounded-[1.5rem] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] transition-all"
              >
                Sync Application Data
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
