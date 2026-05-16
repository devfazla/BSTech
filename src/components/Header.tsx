import { motion } from 'motion/react';
import { Search, ShoppingCart, User, Menu, Heart } from 'lucide-react';
import { useShop } from '../ShopContext';
import { useState } from 'react';

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { cart, favorites, searchQuery, setSearchQuery, setSelectedCategory } = useShop();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-12 shrink-0">
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); setSelectedCategory('All items'); }}
            className="text-2xl font-bold font-tech tracking-tighter"
          >
            BSTech
          </a>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => setSelectedCategory('Trending' as any)}
              className="text-sm font-medium text-neon hover:opacity-80 transition-opacity"
            >
              Trending
            </button>
            <button 
              onClick={() => setSelectedCategory('Sale')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Sale
            </button>
            <button 
              onClick={() => setSelectedCategory('Favorites')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <Heart size={14} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""} />
              Favorites
            </button>
          </nav>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 p-2 text-white/60 hover:text-white transition-colors"
          >
            <ShoppingCart size={22} />
            <span className="hidden md:block text-sm font-medium">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 md:right-auto md:left-6 bg-neon text-dark-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          
          <button className="flex items-center gap-2 p-2 text-white/60 hover:text-white transition-colors">
            <User size={22} />
            <span className="hidden md:block text-sm font-medium">Log in</span>
          </button>
        </div>
      </div>
    </header>
  );
}
