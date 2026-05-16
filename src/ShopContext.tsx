import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, CartItem, Category } from './types';
import { products as initialProducts } from './data';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: Category;
  selectedBrands: string[];
  priceRange: [number, number];
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: Category) => void;
  setSelectedBrands: (brands: string[]) => void;
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All items');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const products = initialProducts;

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All items' || 
                             (selectedCategory === 'Favorites' && favorites.includes(product.id)) ||
                             (selectedCategory === 'Sale' && product.oldPrice) ||
                             product.category === selectedCategory;
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, favorites]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
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
      products, cart, favorites, searchQuery, selectedCategory, selectedBrands, priceRange,
      setSearchQuery, setSelectedCategory, setSelectedBrands, setPriceRange,
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
