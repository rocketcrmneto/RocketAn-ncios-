import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutGrid,
  Megaphone,
  LayoutTemplate,
  Store,
  Sparkles,
  Link2,
  UserCheck,
  MessageCircle,
  User,
} from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick, ServiceId } from '../constants';
import { AutoCroppedImage } from './AutoCroppedImage';

export type NavTabId = 'overview' | ServiceId | 'about';

interface SidebarNavProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  logoUrl?: string | null;
  netoPhotoUrl?: string | null;
}

const NAV_ITEMS: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutGrid },
  { id: 'meta-ads', label: 'Meta Ads', icon: Megaphone },
  { id: 'landing-page', label: 'Landing Page', icon: LayoutTemplate },
  { id: 'site-catalogo', label: 'Site Catálogo', icon: Store },
  { id: 'catalogo-ia', label: 'Catálogo IA', icon: Sparkles },
  { id: 'link-bio', label: 'Link da Bio', icon: Link2 },
  { id: 'about', label: 'Neto & Dúvidas', icon: UserCheck },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  logoUrl,
  netoPhotoUrl,
}) => {
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      {/* Desktop Dark Slate Rubber Sidebar (contrasts against light creamy workspace) */}
      <aside className="hidden lg:flex lg:w-[258px] shrink-0 flex-col justify-between bg-gradient-to-b from-[#25364B] to-[#1A2738] clay-sidebar p-5 relative z-10 text-[#F4F6FB]">
        <div>
          {/* Logo cleanly displayed on dark sidebar */}
          <div className="flex justify-center pb-4 mb-4 border-b border-white/10">
            {logoUrl && !logoError ? (
              <AutoCroppedImage
                src={logoUrl}
                alt="Rocket Anúncios"
                onError={() => setLogoError(true)}
                className="h-9 w-auto max-w-[180px] object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-display font-extrabold text-base text-[#F4F6FB]">
                Rocket <span className="text-[#38BDF8]">Anúncios</span>
              </span>
            )}
          </div>

          {/* Recessed Avatar Lockup */}
          <div className="flex flex-col items-center text-center pb-5 mb-5 border-b border-white/10">
            <div className="w-[74px] h-[74px] rounded-full p-1.5 bg-[#15202E] clay-well-dark mb-3">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#24364B] clay-orb">
                {netoPhotoUrl && !imgError ? (
                  <img
                    src={netoPhotoUrl}
                    alt="Neto - Rocket Anúncios"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#38BDF8]">
                    <User className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
            <span className="font-display font-bold text-sm text-[#F4F6FB]">
              Olá! Sou o Neto
            </span>
            <span className="text-[11px] text-[#B7C7D9] mt-0.5">
              Fortaleza, CE
            </span>
          </div>

          {/* Sculpted Pillow Nav Items */}
          <nav aria-label="Menu principal" className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                    isActive
                      ? 'text-[#132033] font-display font-bold'
                      : 'text-[#C6D4E4] hover:text-white hover:bg-white/[0.06] active:scale-[0.98]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FFFFFF] to-[#DDE6F0] clay-pill-active"
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 shrink-0 ${
                      isActive ? 'text-[#132033]' : 'text-[#9FB2C9]'
                    }`}
                  />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sculpted Highlight Card */}
        <div className="mt-6 rounded-[24px] bg-gradient-to-b from-[#2B3F57] to-[#1D2B3D] p-4 text-center clay-card-dark">
          <p className="font-display font-bold text-xs text-white mb-1">
            Atendimento Direto
          </p>
          <p className="text-[11px] text-[#C6D4E4] leading-snug mb-3.5">
            Sem fidelidade de 3 meses. Orçamento rápido.
          </p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('Sidebar WhatsApp CTA')}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] font-display font-bold text-xs px-3 py-2.5 rounded-2xl clay-btn whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>
      </aside>

      {/* Mobile Horizontal Pill Bar */}
      <nav
        aria-label="Menu rápido"
        className="lg:hidden sticky top-0 z-30 bg-[#1F2F43] border-b border-white/10 px-3 py-2.5 overflow-x-auto no-scrollbar snap-x"
      >
        <div className="flex items-center gap-2 min-w-max">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`snap-start inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap shrink-0 transition-transform active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-[#FFFFFF] to-[#DDE6F0] text-[#132033] font-display font-bold clay-pill-active'
                    : 'text-[#DCE5F0] bg-[#2D4159]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
