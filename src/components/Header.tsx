import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '../constants';
import { AutoCroppedImage } from './AutoCroppedImage';

interface HeaderProps {
  logoUrl?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl }) => {
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Header CTA Button');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#080C14]/85 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-[#080C14]/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand */}
        <a
          href="#"
          className="flex items-center whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-lg"
          aria-label="Rocket Anúncios - Início"
        >
          {logoUrl && !logoError ? (
            <AutoCroppedImage
              src={logoUrl}
              alt="Rocket Anúncios"
              onError={() => setLogoError(true)}
              className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-200 hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="font-display font-extrabold text-lg tracking-tight text-[#F4F6FB]">
              Rocket <span className="text-[#22D3EE]">Anúncios</span>
            </span>
          )}
        </a>

        {/* Zone 2: Concise Single-Line Nav Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]"
        >
          <a
            href="#metodo"
            className="relative py-1 hover:text-[#F4F6FB] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#22D3EE] hover:after:w-full after:transition-all after:duration-200"
          >
            Como funciona
          </a>
          <a
            href="#sobre"
            className="relative py-1 hover:text-[#F4F6FB] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#22D3EE] hover:after:w-full after:transition-all after:duration-200"
          >
            Quem faz
          </a>
          <a
            href="#duvidas"
            className="relative py-1 hover:text-[#F4F6FB] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#22D3EE] hover:after:w-full after:transition-all after:duration-200"
          >
            Dúvidas
          </a>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center shrink-0">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="cta-sheen inline-flex items-center gap-2 bg-[#FF9F1C] hover:bg-[#f09110] text-[#080C14] font-display font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-transform duration-150 active:scale-[0.97] whitespace-nowrap shrink-0 shadow-[0_4px_20px_rgba(255,159,28,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Falar com Neto</span>
          </a>
        </div>
      </div>

      <motion.div
        style={{ scaleX }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#FF9F1C] opacity-80"
      />
    </header>
  );
};
