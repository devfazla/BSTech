import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Product, CartItem, Category } from './types';
import { products as initialProducts } from './data';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: Category;
  selectedBrands: string[];
  selectedRating: number | null;
  selectedColors: string[];
  priceRange: [number, number];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: Category) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedRating: (rating: number | null) => void;
  setSelectedColors: (colors: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  filteredProducts: Product[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All items');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = initialProducts;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All items' || 
                             (selectedCategory === 'Sale' && product.oldPrice) ||
                             product.category === selectedCategory;
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesRating = !selectedRating || product.rating >= selectedRating;

      const matchesColors = selectedColors.length === 0 || 
                           product.colors.some(color => selectedColors.includes(color));
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesColors;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, selectedRating, selectedColors]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <ShopContext.Provider value={{
      products, cart, favorites, searchQuery, selectedCategory, selectedBrands, selectedRating, selectedColors, priceRange,
      isCartOpen, setIsCartOpen,
      setSearchQuery, setSelectedCategory, setSelectedBrands, setSelectedRating, setSelectedColors, setPriceRange,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleFavorite, isFavorite,
      filteredProducts
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
