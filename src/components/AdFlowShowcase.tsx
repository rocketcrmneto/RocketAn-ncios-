import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import showcasePhoto from '/src/assets/images/ad_showcase_boutique_1795217214714.jpg';

const INCOMING_MESSAGES = [
  {
    sender: 'Camila · Fortaleza',
    text: 'Oi! Vi o anúncio no Instagram, ainda tem no tamanho M?',
  },
  {
    sender: 'Lucas · Aldeota',
    text: 'Quero garantir o combo da promoção. Como faço o pedido?',
  },
  {
    sender: 'Mariana · Atacado',
    text: 'Vocês enviam ainda hoje para o interior? Quero fechar 6 peças.',
  },
];

export const AdFlowShowcase: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % INCOMING_MESSAGES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const ry = ((x / rect.width) - 0.5) * 6;
      const rx = ((y / rect.height) - 0.5) * -6;
      setTilt({ rx, ry });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const triggerNextMessage = () => {
    setMsgIndex((prev) => (prev + 1) % INCOMING_MESSAGES.length);
  };

  const activeMessage = INCOMING_MESSAGES[msgIndex];

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="spotlight-surface bg-[#0B111C]/75 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-5 sm:p-6 shadow-[0_28px_70px_rgba(0,0,0,0.55)] will-change-transform"
      >
        <div className="relative z-10 flex flex-col gap-4">
          {/* Step 1 Visual: Sponsored Instagram / Meta Ad */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#080C14]">
            <div className="px-4 py-2.5 flex items-center justify-between text-xs border-b border-white/[0.06]">
              <span className="font-display font-semibold text-[#F4F6FB]">Sua Loja no Instagram</span>
              <span className="text-[#94A3B8]">Patrocinado</span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#121A2B]">
              {!imgError ? (
                <img
                  src={showcasePhoto}
                  alt="Vitrine de loja anunciada no Instagram"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111B2E] to-[#080C14] text-[#94A3B8]">
                  <ShoppingBag className="w-10 h-10 text-[#22D3EE] mb-2" />
                  <span className="text-xs font-medium">Anúncio da sua loja</span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080C14]/85 to-transparent pointer-events-none" />
            </div>

            {/* Ad Interactive Action Bar */}
            <button
              type="button"
              onClick={triggerNextMessage}
              className="w-full px-4 py-3 bg-[#131C2E] hover:bg-[#19243B] transition-colors flex items-center justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              <div>
                <span className="text-xs font-display font-semibold text-[#F4F6FB] block">
                  Enviar mensagem no WhatsApp
                </span>
                <span className="text-[11px] text-[#94A3B8]">
                  Toque para testar a chegada de um cliente
                </span>
              </div>
              <span className="w-8 h-8 rounded-lg bg-[#22D3EE]/15 text-[#22D3EE] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Animated Kinetic Flow Connector */}
          <div className="relative h-7 flex items-center justify-center" aria-hidden="true">
            <div className="w-px h-full bg-white/[0.12] relative overflow-hidden">
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#22D3EE] to-[#25D366]"
              />
            </div>
            <span className="absolute bg-[#0F1623] border border-white/[0.08] px-3 py-0.5 rounded-md text-[11px] text-[#94A3B8]">
              1 clique direto para sua loja
            </span>
          </div>

          {/* Step 2 Visual: Live WhatsApp Client Notification */}
          <div className="rounded-2xl border border-[#25D366]/30 bg-[#0A1712]/80 px-4 py-3.5 min-h-[76px] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>

            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-display font-semibold text-[#25D366] truncate">
                      {activeMessage.sender}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] shrink-0">Agora</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F4F6FB] truncate">
                    “{activeMessage.text}”
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
