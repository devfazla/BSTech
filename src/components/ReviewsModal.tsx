import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShieldCheck, ChevronLeft, ChevronRight, MessageSquareCode } from 'lucide-react';
import { Review } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  reviews: Review[];
  rating: number;
}

const REVIEWS_PER_PAGE = 20;

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, productName, reviews, rating }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [reviews, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const container = document.getElementById('reviews-scroll-container');
      if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/90 backdrop-blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full h-full max-w-6xl md:h-[90vh] bg-white/[0.02] border border-white/10 md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-neon">
                    <MessageSquareCode size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Signal Archive</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-tech uppercase tracking-tighter leading-none">{productName}</h2>
                </div>
                
                <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-3xl font-bold font-tech text-neon">{rating}</div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < Math.floor(rating) ? 'fill-neon text-neon' : 'text-white/10'} />
                        ))}
                    </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="p-4 bg-white/5 hover:bg-neon hover:text-dark-bg rounded-2xl transition-all border border-white/5 group"
                id="close-reviews-modal"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div 
              id="reviews-scroll-container"
              className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {paginatedReviews.map((review, idx) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group relative p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.06] hover:border-white/10 transition-all flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={10} className={idx < review.rating ? 'fill-neon text-neon' : 'text-white/5'} />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{review.date}</span>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <p className="text-base text-white/70 leading-relaxed font-medium italic relative">
                        <span className="absolute -top-3 -left-1 text-3xl text-neon/5 font-serif italic">"</span>
                        {review.comment}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-dark-bg p-0.5">
                          <img 
                            src={review.avatar} 
                            alt={review.user} 
                            className="w-full h-full rounded-[0.5rem] object-cover grayscale brightness-125 group-hover:grayscale-0 transition-all duration-500" 
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 p-0.5 bg-neon text-dark-bg rounded-md border border-dark-bg">
                          <ShieldCheck size={8} strokeWidth={3} />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold uppercase tracking-[0.15em] text-white/90 group-hover:text-neon transition-colors truncate">
                          {review.user}
                        </h5>
                        <span className="block text-[8px] text-white/20 font-mono uppercase tracking-widest truncate mt-0.5">Verified Hardware Tech</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer / Pagination */}
            {totalPages > 1 && (
              <div className="p-8 md:p-10 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                  Index: Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-neon hover:text-dark-bg disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl font-mono text-xs transition-all border ${
                          currentPage === i + 1 
                          ? 'bg-neon text-dark-bg border-neon shadow-[0_0_15px_rgba(0,255,102,0.3)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-neon hover:text-dark-bg disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewsModal;
