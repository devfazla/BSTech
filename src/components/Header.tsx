import { motion } from 'motion/react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-bold font-tech tracking-tighter">
            BSTech
          </a>
          
          <button className="hidden md:flex items-center gap-2 bg-neon text-dark-bg px-4 py-2 rounded-lg border border-neon hover:opacity-90 transition-opacity">
            <Menu size={18} strokeWidth={3} />
            <span className="text-sm font-bold">Catalog</span>
          </button>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-neon hover:opacity-80 transition-opacity">Trending</a>
            <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Sale</a>
            <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">New Arrivals</a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <Search size={22} />
          </button>
          
          <button className="flex items-center gap-2 p-2 text-white/60 hover:text-white transition-colors">
            <ShoppingCart size={22} />
            <span className="hidden md:block text-sm font-medium">Cart</span>
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
