import React from 'react';
import { EyeOff, TrendingUp, AlertTriangle } from 'lucide-react';

export const ProblemsSection: React.FC = () => {
  const problems = [
    {
      icon: EyeOff,
      title: 'Atenção limitada',
      description: 'Depender apenas do fluxo passivo de clientes limita o crescimento da sua loja.',
    },
    {
      icon: TrendingUp,
      title: 'Concorrência ativa',
      description: 'Seus concorrentes já aparecem diariamente na tela do seu público no Instagram.',
    },
    {
      icon: AlertTriangle,
      title: 'Anúncios sem estratégia',
      description: 'Apenas apertar em impulsionar gasta verba sem gerar conversas qualificadas no WhatsApp.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#07131F] border-b border-[#22D3EE]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#FF9F1C] font-sora font-semibold text-xs sm:text-sm tracking-wider uppercase bg-[#FF9F1C]/10 px-3.5 py-1 rounded-full border border-[#FF9F1C]/20 inline-block mb-3">
            O Cenário Atual
          </span>
          <h2 className="font-sora text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
            Seu produto é bom. Mas ele está sendo visto por quem quer comprar?
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-[#0D1D2D] border border-[#22D3EE]/15 rounded-2xl p-6 sm:p-8 hover:border-[#22D3EE]/40 transition-all duration-300 flex flex-col items-start group relative overflow-hidden shadow-lg"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9F1C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-11 h-11 rounded-xl bg-[#FF9F1C]/10 border border-[#FF9F1C]/20 flex items-center justify-center text-[#FF9F1C] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-sora text-lg sm:text-xl font-bold text-[#F8FAFC] mb-2">
                  {problem.title}
                </h3>

                <p className="font-inter text-sm text-[#CBD5E1] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

