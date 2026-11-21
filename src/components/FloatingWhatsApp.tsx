import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '../constants';

interface FloatingWhatsAppProps {
  netoPhotoUrl?: string | null;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = () => {
  const handleClick = () => {
    trackWhatsAppClick('Floating WhatsApp Button');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Falar no WhatsApp com o Neto"
        className="inline-flex items-center gap-2 bg-gradient-to-b from-[#4ADE80] to-[#16A34A] text-[#04210E] font-display font-bold text-xs sm:text-sm p-3.5 sm:px-4 sm:py-3 rounded-2xl clay-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
      </a>
    </div>
  );
};
