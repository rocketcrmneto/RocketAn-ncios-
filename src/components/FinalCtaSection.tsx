import React from 'react';
import { MessageCircle, Rocket } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '../constants';

export const FinalCtaSection: React.FC = () => {
  const handleCtaClick = () => {
    trackWhatsAppClick('Final CTA Section Button');
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#07131F] to-[#0D1D2D] border-b border-[#22D3EE]/10 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9F1C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#22D3EE]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Rocket Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE]/20 to-[#FF9F1C]/20 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mx-auto mb-8 shadow-xl">
          <Rocket className="w-8 h-8 text-[#22D3EE]" />
        </div>

        {/* Title */}
        <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight mb-6">
          Seu concorrente já aparece no celular do cliente. Sua loja também pode.
        </h2>

        {/* Subtitle */}
        <p className="font-inter text-lg sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto mb-10 leading-relaxed">
          Converse com a Rocket Anúncios e descubra como criar uma estratégia para atrair mais compradores.
        </p>

        {/* Main WhatsApp Button */}
        <div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-3 bg-[#FF9F1C] hover:bg-[#e08914] text-[#07131F] font-sora font-extrabold text-lg sm:text-xl px-9 py-5 rounded-2xl shadow-2xl shadow-[#FF9F1C]/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-center"
          >
            <MessageCircle className="w-7 h-7 fill-current" />
            <span>Falar com o Neto no WhatsApp</span>
          </a>
        </div>

        {/* Location Guarantee */}
        <p className="text-xs text-[#CBD5E1] mt-6 font-inter font-medium">
          🚀 Atendimento em Gestão de Tráfego Pago na Meta Ads para lojas de Fortaleza e Região
        </p>

      </div>
    </section>
  );
};
