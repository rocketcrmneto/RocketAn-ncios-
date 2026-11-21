import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Plus,
  Check,
  Monitor,
  Smartphone,
} from 'lucide-react';
import {
  CLIENT_SHOWCASES,
  getWhatsAppLink,
  SERVICES_DATA,
  trackWhatsAppClick,
} from '../constants';
import { LiveSiteFrame } from './LiveSiteFrame';
import studioPhoto from '/src/assets/images/ad_showcase_boutique_1795217214714.jpg';

export type LiveDemoType = 'landing-page' | 'site-catalogo' | 'link-bio';

interface LiveDemoModalProps {
  demoType: LiveDemoType | null;
  initialClientId?: string | null;
  onClose: () => void;
  onChangeDemo: (demo: LiveDemoType) => void;
}

const DEMO_PRODUCTS = [
  { id: 'p1', name: 'Conjunto Linho Natural', price: 189, cat: 'Novidades' },
  { id: 'p2', name: 'Trench Coat Bege', price: 299, cat: 'Mais vendidos' },
  { id: 'p3', name: 'Camisa Social Off-White', price: 149, cat: 'Novidades' },
  { id: 'p4', name: 'Blazer Alfaiataria Slim', price: 249, cat: 'Mais vendidos' },
];

const BIO_CLIENTS = CLIENT_SHOWCASES.filter((c) => c.serviceType === 'link-bio');
const CATALOG_CLIENTS = CLIENT_SHOWCASES.filter((c) => c.serviceType === 'site-catalogo');

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  demoType,
  initialClientId,
  onClose,
  onChangeDemo,
}) => {
  const [selectedSize, setSelectedSize] = useState<'P' | 'M' | 'G'>('M');
  const [catalogView, setCatalogView] = useState<'real' | 'simulator'>('real');
  const [catalogViewport, setCatalogViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [catalogCat, setCatalogCat] = useState<'Todos' | 'Novidades' | 'Mais vendidos'>('Todos');
  const [cartIds, setCartIds] = useState<string[]>(['p1']);
  const [selectedBioClientId, setSelectedBioClientId] = useState<string>(
    BIO_CLIENTS[0]?.id || 'stilosa-prata'
  );

  useEffect(() => {
    if (!initialClientId) return;
    const match = CLIENT_SHOWCASES.find((c) => c.id === initialClientId);
    if (match?.serviceType === 'link-bio') {
      setSelectedBioClientId(match.id);
    } else if (match?.serviceType === 'site-catalogo') {
      setCatalogView('real');
    }
  }, [initialClientId]);

  useEffect(() => {
    if (!demoType) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [demoType, onClose]);

  if (!demoType) return null;

  const serviceInfo = SERVICES_DATA.find((s) => s.id === demoType) || SERVICES_DATA[1];
  const activeBioClient =
    BIO_CLIENTS.find((c) => c.id === selectedBioClientId) || BIO_CLIENTS[0];
  const activeCatalogClient = CATALOG_CLIENTS[0];

  const toggleCart = (id: string) => {
    setCartIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const cartTotal = DEMO_PRODUCTS.filter((p) => cartIds.includes(p.id)).reduce(
    (sum, item) => sum + item.price,
    0
  );

  const visibleProducts =
    catalogCat === 'Todos'
      ? DEMO_PRODUCTS
      : DEMO_PRODUCTS.filter((p) => p.cat === catalogCat);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Modelo interativo ao vivo"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-[#0F172A]/75"
      onClick={onClose}
    >
      <div
        className="bg-[#EEF3F8] rounded-[24px] sm:rounded-[30px] max-w-3xl w-full h-[92dvh] sm:h-auto sm:max-h-[90vh] flex flex-col clay-shell text-[#132033] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Modal Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-300/60 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-[#7C3AED] block">
                {demoType === 'landing-page' ? 'Modelo Interativo' : 'Projeto Real no Ar'}
              </span>
              <h3 className="font-display font-extrabold text-sm sm:text-lg text-[#132033] truncate">
                {serviceInfo.title} · {serviceInfo.priceDisplay}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modelo ao vivo"
              className="w-9 h-9 rounded-full bg-[#F7FAFD] flex items-center justify-center text-[#52637A] hover:text-[#132033] clay-btn cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#DCE4EE] p-1 rounded-full clay-well overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'link-bio', label: 'Links da Bio (3)' },
                { id: 'site-catalogo', label: 'Site Catálogo' },
                { id: 'landing-page', label: 'Landing Page' },
              ] as { id: LiveDemoType; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeDemo(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-display cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  demoType === tab.id
                    ? 'bg-[#F7FAFD] text-[#132033] font-bold clay-pill-active'
                    : 'text-[#52637A] hover:text-[#132033]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Demo Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1">
          {demoType === 'landing-page' && (
            <div className="rounded-[22px] bg-[#F7FAFD] overflow-hidden clay-card">
              <div className="px-4 py-2.5 bg-[#E2EAF3] flex items-center justify-between text-xs">
                <span className="font-mono-nums text-[#52637A] truncate">https://sualoja.com.br</span>
                <span className="font-semibold text-[#EA580C] whitespace-nowrap">Landing Page</span>
              </div>

              <div className="p-4 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-7 space-y-3.5 order-2 sm:order-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Lançamento da semana
                  </span>
                  <h4 className="font-display font-extrabold text-lg sm:text-2xl text-[#132033] leading-tight">
                    Conjunto Linho Premium com envio imediato de Fortaleza.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569]">
                    Escolha seu tamanho e finalize direto no WhatsApp da loja sem cadastro demorado.
                  </p>

                  <div>
                    <span className="text-xs font-bold text-[#52637A] block mb-2">
                      Teste a seleção de tamanho:
                    </span>
                    <div className="flex items-center gap-2">
                      {(['P', 'M', 'G'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`w-10 h-10 rounded-xl font-display font-bold text-xs cursor-pointer transition-colors ${
                            selectedSize === sz
                              ? 'bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] clay-btn'
                              : 'bg-[#E8EEF5] text-[#475569] clay-well'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-b from-[#34D399] to-[#059669] text-white font-display font-bold text-xs px-5 py-3 rounded-full clay-btn">
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Pedir tamanho {selectedSize} no WhatsApp</span>
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-5 order-1 sm:order-2">
                  <div className="h-44 sm:h-auto sm:aspect-[3/4] rounded-[20px] overflow-hidden clay-card">
                    <img
                      src={studioPhoto}
                      alt="Modelo Landing Page"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {demoType === 'site-catalogo' && (
            <div className="space-y-3.5 h-full flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <div className="flex items-center gap-1 bg-[#DCE4EE] p-1 rounded-full clay-well overflow-x-auto no-scrollbar max-w-full">
                  <button
                    type="button"
                    onClick={() => setCatalogView('real')}
                    className={`px-3 py-1.5 text-xs font-display rounded-full cursor-pointer transition-colors whitespace-nowrap ${
                      catalogView === 'real'
                        ? 'bg-[#2563EB] text-white font-bold clay-pill-active'
                        : 'text-[#475569] hover:text-[#132033]'
                    }`}
                  >
                    Dy Menswear (Real)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatalogView('simulator')}
                    className={`px-3 py-1.5 text-xs font-display rounded-full cursor-pointer transition-colors whitespace-nowrap ${
                      catalogView === 'simulator'
                        ? 'bg-[#2563EB] text-white font-bold clay-pill-active'
                        : 'text-[#475569] hover:text-[#132033]'
                    }`}
                  >
                    Simulador de Pedido
                  </button>
                </div>

                {catalogView === 'real' && (
                  <div className="hidden sm:flex items-center gap-1 bg-[#DCE4EE] p-1 rounded-full clay-well">
                    <button
                      type="button"
                      onClick={() => setCatalogViewport('desktop')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-display rounded-full cursor-pointer transition-colors ${
                        catalogViewport === 'desktop'
                          ? 'bg-[#F7FAFD] text-[#132033] font-bold clay-pill-active'
                          : 'text-[#475569]'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCatalogViewport('mobile')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-display rounded-full cursor-pointer transition-colors ${
                        catalogViewport === 'mobile'
                          ? 'bg-[#F7FAFD] text-[#132033] font-bold clay-pill-active'
                          : 'text-[#475569]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Celular</span>
                    </button>
                  </div>
                )}
              </div>

              {catalogView === 'real' && activeCatalogClient ? (
                <LiveSiteFrame
                  title={activeCatalogClient.name}
                  niche={activeCatalogClient.niche}
                  url={activeCatalogClient.url}
                  displayDomain={activeCatalogClient.displayDomain}
                  variant={catalogViewport}
                  heightClass="h-[380px] sm:h-[450px]"
                  eager={true}
                />
              ) : (
                <div className="rounded-[22px] bg-[#F7FAFD] p-4 sm:p-5 clay-card space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div>
                      <span className="font-display font-extrabold text-sm sm:text-base text-[#132033] block">
                        Boutique Exemplo · Simulador
                      </span>
                      <span className="text-xs text-[#52637A]">
                        Toque nos produtos para montar um pedido
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-[#DCE4EE] p-1 rounded-full clay-well">
                      {(['Todos', 'Novidades', 'Mais vendidos'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setCatalogCat(tab)}
                          className={`px-2.5 py-1 text-[11px] font-display rounded-full cursor-pointer transition-colors ${
                            catalogCat === tab
                              ? 'bg-[#2563EB] text-white font-bold clay-pill-active'
                              : 'text-[#475569]'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {visibleProducts.map((prod) => {
                      const inCart = cartIds.includes(prod.id);
                      return (
                        <div
                          key={prod.id}
                          className="rounded-2xl bg-[#EEF3F8] overflow-hidden clay-card flex flex-col justify-between"
                        >
                          <div className="h-24 sm:h-28 overflow-hidden">
                            <img
                              src={studioPhoto}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-2.5 sm:p-3 space-y-2">
                            <div>
                              <p className="font-display font-bold text-xs text-[#132033] line-clamp-1">
                                {prod.name}
                              </p>
                              <span className="font-mono-nums font-bold text-xs text-[#2563EB]">
                                R$ {prod.price}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleCart(prod.id)}
                              className={`w-full py-1.5 rounded-xl text-[11px] font-display font-bold inline-flex items-center justify-center gap-1 cursor-pointer ${
                                inCart
                                  ? 'bg-[#059669] text-white'
                                  : 'bg-[#F7FAFD] text-[#132033] clay-btn'
                              }`}
                            >
                              {inCart ? (
                                <>
                                  <Check className="w-3 h-3" /> Adicionado
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" /> Selecionar
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-[#E2ECF7] p-3.5 flex flex-wrap items-center justify-between gap-3 clay-well">
                    <div className="text-xs">
                      <span className="font-bold text-[#132033]">
                        {cartIds.length}{' '}
                        {cartIds.length === 1 ? 'peça selecionada' : 'peças selecionadas'}
                      </span>
                      <span className="text-[#475569] ml-2 font-mono-nums">
                        Total: R$ {cartTotal}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-[#059669] text-white font-display font-bold text-xs px-4 py-2 rounded-full">
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Pedido pronto para WhatsApp</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {demoType === 'link-bio' && activeBioClient && (
            <div className="space-y-3.5 flex flex-col items-center">
              <div className="flex items-center gap-1.5 bg-[#DCE4EE] p-1 rounded-full clay-well overflow-x-auto no-scrollbar max-w-full">
                {BIO_CLIENTS.map((client) => {
                  const isActive = client.id === activeBioClient.id;
                  return (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => setSelectedBioClientId(client.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-display cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-b from-[#34D399] to-[#059669] text-white font-bold clay-pill-active'
                          : 'text-[#475569] hover:text-[#132033]'
                      }`}
                    >
                      {client.name}
                    </button>
                  );
                })}
              </div>

              <LiveSiteFrame
                title={activeBioClient.name}
                niche={activeBioClient.niche}
                url={activeBioClient.url}
                displayDomain={activeBioClient.displayDomain}
                variant="mobile"
                heightClass="h-[390px] sm:h-[450px]"
                eager={true}
              />
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-300/60 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] sm:text-xs font-medium text-[#52637A] truncate">
            {serviceInfo.fullPriceSummary}
          </span>
          <a
            href={getWhatsAppLink(serviceInfo.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`Live Demo Modal CTA (${serviceInfo.shortTitle})`)}
            className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#FFB347] to-[#F97316] text-[#1F0E00] font-display font-bold text-xs px-4 sm:px-5 py-2.5 rounded-full clay-btn whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Quero um igual</span>
          </a>
        </div>
      </div>
    </div>
  );
};
