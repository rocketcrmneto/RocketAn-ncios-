import React from 'react';
import { Users, Target, MessageSquare, ArrowRight, MessageCircle, Video, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '../constants';

export const SolutionSection: React.FC = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Segmentação Estratégica',
      description: 'Anúncios direcionados no Instagram e Facebook para o perfil exato de comprador em Fortaleza e região.',
    },
    {
      icon: Target,
      title: 'Copywriting & Direcionamento',
      description: 'Criamos os textos dos anúncios e orientamos o formato das fotos e vídeos que você grava da sua loja.',
    },
    {
      icon: MessageSquare,
      title: 'Foco Total no WhatsApp',
      description: 'Campanhas configuradas para o cliente ver o anúncio e iniciar conversa imediatamente com a sua equipe.',
    },
  ];

  const handleCtaClick = () => {
    trackWhatsAppClick('Solution Section CTA Button');
  };

  return (
    <section className="py-14 sm:py-20 bg-[#07131F] border-b border-[#22D3EE]/10 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#22D3EE] font-sora font-semibold text-xs sm:text-sm tracking-wider uppercase bg-[#22D3EE]/10 px-3.5 py-1 rounded-full border border-[#22D3EE]/20 inline-block mb-3">
            Gestão de Tráfego Pago na Meta Ads
          </span>
          <h2 className="font-sora text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight mb-4">
            Transforme a atenção das redes sociais em oportunidades no seu WhatsApp.
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#CBD5E1] max-w-2xl mx-auto">
            Trabalhamos de forma transparente e focada em resultados no Instagram e Facebook.
          </p>
        </div>

        {/* 3 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#0D1D2D] border border-[#22D3EE]/20 rounded-2xl p-6 sm:p-7 hover:border-[#22D3EE] transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-sora text-lg sm:text-xl font-bold text-[#F8FAFC] mb-2">
                    {benefit.title}
                  </h3>

                  <p className="font-inter text-sm text-[#CBD5E1] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Creative Partnership Box */}
        <div className="max-w-3xl mx-auto bg-[#0D1D2D]/90 border border-[#22D3EE]/20 rounded-2xl p-5 sm:p-6 mb-10 text-left flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF9F1C]/15 border border-[#FF9F1C]/30 flex-shrink-0 flex items-center justify-center text-[#FF9F1C]">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-sora font-bold text-sm sm:text-base text-[#F8FAFC] mb-1">
              Como funcionam as gravações dos anúncios?
            </h4>
            <p className="font-inter text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Você grava os vídeos e fotos dos seus produtos usando seu celular com as nossas orientações simples de luz, ângulo e destaque da oferta. Nós cuidamos do copywriting, estratégia e toda a gestão dos anúncios.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-3 bg-[#FF9F1C] hover:bg-[#e08914] text-[#07131F] font-sora font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl shadow-[#FF9F1C]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Falar no WhatsApp com o Neto</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
};

