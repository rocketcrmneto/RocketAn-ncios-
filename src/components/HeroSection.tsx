import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '../constants';
import { AdFlowShowcase } from './AdFlowShowcase';

export const HeroSection: React.FC = () => {
  const handleCtaClick = () => {
    trackWhatsAppClick('Hero Main CTA');
  };

  return (
    <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Ultra-Direct Headline */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-medium text-[#22D3EE] mb-4"
            >
              Meta Ads para Lojistas · Fortaleza, CE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-[clamp(2.2rem,4.2vw,3.5rem)] tracking-tight text-[#F4F6FB] leading-[1.1] mb-5 [text-wrap:balance]"
            >
              Mais clientes no seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#67E8F9] to-[#FF9F1C]">
                WhatsApp
              </span>{' '}
              todos os dias.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-[44ch] mb-8"
            >
              Anúncios no Instagram e Facebook para sua loja vender mais. Direto ao ponto e sem fidelidade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-9"
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                className="cta-sheen inline-flex items-center justify-center gap-2.5 bg-[#FF9F1C] hover:bg-[#f09110] text-[#080C14] font-display font-bold text-sm sm:text-base px-7 py-4 rounded-xl transition-transform duration-150 active:scale-[0.97] shadow-[0_8px_30px_rgba(255,159,28,0.26)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>Quero anunciar minha loja</span>
              </a>

              <a
                href="#metodo"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#CBD5E1] hover:text-[#F4F6FB] px-3 py-3 transition-colors duration-150 whitespace-nowrap"
              >
                <span>Como funciona</span>
                <ArrowDownRight className="w-4 h-4 text-[#22D3EE]" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="pt-5 border-t border-white/[0.07] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#94A3B8]"
            >
              <span className="text-[#F4F6FB] font-medium">Sem contrato mínimo de 3 meses</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Verba paga direto à Meta</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Atendimento direto</span>
            </motion.div>
          </div>

          {/* Right Column: Visual Interactive Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <AdFlowShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
