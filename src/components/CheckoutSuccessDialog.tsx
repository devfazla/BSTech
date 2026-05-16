import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Download, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useShop } from '../ShopContext';
import { CartItem } from '../types';

interface CheckoutSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    customer: {
      email: string;
      phone: string;
      address: string;
    };
    items: CartItem[];
    total: number;
    orderId: string;
    date: string;
  };
}

export default function CheckoutSuccessDialog({ isOpen, onClose, orderData }: CheckoutSuccessDialogProps) {
  const { clearCart } = useShop();

  const generateReceipt = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    // Header
    doc.setFontSize(22);
    doc.text('BSTech Order Receipt', margin, y);
    y += 15;

    doc.setFontSize(10);
    doc.text(`Order ID: ${orderData.orderId}`, margin, y);
    y += 7;
    doc.text(`Date: ${orderData.date}`, margin, y);
    y += 15;

    // Customer Info
    doc.setFontSize(12);
    doc.text('Customer Information', margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(`Email: ${orderData.customer.email}`, margin, y);
    y += 5;
    doc.text(`Phone: ${orderData.customer.phone}`, margin, y);
    y += 5;
    doc.text(`Address: ${orderData.customer.address}`, margin, y);
    y += 15;

    // Items
    doc.setFontSize(12);
    doc.text('Order Items', margin, y);
    y += 10;
    
    doc.setFontSize(10);
    orderData.items.forEach(item => {
      doc.text(`${item.name} x ${item.quantity}`, margin, y);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, y);
      y += 7;
    });

    y += 5;
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 10;

    doc.setFontSize(14);
    doc.text('Total Amount:', margin, y);
    doc.text(`$${orderData.total.toFixed(2)}`, 160, y);

    doc.save(`BSTech_Receipt_${orderData.orderId}.pdf`);
  };

  const handleContinueShopping = () => {
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-bg/60 backdrop-blur-2xl"
            onClick={handleContinueShopping}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon/0 via-neon to-neon/0" />
            
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-neon/10 flex items-center justify-center text-neon relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <CheckCircle2 size={56} strokeWidth={1.5} />
                </motion.div>
                <div className="absolute inset-0 rounded-full border border-neon/30 animate-ping opacity-20" />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h2 className="text-4xl font-bold font-tech uppercase tracking-tight">Order Deployed</h2>
              <p className="text-white/40 max-w-md mx-auto">
                Protocol successful. Your high-tech assets are being prioritized for immediate distribution. 
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={generateReceipt}
                className="flex items-center justify-center gap-3 py-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all group"
              >
                <Download size={16} className="text-neon group-hover:scale-110 transition-transform" />
                Archive Receipt
              </button>
              
              <button 
                onClick={handleContinueShopping}
                className="flex items-center justify-center gap-3 py-4 bg-neon text-dark-bg hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all group"
              >
                Continue Scouting
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-1">
                <span className="text-white/10">Order ID</span>
                <span className="text-white/40">{orderData.orderId}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/10">Timestamp</span>
                <span className="text-white/40">{orderData.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/10">Destination</span>
                <span className="text-white/40 truncate max-w-[150px]">{orderData.customer.address}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
