import React, { useState } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick, INSTAGRAM_URL } from '../constants';
import { AutoCroppedImage } from './AutoCroppedImage';

interface FooterProps {
  logoUrl?: string | null;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl, onOpenPrivacyModal }) => {
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Footer WhatsApp Link');
  };

  return (
    <footer className="bg-[#060910]/80 backdrop-blur-md text-[#94A3B8] border-t border-white/[0.08] py-12 text-sm relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start space-y-3">
            {logoUrl && !logoError ? (
              <AutoCroppedImage
                src={logoUrl}
                alt="Rocket Anúncios"
                onError={() => setLogoError(true)}
                className="h-9 w-auto object-contain max-w-[200px]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-display font-extrabold text-lg tracking-tight text-[#F4F6FB]">
                Rocket <span className="text-[#22D3EE]">Anúncios</span>
              </span>
            )}

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Gestão de tráfego pago no Instagram e Facebook para lojistas em Fortaleza e região.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col space-y-2.5 text-xs sm:text-sm">
            <h4 className="font-display font-semibold text-[#F4F6FB] mb-1">
              Navegação
            </h4>
            <a href="#metodo" className="hover:text-[#F4F6FB] transition-colors w-fit">
              Como funciona
            </a>
            <a href="#sobre" className="hover:text-[#F4F6FB] transition-colors w-fit">
              Quem faz
            </a>
            <a href="#duvidas" className="hover:text-[#F4F6FB] transition-colors w-fit">
              Dúvidas
            </a>
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="text-left hover:text-[#F4F6FB] transition-colors w-fit cursor-pointer"
            >
              Privacidade
            </button>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4 flex flex-col space-y-2.5 text-xs sm:text-sm">
            <h4 className="font-display font-semibold text-[#F4F6FB] mb-1">
              Contato Direto
            </h4>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="hover:text-[#F4F6FB] transition-colors inline-flex items-center gap-2 w-fit"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span className="font-mono-nums">(85) 98150-8799</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F6FB] transition-colors inline-flex items-center gap-2 w-fit"
            >
              <Instagram className="w-4 h-4 text-[#FF9F1C] shrink-0" />
              <span>@rocketanuncios</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]/70 gap-3 text-center sm:text-left">
          <p>© {currentYear} Rocket Anúncios. Todos os direitos reservados.</p>
          <p>Fortaleza, Ceará · Meta Ads</p>
        </div>
      </div>
    </footer>
  );
};
