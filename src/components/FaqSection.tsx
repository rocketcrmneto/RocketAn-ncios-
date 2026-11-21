import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQ_DATA, getWhatsAppLink, trackWhatsAppClick } from '../constants';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleCtaClick = () => {
    trackWhatsAppClick('FAQ Final Conversion CTA');
  };

  return (
    <section id="duvidas" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-medium text-[#22D3EE] mb-2">Dúvidas rápidas</p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4F6FB] tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        <div className="border-t border-white/[0.08] mb-16">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-md"
                >
                  <span
                    className={`font-display font-semibold text-sm sm:text-base transition-colors duration-150 ${
                      isOpen ? 'text-[#F4F6FB]' : 'text-[#CBD5E1] group-hover:text-[#F4F6FB]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border border-white/[0.1] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45 text-[#22D3EE] border-[#22D3EE]/40' : 'text-[#94A3B8] group-hover:text-[#F4F6FB]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 sm:pb-5 pr-10 text-sm text-[#94A3B8] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Final CTA */}
        <div className="relative rounded-3xl border border-white/[0.09] bg-[#0F1623]/80 backdrop-blur-xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-20 right-0 w-[340px] h-[180px] rounded-full opacity-25 blur-[80px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,159,28,0.4) 0%, transparent 75%)',
            }}
          />

          <div className="relative z-10 text-center sm:text-left">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F4F6FB] tracking-tight mb-1.5">
              Bora colocar sua loja para vender mais?
            </h3>
            <p className="text-sm text-[#94A3B8]">
              Fale direto com o Neto no WhatsApp e tire seu plano do papel hoje.
            </p>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="cta-sheen relative z-10 inline-flex items-center justify-center gap-2 bg-[#FF9F1C] hover:bg-[#f09110] text-[#080C14] font-display font-bold text-sm px-6 py-3.5 rounded-xl transition-transform duration-150 active:scale-[0.97] shadow-[0_8px_28px_rgba(255,159,28,0.28)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Falar no WhatsApp</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};
