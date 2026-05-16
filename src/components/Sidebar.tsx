import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const BRANDS = ['Apple', 'LG', 'KitchenAid', 'SMEG', 'Samsung', 'Sony', 'Remez', 'Bose', 'Retro-Tech', 'BSTech'];

interface SidebarProps {
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  onReset: () => void;
}

export default function Sidebar({ selectedBrands, onBrandToggle, onReset }: SidebarProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  return (
    <aside className="w-64 hidden xl:block shrink-0 pt-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
          Reset filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {selectedBrands.map(brand => (
          <button 
            key={brand}
            onClick={() => onBrandToggle(brand)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-card-bg border border-white/10 rounded-full text-xs font-medium hover:bg-white/5"
          >
            {brand}
            <X size={12} className="opacity-40" />
          </button>
        ))}
      </div>

      <div className="space-y-8">
        <div>
          <button 
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <span className="text-lg font-medium">Price</span>
            {isPriceOpen ? <ChevronUp size={20} className="text-white/40 group-hover:text-white" /> : <ChevronDown size={20} className="text-white/40 group-hover:text-white" />}
          </button>
          {isPriceOpen && (
            <div className="space-y-4">
              <div className="h-1 bg-white/10 rounded-full relative">
                <div className="absolute left-0 right-1/4 h-full bg-neon rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-neon rounded-full border-4 border-dark-bg cursor-pointer" />
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-neon rounded-full border-4 border-dark-bg cursor-pointer" />
              </div>
              <div className="flex justify-between text-xs font-mono text-white/40">
                <span>$0</span>
                <span>$5000</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 pt-8">
          <button 
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <span className="text-lg font-medium">Brand</span>
            {isBrandOpen ? <ChevronUp size={20} className="text-white/40 group-hover:text-white" /> : <ChevronDown size={20} className="text-white/40 group-hover:text-white" />}
          </button>
          
          {isBrandOpen && (
            <div className="space-y-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search brands"
                  className="w-full bg-card-bg border border-white/5 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-neon/30 transition-colors"
                />
              </div>
              
              <div className="space-y-3">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand.toUpperCase())}
                        onChange={() => onBrandToggle(brand.toUpperCase())}
                        className="peer appearance-none w-5 h-5 border-2 border-white/10 rounded checked:bg-neon checked:border-neon transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-dark-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
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
