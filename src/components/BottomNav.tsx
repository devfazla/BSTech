import React from 'react';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { useShop } from '../ShopContext';

interface BottomNavProps {
  activeView: 'home' | 'wishlist' | 'coming-soon';
  onNavigate: (view: 'home' | 'wishlist' | 'coming-soon') => void;
  onOpenCart: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate, onOpenCart }) => {
  const { cart, favorites } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100]">
      <div className="bg-dark-bg/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-3 flex items-center justify-around shadow-2xl">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            activeView === 'home' ? 'text-neon bg-white/5' : 'text-white/40 hover:text-white'
          }`}
        >
          <Home size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">Index</span>
        </button>

        <button 
          onClick={() => onNavigate('wishlist')}
          className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            activeView === 'wishlist' ? 'text-neon bg-white/5' : 'text-white/40 hover:text-white'
          }`}
        >
          <Heart size={20} className={favorites.length > 0 && activeView !== 'wishlist' ? "fill-neon/20 text-neon" : ""} />
          {favorites.length > 0 && (
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-neon rounded-full border border-dark-bg" />
          )}
          <span className="text-[8px] font-black uppercase tracking-widest">Signals</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 p-3 text-white/40 hover:text-white transition-all"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-neon text-dark-bg text-[10px] font-black rounded-lg flex items-center justify-center border border-dark-bg">
              {cartCount}
            </span>
          )}
          <span className="text-[8px] font-black uppercase tracking-widest">Cargo</span>
        </button>

        <button 
          onClick={() => onNavigate('coming-soon')}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            activeView === 'coming-soon' ? 'text-neon bg-white/5' : 'text-white/40 hover:text-white'
          }`}
        >
          <User size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
