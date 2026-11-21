import React from 'react';
import {
  PackageCheck,
  MapPin,
  Users,
  ShoppingBag,
  Headphones,
  Target,
  ShieldCheck,
} from 'lucide-react';

export const AnalysisSection: React.FC = () => {
  const analysisItems = [
    {
      icon: PackageCheck,
      title: 'Oferta & Produtos',
      desc: 'Atratividade dos seus produtos, preços e diferenciais competitivos.',
    },
    {
      icon: MapPin,
      title: 'Público Local & Região',
      desc: 'Mapeamento geográfico de compradores em Fortaleza e regiões estratégicas.',
    },
    {
      icon: Users,
      title: 'Perfil do Cliente',
      desc: 'Identificação detalhada das pessoas com maior probabilidade de comprar.',
    },
    {
      icon: ShoppingBag,
      title: 'Itens Prioritários',
      desc: 'Seleção dos produtos mais visuais e lucrativos para colocar nos anúncios.',
    },
    {
      icon: Headphones,
      title: 'Atendimento no WhatsApp',
      desc: 'Organização da rotina de resposta para converter os contatos recebidos em vendas.',
    },
    {
      icon: Target,
      title: 'Meta de Anúncios',
      desc: 'Definição clara do orçamento e das metas de conversas diárias.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#07131F] border-b border-[#22D3EE]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#22D3EE] font-sora font-semibold text-xs sm:text-sm tracking-wider uppercase bg-[#22D3EE]/10 px-3.5 py-1 rounded-full border border-[#22D3EE]/20 inline-block mb-3">
            Diagnóstico Inicial
          </span>
          <h2 className="font-sora text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
            O que analisamos antes de iniciar seus anúncios
          </h2>
        </div>

        {/* 6 Analysis Criteria Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {analysisItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#0D1D2D] border border-[#22D3EE]/15 rounded-2xl p-5 sm:p-6 hover:border-[#22D3EE]/40 transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sora text-base sm:text-lg font-bold text-[#F8FAFC] mb-1">
                    {item.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment to Truth & Integrity */}
        <div className="bg-[#0D1D2D]/80 border border-[#22D3EE]/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <ShieldCheck className="w-6 h-6 text-[#22D3EE] shrink-0" />
            <div>
              <h4 className="font-sora font-bold text-sm sm:text-base text-[#F8FAFC]">
                Compromisso com Transparência e Realidade
              </h4>
              <p className="font-inter text-xs text-[#CBD5E1]">
                Acompanhamento próximo, métricas reais no Gerenciador de Anúncios e foco em ajudar sua loja a crescer de forma sustentável.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

