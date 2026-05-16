import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../ShopContext';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useShop();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (checkoutStep === 'cart') setCheckoutStep('shipping');
    else if (checkoutStep === 'shipping') {
      setTimeout(() => {
        setCheckoutStep('success');
        clearCart();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-bg border-l border-white/5 z-[70] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-neon" size={24} />
                <h2 className="text-xl font-bold font-tech tracking-tighter">YOUR CART</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center text-neon mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-2xl font-bold font-tech">ORDER PLACED!</h3>
                  <p className="text-white/40">Your futuristic gear is being prepared for hyper-speed delivery.</p>
                  <button 
                    onClick={() => { onClose(); setTimeout(() => setCheckoutStep('cart'), 500); }}
                    className="bg-neon text-dark-bg px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    Back to Catalog
                  </button>
                </div>
              ) : checkoutStep === 'shipping' ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Shipping Details</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-neon/50 outline-none" />
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-neon/50 outline-none" />
                    <input type="text" placeholder="Shipping Address" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-neon/50 outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="City" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-neon/50 outline-none" />
                      <input type="text" placeholder="ZIP" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-neon/50 outline-none" />
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-bold">Payment Method</p>
                    <p className="text-sm font-medium">Demo Credit Card (Ending in 4242)</p>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingBag size={64} className="mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-white/40">{item.brand}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-3 bg-white/5 rounded-md px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-neon transition-colors"><Minus size={14} /></button>
                            <span className="text-xs font-bold tabular-nums">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-neon transition-colors"><Plus size={14} /></button>
                          </div>
                          <span className="text-sm font-bold text-neon">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="p-6 border-t border-white/5 bg-white/[0.02] space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="font-bold tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-neon font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg border-t border-white/5 pt-4">
                  <span className="font-tech font-bold tracking-tighter">TOTAL</span>
                  <span className="text-neon font-bold tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-neon text-dark-bg py-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                >
                  {checkoutStep === 'cart' ? 'PROCEED TO CHECKOUT' : 'PLACE ORDER'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
