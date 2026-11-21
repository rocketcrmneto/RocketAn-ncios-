import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Search,
  MessageCircle,
  Instagram,
  Megaphone,
  LayoutTemplate,
  Store,
  Sparkles,
  Link2,
  ArrowRight,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Zap,
  User,
  Eye,
  ExternalLink,
} from 'lucide-react';
import {
  SERVICES_DATA,
  SERVICE_CATEGORY_FILTERS,
  COMBOS_DATA,
  CLIENT_SHOWCASES,
  ServiceCategoryGroup,
  ServiceId,
  FAQ_DATA,
  getWhatsAppLink,
  trackWhatsAppClick,
  INSTAGRAM_URL,
} from '../constants';
import { AutoCroppedImage } from './AutoCroppedImage';
import { NavTabId } from './SidebarNav';
import { ServiceVisualPreview } from './ServiceVisualPreview';
import { LiveDemoModal, LiveDemoType } from './LiveDemoModal';

interface DashboardWorkspaceProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  logoUrl?: string | null;
  netoPhotoUrl?: string | null;
  onOpenPrivacyModal: () => void;
}

const SERVICE_ICONS: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  'meta-ads': Megaphone,
  'landing-page': LayoutTemplate,
  'site-catalogo': Store,
  'catalogo-ia': Sparkles,
  'link-bio': Link2,
};

