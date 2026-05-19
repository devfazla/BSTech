import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Cpu, ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  onBack: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ onBack }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-neon/10 rounded-full blur-[100px] -z-10" />
        
        <div className="space-y-8 relative z-10">
          <div className="w-20 h-20 bg-neon/10 rounded-3xl flex items-center justify-center mx-auto border border-neon/20 shadow-[0_0_30px_rgba(0,255,102,0.1)]">
            <Terminal className="text-neon" size={32} />
          </div>
          
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-neon">Access Protocol 403</div>
            <h2 className="text-4xl font-bold font-tech uppercase tracking-tighter leading-none">Authentication Terminal Offline</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Our hardware authentication matrix is currently undergoing synchronization. Biometric and cloud bypass protocols will be deployed in the next update.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
              <Shield size={16} className="text-white/20" />
              <div className="text-[8px] font-black uppercase text-white/40">Secure Core</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
              <Cpu size={16} className="text-white/20" />
              <div className="text-[8px] font-black uppercase text-white/40">Crypto Auth</div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-neon hover:text-dark-bg transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Matrix
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
