import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onHome: () => void;
}

export default function NotFound({ onHome }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-9xl font-tech font-bold text-white/5 select-none">404</div>
        <h2 className="text-3xl font-bold tracking-tighter font-tech">SYSTEM ERROR: PAGE NOT FOUND</h2>
        <p className="text-white/40 max-w-md mx-auto">
          The requested resource could not be found or has been moved to another quadrant.
        </p>
        
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 bg-neon text-dark-bg px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity mt-8"
        >
          <Home size={20} />
          Return to HQ
        </button>
      </motion.div>
    </div>
  );
}
