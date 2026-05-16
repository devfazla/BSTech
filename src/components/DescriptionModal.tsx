import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, title, description }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <div className="text-[10px] font-black text-neon uppercase tracking-[0.3em] mb-2">Technical Specification</div>
                  <h2 className="text-2xl md:text-3xl font-bold font-tech uppercase tracking-tighter">{title}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-neon hover:text-dark-bg rounded-2xl transition-all border border-white/5"
                  id="close-modal-btn"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-lg text-white/70 leading-relaxed font-medium">
                  {description}
                </p>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-neon text-dark-bg font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] transition-all"
                  id="dismiss-modal-btn"
                >
                  Confirm Awareness
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DescriptionModal;
