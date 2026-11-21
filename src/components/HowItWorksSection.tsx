import React from 'react';
import { Search, Rocket, LineChart } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Diagnóstico',
      description: 'Analisamos sua loja, seus produtos, público, oferta e atendimento.',
      icon: Search,
    },
    {
      stepNumber: '02',
      title: 'Campanha',
      description: 'Criamos e configuramos os anúncios para alcançar potenciais compradores.',
      icon: Rocket,
    },
    {
      stepNumber: '03',
      title: 'Otimização',
      description: 'Acompanhamos os dados e ajustamos a campanha para melhorar os resultados.',
      icon: LineChart,
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-[#07131F] border-b border-[#22D3EE]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#22D3EE] font-sora font-semibold text-xs sm:text-sm tracking-wider uppercase bg-[#22D3EE]/10 px-3.5 py-1 rounded-full border border-[#22D3EE]/20 inline-block mb-3">
            Passo a Passo
          </span>
          <h2 className="font-sora text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
            Como funciona a Gestão de Tráfego
          </h2>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#22D3EE]/30 via-[#FF9F1C]/30 to-[#22D3EE]/30 -translate-y-12 pointer-events-none" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-[#0D1D2D] border border-[#22D3EE]/15 rounded-2xl p-6 sm:p-8 relative z-10 flex flex-col items-start hover:border-[#22D3EE]/50 transition-all duration-300 shadow-xl group"
              >
                {/* Step Badge & Icon */}
                <div className="w-full flex items-center justify-between mb-6">
                  <span className="font-sora text-2xl font-extrabold text-[#FF9F1C] bg-[#FF9F1C]/10 px-3 py-1 rounded-lg border border-[#FF9F1C]/20">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sora text-xl font-bold text-[#F8FAFC] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
