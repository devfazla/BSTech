import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard, Wallet, Cpu, Mail, Phone, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { useShop } from '../ShopContext';
import { useState, useMemo } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutSuccess: (data: any) => void;
}

type CheckoutStep = 'items' | 'shipping' | 'payment';

export default function CartDrawer({ isOpen, onClose, onCheckoutSuccess }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const [step, setStep] = useState<CheckoutStep>('items');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'neural'>('card');
  
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'INVALID_PROTOCOL_EMAIL';
    }
    if (!shippingInfo.phone.match(/^\+?[\d\s-]{8,}$/)) {
      newErrors.phone = 'INVALID_ENCRYPTION_PHONE';
    }
    if (shippingInfo.address.length < 10) {
      newErrors.address = 'BUFFER_LENGTH_INSUFFICIENT';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToShipping = () => setStep('shipping');
  const handleProceedToPayment = () => {
    if (validateShipping()) setStep('payment');
  };

  const handleConfirmOrder = () => {
    const orderData = {
      customer: shippingInfo,
      items: cart,
      total,
      orderId: `BST-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      date: new Date().toLocaleString(),
    };
    onCheckoutSuccess(orderData);
    onClose();
    setTimeout(() => setStep('items'), 500); // Reset for next time
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
            className="fixed inset-0 z-[60] bg-dark-bg/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg z-[70] bg-dark-bg border-l border-white/5 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon/10 rounded-xl text-neon">
                  {step === 'items' ? <ShoppingBag size={20} /> : step === 'shipping' ? <MapPin size={20} /> : <CreditCard size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-tech uppercase tracking-tight">
                    {step === 'items' ? 'Cart Manifest' : step === 'shipping' ? 'Logistics Protocol' : 'Transaction Terminal'}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <div className={`h-1 w-8 rounded-full ${step === 'items' ? 'bg-neon shadow-[0_0_8px_rgba(0,255,102,0.5)]' : 'bg-white/10'}`} />
                    <div className={`h-1 w-8 rounded-full ${step === 'shipping' ? 'bg-neon shadow-[0_0_8px_rgba(0,255,102,0.5)]' : 'bg-white/10'}`} />
                    <div className={`h-1 w-8 rounded-full ${step === 'payment' ? 'bg-neon shadow-[0_0_8px_rgba(0,255,102,0.5)]' : 'bg-white/10'}`} />
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-mono text-sm uppercase tracking-widest">Inventory empty</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {step === 'items' && (
                    <motion.div 
                      key="items"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group">
                          <div className="w-20 h-20 bg-dark-bg rounded-xl overflow-hidden border border-white/5 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-tight truncate group-hover:text-neon transition-colors">{item.name}</h4>
                              <p className="text-[10px] text-white/30 uppercase font-mono">{item.brand}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-dark-bg border border-white/10 rounded-lg p-1">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded transition-colors text-white/40"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded transition-colors text-white/40"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold font-tech">${(item.price * item.quantity).toFixed(2)}</div>
                                <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500/60 hover:text-red-500 uppercase font-bold tracking-tighter">Remove</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {step === 'shipping' && (
                    <motion.div 
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 flex items-center gap-2">
                            <Mail size={12} /> Network_Email
                          </label>
                          <input 
                            type="email"
                            value={shippingInfo.email}
                            onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})}
                            placeholder="USER@NETWORK.COM"
                            className={`w-full bg-white/[0.02] border ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 focus:border-neon/30'} rounded-2xl p-4 text-sm font-mono focus:outline-none transition-all placeholder:text-white/10`}
                          />
                          {errors.email && <p className="text-[9px] font-bold text-red-500/60 flex items-center gap-1 ml-1"><AlertCircle size={10} /> {errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 flex items-center gap-2">
                            <Phone size={12} /> Encrypted_Comm
                          </label>
                          <input 
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})}
                            placeholder="+XX XXX XXX XXXX"
                            className={`w-full bg-white/[0.02] border ${errors.phone ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 focus:border-neon/30'} rounded-2xl p-4 text-sm font-mono focus:outline-none transition-all placeholder:text-white/10`}
                          />
                          {errors.phone && <p className="text-[9px] font-bold text-red-500/60 flex items-center gap-1 ml-1"><AlertCircle size={10} /> {errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 flex items-center gap-2">
                            <MapPin size={12} /> Distribution_Node
                          </label>
                          <textarea 
                            rows={3}
                            value={shippingInfo.address}
                            onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}
                            placeholder="STREET, BUILDING, SECTOR, CITY..."
                            className={`w-full bg-white/[0.02] border ${errors.address ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 focus:border-neon/30'} rounded-2xl p-4 text-sm font-mono focus:outline-none transition-all placeholder:text-white/10 resize-none`}
                          />
                          {errors.address && <p className="text-[9px] font-bold text-red-500/60 flex items-center gap-1 ml-1"><AlertCircle size={10} /> {errors.address}</p>}
                        </div>
                      </div>

                      <div className="p-6 bg-neon/10 border border-neon/20 rounded-2xl flex items-start gap-4">
                        <ShieldCheck size={20} className="text-neon shrink-0 mt-1" />
                        <div className="space-y-1">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-neon">End-to-End Encryption</h5>
                          <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-tighter">Your logistics data is hashed and stored in secure sectors. We never broadcast your physical node identity.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 'payment' && (
                    <motion.div 
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { id: 'card', label: 'Credit Card', icon: CreditCard, desc: 'Classic Fiat Protocol' },
                          { id: 'crypto', label: 'Quantum Crypto', icon: Wallet, desc: 'BTC / ETH / SOL Gateways' },
                          { id: 'neural', label: 'Neural Link', icon: Cpu, desc: 'Direct Synapse Transfer' }
                        ].map(method => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${
                              paymentMethod === method.id 
                                ? 'border-neon bg-neon/5' 
                                : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-6 relative z-10">
                              <div className={`p-4 rounded-2xl transition-colors ${paymentMethod === method.id ? 'bg-neon text-dark-bg' : 'bg-white/5 text-white/40'}`}>
                                <method.icon size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold uppercase tracking-tight">{method.label}</h4>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-mono">{method.desc}</p>
                              </div>
                            </div>
                            {paymentMethod === method.id && (
                              <motion.div 
                                layoutId="payment-indicator"
                                className="absolute top-0 right-0 p-4"
                              >
                                <div className="w-2 h-2 bg-neon rounded-full shadow-[0_0_10px_rgba(0,255,102,1)]" />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                        <div className="flex justify-between text-xs font-mono uppercase text-white/20">
                          <span>Subtotal Manifest</span>
                          <span className="text-white/60">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono uppercase text-white/20">
                          <span>Distro Protocol</span>
                          <span className="text-neon">FREE_TIER</span>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Total Settlement</span>
                          <span className="text-3xl font-bold font-tech text-white">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                {step === 'items' && (
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-1">Total Payload</span>
                      <span className="text-3xl font-bold font-tech">${total.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleProceedToShipping}
                      className="w-full py-5 bg-neon text-dark-bg rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      Initialize Logistics
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
                {step === 'shipping' && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep('items')}
                      className="flex-1 py-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleProceedToPayment}
                      className="flex-[2] py-4 bg-neon text-dark-bg hover:shadow-[0_0_20px_rgba(0,255,102,0.2)] rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                    >
                      Authorize Payment
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
                {step === 'payment' && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep('shipping')}
                      className="flex-1 py-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleConfirmOrder}
                      className="flex-[2] py-4 bg-neon text-dark-bg hover:shadow-[0_0_40px_rgba(0,255,102,0.4)] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10">Confirm Deployment</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
