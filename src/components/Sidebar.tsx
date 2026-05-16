import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../ShopContext';

const BRANDS = ['Apple', 'LG', 'KitchenAid', 'SMEG', 'Samsung', 'Sony', 'Remez', 'Bose', 'Retro-Tech', 'BSTech'];

export default function Sidebar() {
  const { 
    selectedBrands, 
    setSelectedBrands, 
    priceRange, 
    setPriceRange,
    setSelectedCategory
  } = useShop();
  
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [brandSearch, setBrandSearch] = useState('');

  const onBrandToggle = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const onReset = () => {
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSelectedCategory('All items');
  };

  const filteredBrands = BRANDS.filter(b => 
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside className="w-64 hidden xl:block shrink-0 pt-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Filters</h3>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-bold text-neon hover:opacity-80 transition-opacity"
        >
          <X size={12} />
          RESET
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
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
        {/* Price Filter */}
        <div className="border-t border-white/5 pt-8">
          <button 
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <span className="text-sm font-bold uppercase tracking-wider">Price Range</span>
            {isPriceOpen ? <ChevronUp size={16} className="text-white/40 group-hover:text-white" /> : <ChevronDown size={16} className="text-white/40 group-hover:text-white" />}
          </button>
          
          {isPriceOpen && (
            <div className="space-y-6 px-1">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase">Min</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-xs">$</span>
                    <input 
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-6 pr-2 text-xs font-mono focus:outline-none focus:border-neon/30"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase">Max</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-xs">$</span>
                    <input 
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-6 pr-2 text-xs font-mono focus:outline-none focus:border-neon/30"
                    />
                  </div>
                </div>
              </div>
              
              <input 
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-neon bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="border-t border-white/5 pt-8">
          <button 
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            className="flex items-center justify-between w-full mb-6 group"
          >
            <span className="text-sm font-bold uppercase tracking-wider">Brands</span>
            {isBrandOpen ? <ChevronUp size={16} className="text-white/40 group-hover:text-white" /> : <ChevronDown size={16} className="text-white/40 group-hover:text-white" />}
          </button>
          
          {isBrandOpen && (
            <div className="space-y-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-neon/30 transition-colors"
                />
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
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
                    <span className="text-xs font-medium text-white/40 group-hover:text-white transition-colors uppercase tracking-wider">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
