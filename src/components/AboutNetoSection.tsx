import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, User } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick, INSTAGRAM_URL } from '../constants';

interface AboutNetoSectionProps {
  netoPhotoUrl?: string | null;
}

export const AboutNetoSection: React.FC<AboutNetoSectionProps> = ({ netoPhotoUrl }) => {
  const [imgError, setImgError] = useState(false);

  const handleCtaClick = () => {
    trackWhatsAppClick('About Neto WhatsApp Button');
  };

  return (
    <section id="sobre" className="py-16 sm:py-20 border-b border-white/[0.06] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0F1623]">
              {netoPhotoUrl && !imgError ? (
                <img
                  src={netoPhotoUrl}
                  alt="Neto - Rocket Anúncios"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] mb-3">
                    <User className="w-8 h-8" />
                  </div>
                  <span className="font-display font-bold text-lg text-[#F4F6FB]">Neto</span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080C14]/95 via-[#080C14]/60 to-transparent pt-14 pb-4 px-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display font-bold text-base text-[#F4F6FB]">Neto</p>
                  <p className="text-xs text-[#CBD5E1]">Gestor Meta Ads · Fortaleza, CE</p>
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] hover:text-[#F4F6FB] transition-colors whitespace-nowrap"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@rocketanuncios</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Direct Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col text-left"
          >
            <p className="text-xs sm:text-sm font-medium text-[#22D3EE] mb-3">
              Atendimento direto
            </p>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F6FB] tracking-tight leading-[1.15] mb-4 [text-wrap:balance]">
              Você fala direto com quem cuida dos seus anúncios.
            </h2>

            <p className="text-base text-[#94A3B8] leading-relaxed max-w-[48ch] mb-6">
              Sem burocracia de agência. Eu mesmo acompanho suas campanhas todos os dias com foco total em gerar mensagens no seu WhatsApp.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#CBD5E1] pb-7 mb-7 border-b border-white/[0.08]">
              <span>Otimização diária</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Roteiro simples de vídeo</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Suporte direto no WhatsApp</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                className="cta-sheen inline-flex items-center justify-center gap-2.5 bg-[#FF9F1C] hover:bg-[#f09110] text-[#080C14] font-display font-bold text-sm px-6 py-3.5 rounded-xl transition-transform duration-150 active:scale-[0.97] shadow-[0_6px_24px_rgba(255,159,28,0.22)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>Chamar no WhatsApp</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#CBD5E1] hover:text-[#F4F6FB] border border-white/[0.1] hover:border-white/[0.22] px-5 py-3.5 rounded-xl transition-colors duration-150 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#FF9F1C] shrink-0" />
                <span>@rocketanuncios</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
