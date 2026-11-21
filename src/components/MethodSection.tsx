import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Smartphone, MessageCircle } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Target,
    title: 'Estratégia certa',
    desc: 'Colocamos seus melhores produtos na frente de quem já quer comprar.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Vídeos no celular',
    desc: 'Você grava clipes rápidos com nosso roteiro. Nós fazemos os anúncios.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Vendas no WhatsApp',
    desc: 'O cliente clica e cai direto no seu WhatsApp pronto para comprar.',
  },
];

export const MethodSection: React.FC = () => {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="metodo" className="py-16 sm:py-20 border-b border-white/[0.06] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#22D3EE] mb-2">Como funciona</p>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F6FB] tracking-tight">
              Simples em 3 passos.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Sem contrato de 3 meses · Pagamento direto à Meta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleCardMouseMove}
                className="spotlight-surface group bg-[#0B111C]/75 backdrop-blur-xl border border-white/[0.09] hover:border-[#22D3EE]/40 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono-nums text-xs font-semibold text-[#94A3B8]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F4F6FB] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