export const DashboardWorkspace: React.FC<DashboardWorkspaceProps> = ({
  activeTab,
  onSelectTab,
  logoUrl,
  netoPhotoUrl,
  onOpenPrivacyModal,
}) => {
  const [selectedOverviewService, setSelectedOverviewService] = useState<ServiceId>('meta-ads');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategoryGroup>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [netoError, setNetoError] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_DATA[0]?.id || null);
  const [liveDemoType, setLiveDemoType] = useState<LiveDemoType | null>(null);
  const [liveDemoClientId, setLiveDemoClientId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const openLiveDemo = (demo: LiveDemoType, clientId?: string) => {
    setLiveDemoClientId(clientId || null);
    setLiveDemoType(demo);
  };

  const handleSelectOverviewService = (id: ServiceId) => {
    setSelectedOverviewService(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.28,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeCurve,
    },
  });

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = categoryFilter === 'todos' || s.categoryGroup === categoryFilter;
    const matchesQuery =
      !normalizedQuery ||
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.shortTitle.toLowerCase().includes(normalizedQuery) ||
      s.categoryLabel.toLowerCase().includes(normalizedQuery) ||
      s.tagline.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeTab) ||
    SERVICES_DATA.find((s) => s.id === selectedOverviewService) ||
    SERVICES_DATA[0];

  const isSingleServiceTab = SERVICES_DATA.some((s) => s.id === activeTab);

  return (
    <div className="flex-1 flex flex-col min-w-0 relative z-10 text-[#132033]">
      {/* Top Bar inside Creamy Clay Workspace */}
      <header className="px-4 sm:px-7 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-slate-300/60">
        <div className="flex items-center gap-3 shrink-0 order-1">
          <div className="lg:hidden px-3 py-1.5 rounded-2xl bg-[#1E2E42] clay-card-dark">
            {logoUrl && !logoError ? (
              <AutoCroppedImage
                src={logoUrl}
                alt="Rocket Anúncios"
                onError={() => setLogoError(true)}
                className="h-6 w-auto max-w-[125px] object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-display font-extrabold text-sm text-white">
                Rocket <span className="text-[#38BDF8]">Anúncios</span>
              </span>
            )}
          </div>
          <span className="hidden lg:inline font-display font-extrabold text-xl text-[#132033] tracking-tight">
            Rocket Studio
          </span>
        </div>

        {/* Recessed Search Well (moves cleanly to full-width 2nd row on mobile) */}
        <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:max-w-sm">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'overview') onSelectTab('overview');
              }}
              placeholder="Buscar serviço (catálogo, IA, bio)..."
              aria-label="Buscar serviço"
              className="w-full bg-[#F7FAFD] rounded-full pl-9 pr-4 py-2.5 text-xs text-[#132033] placeholder:text-[#64748B] clay-card focus:outline-none focus:ring-2 focus:ring-[#7C52E8]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 order-2 sm:order-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @rocketanuncios"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7FAFD] flex items-center justify-center text-[#475569] hover:text-[#EA580C] clay-btn"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('Top Bar WhatsApp CTA')}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] font-display font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full clay-btn whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Falar com Neto</span>
          </a>
        </div>
      </header>

      {/* Main Dynamic Workspace (extra bottom padding on mobile so floating WhatsApp never overlaps actions) */}
      <main className="flex-1 p-3.5 sm:p-6 lg:p-7 pb-24 lg:pb-7 space-y-5 sm:space-y-6">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: easeCurve }}
            className="space-y-5 sm:space-y-6"
          >
              {/* Sculpted Hero Banner */}
              <motion.div
                {...fadeUp(0)}
                className="rounded-[28px] bg-gradient-to-br from-[#2B3F57] via-[#223247] to-[#1A2738] p-5 sm:p-7 clay-card-dark relative overflow-hidden text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3 text-left">
                    {/* Mobile Compact Neto Introduction */}
                    <div className="flex md:hidden items-center gap-3 pb-1">
                      <div className="w-11 h-11 rounded-full p-0.5 bg-[#15202E] clay-well-dark shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#24364B]">
                          {netoPhotoUrl && !netoError ? (
                            <img
                              src={netoPhotoUrl}
                              alt="Neto - Rocket Anúncios"
                              onError={() => setNetoError(true)}
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#38BDF8]">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="font-display font-bold text-xs text-white block">
                          Neto · Rocket Anúncios
                        </span>
                        <span className="text-[11px] text-[#7DD3FC] block">
                          Fortaleza, CE · Atendimento direto
                        </span>
                      </div>
                    </div>

                    <motion.p {...fadeUp(0.05)} className="hidden md:block text-xs font-semibold text-[#7DD3FC]">
                      Rocket Anúncios · Fortaleza, CE
                    </motion.p>
                    <motion.h1
                      {...fadeUp(0.1)}
                      className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight leading-[1.15] [text-wrap:balance]"
                    >
                      Anúncios, Sites e Catálogos com valores transparentes.
                    </motion.h1>
                    <motion.p {...fadeUp(0.15)} className="text-sm text-[#D6E1EE] max-w-lg">
                      Escolha a solução ideal para sua loja vender todos os dias pelo WhatsApp.
                    </motion.p>
                    <motion.div {...fadeUp(0.2)} className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('Hero Banner CTA')}
                        className="inline-flex items-center gap-2 bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white font-display font-bold text-xs sm:text-sm px-6 py-3 rounded-full clay-btn whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span>Solicitar orçamento</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onSelectTab('about')}
                        className="text-xs sm:text-sm font-semibold text-[#E2E8F0] hover:text-white px-5 py-2.5 rounded-full bg-[#334963] clay-btn cursor-pointer whitespace-nowrap"
                      >
                        Ver dúvidas
                      </button>
                    </motion.div>
                  </div>

                  <motion.div {...fadeUp(0.16)} className="hidden md:flex md:col-span-4 justify-end">
                    <div className="w-44 h-44 rounded-[28px] p-1.5 bg-[#15202E] clay-well-dark relative">
                      <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#24364B] clay-orb relative">
                        {netoPhotoUrl && !netoError ? (
                          <img
                            src={netoPhotoUrl}
                            alt="Neto - Rocket Anúncios"
                            onError={() => setNetoError(true)}
                            className="w-full h-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#38BDF8]">
                            <User className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B121D]/90 to-transparent px-3 py-2 text-[11px] font-display font-semibold text-white">
                          Atendimento direto
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Category Filters + 5 Service Cards with Transparent Pricing */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="font-display font-extrabold text-sm sm:text-base text-[#132033]">
                      Serviços & Valores
                    </h2>
                    <p className="text-xs text-[#52637A]">
                      Selecione uma categoria para ver a prévia interativa
                    </p>
                  </div>

                  <div
                    role="group"
                    aria-label="Filtrar categorias"
                    className="flex items-center gap-1 p-1.5 rounded-full bg-[#DCE4EE] clay-well overflow-x-auto max-w-full"
                  >
                    {SERVICE_CATEGORY_FILTERS.map((cat) => {
                      const isActive = categoryFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategoryFilter(cat.id)}
                          className={`px-3.5 py-1.5 text-xs font-display rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-[#F7FAFD] text-[#132033] font-bold clay-pill-active'
                              : 'text-[#52637A] hover:text-[#132033] font-medium'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {filteredServices.length === 0 ? (
                  <div className="rounded-[24px] bg-[#E2E9F2] p-6 text-center text-sm text-[#475569] clay-well">
                    Nenhum serviço encontrado para “{searchQuery}”.{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('todos');
                      }}
                      className="text-[#0284C7] font-semibold underline cursor-pointer ml-1"
                    >
                      Mostrar todos
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
                    {filteredServices.map((service, idx) => {
                      const Icon = SERVICE_ICONS[service.id];
                      const isSelected = selectedOverviewService === service.id;
                      return (
                        <motion.button
                          key={service.id}
                          type="button"
                          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.26,
                            delay: shouldReduceMotion ? 0 : idx * 0.035,
                            ease: easeCurve,
                          }}
                          onClick={() => handleSelectOverviewService(service.id)}
                          className={`text-left rounded-[22px] sm:rounded-[26px] bg-gradient-to-b ${service.cardTintClass} p-3.5 sm:p-4 clay-card-interactive cursor-pointer flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-3 sm:min-h-[178px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
                            isSelected ? 'ring-2 ring-[#7C3AED]/80' : ''
                          }`}
                        >
                          {/* Mobile Left / Desktop Top */}
                          <div className="flex items-center sm:items-start sm:justify-between gap-3 sm:gap-2 min-w-0 sm:mb-2">
                            <div
                              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 clay-orb ${service.iconBgClass}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Mobile Inline Title & Tagline */}
                            <div className="sm:hidden min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#52637A] block">
                                {service.categoryLabel}
                              </span>
                              <h3 className="font-display font-extrabold text-sm text-[#132033] leading-tight truncate">
                                {service.shortTitle}
                              </h3>
                              <p className="text-[11px] text-[#475569] leading-snug line-clamp-1 mt-0.5">
                                {service.tagline}
                              </p>
                            </div>

                            {/* Desktop Top-Right Price */}
                            <div className="hidden sm:block text-right">
                              <span className="font-mono-nums font-bold text-lg text-[#132033] block leading-none">
                                {service.priceDisplay}
                              </span>
                              <span className="text-[10px] font-medium text-[#475569] block mt-1 leading-tight">
                                {service.priceSub}
                              </span>
                            </div>
                          </div>

                          {/* Mobile Right Price */}
                          <div className="sm:hidden text-right shrink-0">
                            <span className="font-mono-nums font-bold text-base text-[#132033] block leading-none">
                              {service.priceDisplay}
                            </span>
                            <span className="text-[10px] font-medium text-[#475569] block mt-1 leading-tight">
                              {service.priceSub}
                            </span>
                          </div>

                          {/* Desktop Bottom Copy */}
                          <div className="hidden sm:block">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52637A] block mb-0.5">
                              {service.categoryLabel}
                            </span>
                            <h3 className="font-display font-extrabold text-sm text-[#132033] leading-tight mb-1">
                              {service.shortTitle}
                            </h3>
                            <p className="text-[11px] text-[#475569] leading-snug line-clamp-2">
                              {service.tagline}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Bento Row: Creamy Clay Preview + Combos & Por que escolher a Rocket */}
              <div ref={previewRef} className="grid grid-cols-1 lg:grid-cols-12 gap-5 scroll-mt-16">
                {/* Left: Selected Service Live Preview */}
                <div className="lg:col-span-7 rounded-[26px] sm:rounded-[28px] bg-[#F7FAFD] p-4 sm:p-6 clay-card flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <span className="text-[#7C3AED]">{activeService.categoryLabel}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-mono-nums text-[#132033]">
                            {activeService.fullPriceSummary}
                          </span>
                        </div>
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#132033] mt-0.5">
                          {activeService.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectTab(activeService.id)}
                        className="text-xs font-display font-bold text-[#132033] bg-[#E5ECF4] px-4 py-2 rounded-full clay-btn cursor-pointer whitespace-nowrap"
                      >
                        Ver detalhes
                      </button>
                    </div>

                    <ServiceVisualPreview
                      serviceId={activeService.id}
                      onOpenLiveDemo={openLiveDemo}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#475569]">
                      {activeService.highlights.map((h, i) => (
                        <React.Fragment key={h}>
                          {i > 0 && <span className="text-slate-400">·</span>}
                          <span>{h}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <a
                      href={getWhatsAppLink(activeService.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(`Overview Preview CTA (${activeService.shortTitle})`)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] font-display font-bold text-xs px-5 py-3 rounded-full clay-btn whitespace-nowrap shrink-0"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right: Ready-Made Combos + Why Rocket */}
                <div className="lg:col-span-5 rounded-[26px] sm:rounded-[28px] bg-[#F7FAFD] p-4 sm:p-6 clay-card flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <h3 className="font-display font-extrabold text-base text-[#132033]">
                        Combos Prontos com Desconto
                      </h3>
                      <button
                        type="button"
                        onClick={() => onSelectTab('about')}
                        className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer whitespace-nowrap"
                      >
                        Dúvidas
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      {COMBOS_DATA.map((combo) => (
                        <div
                          key={combo.id}
                          className={`rounded-[22px] bg-gradient-to-br ${combo.tintClass} p-4 clay-card flex flex-col gap-2.5`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] block">
                                {combo.savingsLabel}
                              </span>
                              <h4 className="font-display font-extrabold text-sm text-[#132033]">
                                {combo.name}
                              </h4>
                              <p className="text-[11px] text-[#475569] mt-0.5">
                                {combo.includes}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[11px] font-mono-nums line-through text-[#64748B] block">
                                {combo.originalPrice}
                              </span>
                              <span className="font-mono-nums font-bold text-lg text-[#132033] block leading-none">
                                {combo.promoPrice}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <span className="text-[10px] font-medium text-[#52637A]">
                              {combo.billingNote}
                            </span>
                            <a
                              href={getWhatsAppLink(combo.whatsappMessage)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackWhatsAppClick(`Combo CTA (${combo.name})`)}
                              className="inline-flex items-center gap-1 bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white font-display font-bold text-[11px] px-3.5 py-1.5 rounded-full clay-btn whitespace-nowrap"
                            >
                              <span>Quero este combo</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Trust Highlights */}
                    <div className="space-y-2.5">
                      {[
                        {
                          icon: ShieldCheck,
                          title: 'Sem fidelidade de 3 meses',
                          sub: 'Meta Ads R$ 600/mês sem multa',
                          orb: 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white',
                        },
                        {
                          icon: Zap,
                          title: 'Direto com o Neto',
                          sub: 'Alinhamento rápido via WhatsApp',
                          orb: 'bg-gradient-to-br from-[#34D399] to-[#059669] text-white',
                        },
                      ].map((row) => {
                        const RowIcon = row.icon;
                        return (
                          <div
                            key={row.title}
                            className="flex items-center gap-3 rounded-2xl bg-[#E8EEF5] p-3 clay-well"
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 clay-orb ${row.orb}`}
                            >
                              <RowIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-display font-bold text-xs text-[#132033] truncate">
                                {row.title}
                              </p>
                              <p className="text-[11px] text-[#52637A] truncate">{row.sub}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Client Portfolio Strip */}
              <div className="rounded-[26px] sm:rounded-[28px] bg-[#F7FAFD] p-4 sm:p-6 clay-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#132033]">
                      Projetos Reais no Ar
                    </h3>
                    <p className="text-xs text-[#52637A]">
                      Toque em qualquer loja para visualizar o site real funcionando
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openLiveDemo('link-bio', 'stilosa-prata')}
                    className="text-xs font-display font-bold text-[#7C3AED] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    Abrir todos os modelos
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                  {CLIENT_SHOWCASES.map((client) => {
                    const isCatalog = client.serviceType === 'site-catalogo';
                    return (
                      <div
                        key={client.id}
                        className={`rounded-[22px] bg-gradient-to-br ${client.accentBgClass} p-4 clay-card flex flex-col justify-between gap-3`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52637A]">
                              {client.serviceLabel}
                            </span>
                            <a
                              href={client.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Abrir site de ${client.name} em nova aba`}
                              className="w-7 h-7 rounded-full bg-[#F7FAFD] flex items-center justify-center text-[#475569] hover:text-[#132033] clay-btn shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <h4 className="font-display font-extrabold text-sm text-[#132033] truncate">
                            {client.name}
                          </h4>
                          <p className="text-[11px] text-[#475569] truncate">{client.niche}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openLiveDemo(client.serviceType, client.id)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 font-display font-bold text-[11px] px-3.5 py-2.5 rounded-full clay-btn cursor-pointer whitespace-nowrap ${
                            isCatalog
                              ? 'bg-gradient-to-b from-[#60A5FA] to-[#2563EB] text-white'
                              : 'bg-gradient-to-b from-[#34D399] to-[#059669] text-white'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver prévia ao vivo</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Individual Service Focus View */}
          {isSingleServiceTab && (
            <motion.div
              key={activeService.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: easeCurve }}
            >
              <div className="rounded-[28px] bg-[#F7FAFD] p-6 sm:p-8 clay-card">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <button
                      type="button"
                      onClick={() => onSelectTab('overview')}
                      className="text-xs font-display font-bold text-[#7C3AED] hover:underline cursor-pointer"
                    >
                      ← Voltar para todos os serviços
                    </button>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#52637A] block mb-1">
                        {activeService.categoryLabel}
                      </span>
                      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#132033] tracking-tight mb-2">
                        {activeService.title}
                      </h1>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-mono-nums font-bold text-2xl sm:text-3xl text-[#7C3AED]">
                          {activeService.priceDisplay}
                        </span>
                        <span className="text-xs font-medium text-[#52637A]">
                          {activeService.priceSub}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                        {activeService.tagline}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {activeService.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#132033]">
                          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href={getWhatsAppLink(activeService.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(`Service Focus CTA (${activeService.shortTitle})`)}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] font-display font-bold text-sm px-6 py-3.5 rounded-full clay-btn whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span>{activeService.ctaLabel}</span>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <ServiceVisualPreview
                      serviceId={activeService.id}
                      onOpenLiveDemo={openLiveDemo}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sobre & Dúvidas View */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: easeCurve }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* About Neto */}
              <div className="lg:col-span-5 rounded-[28px] bg-[#F7FAFD] p-5 sm:p-6 clay-card flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="h-56 rounded-[24px] p-2 bg-[#E3EAF2] clay-well">
                    <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#1D2B3F]">
                      {netoPhotoUrl && !netoError ? (
                        <img
                          src={netoPhotoUrl}
                          alt="Neto - Rocket Anúncios"
                          onError={() => setNetoError(true)}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#38BDF8]">
                          <User className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-xl text-[#132033]">
                      Neto · Rocket Anúncios
                    </h2>
                    <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                      Atendimento direto em Fortaleza e todo o Brasil. Cuido dos seus anúncios, páginas e catálogos para sua loja vender todos os dias pelo WhatsApp.
                    </p>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('About Tab WhatsApp CTA')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white font-display font-bold text-sm px-5 py-3.5 rounded-full clay-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                  <span>Conversar com o Neto</span>
                </a>
              </div>

              {/* FAQ Accordion */}
              <div className="lg:col-span-7 rounded-[28px] bg-[#F7FAFD] p-5 sm:p-6 clay-card flex flex-col justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[#132033] mb-4">
                    Dúvidas rápidas
                  </h2>

                  <div className="space-y-3">
                    {FAQ_DATA.map((faq) => {
                      const isOpen = openFaqId === faq.id;
                      return (
                        <div key={faq.id} className="rounded-2xl bg-[#E8EEF5] px-4 clay-well">
                          <button
                            type="button"
                            onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                            aria-expanded={isOpen}
                            className="w-full text-left py-4 flex items-center justify-between gap-4 cursor-pointer group"
                          >
                            <span className="font-display font-bold text-sm sm:text-base text-[#132033] group-hover:text-[#7C3AED] transition-colors">
                              {faq.question}
                            </span>
                            <span
                              className={`w-7 h-7 rounded-full bg-[#F7FAFD] flex items-center justify-center shrink-0 clay-orb transition-transform duration-200 ${
                                isOpen ? 'rotate-45 text-[#7C3AED]' : 'text-[#52637A]'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          {isOpen && (
                            <p className="pb-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#52637A]">
                  <span>© {new Date().getFullYear()} Rocket Anúncios · (85) 98150-8799</span>
                  <button
                    type="button"
                    onClick={onOpenPrivacyModal}
                    className="hover:text-[#132033] underline cursor-pointer"
                  >
                    Política de Privacidade
                  </button>
                </div>
              </div>
            </motion.div>
          )}
      </main>

      {/* Interactive Live Model Modal */}
      <LiveDemoModal
        demoType={liveDemoType}
        initialClientId={liveDemoClientId}
        onClose={() => setLiveDemoType(null)}
        onChangeDemo={(demo) => {
          setLiveDemoClientId(null);
          setLiveDemoType(demo);
        }}
      />
    </div>
  );
};
