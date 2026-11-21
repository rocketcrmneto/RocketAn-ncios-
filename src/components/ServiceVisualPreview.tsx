import React, { useState } from 'react';
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
  Store,
  MoveHorizontal,
  Eye,
  Link2,
} from 'lucide-react';
import { CLIENT_SHOWCASES, ServiceId } from '../constants';
import { LiveDemoType } from './LiveDemoModal';
import { LiveSiteFrame } from './LiveSiteFrame';
import studioPhoto from '/src/assets/images/ad_showcase_boutique_1795217214714.jpg';
import rawPhonePhoto from '/src/assets/images/catalogo_antes_celular_1795220936784.jpg';

interface ServiceVisualPreviewProps {
  serviceId: ServiceId;
  onOpenLiveDemo?: (demoType: LiveDemoType, clientId?: string) => void;
}

const META_MESSAGES = [
  { name: 'Camila · Fortaleza', text: 'Oi! Vi no Instagram, ainda tem no M?' },
  { name: 'Lucas · Aldeota', text: 'Quero fazer pedido pelo WhatsApp agora!' },
  { name: 'Mariana · Atacado', text: 'Vocês enviam ainda hoje para o interior?' },
];

const CATALOG_PRODUCTS = [
  { id: 1, name: 'Conjunto Linho', price: 'R$ 189', cat: 'Novidades' },
  { id: 2, name: 'Blazer Alfaiataria', price: 'R$ 249', cat: 'Mais vendidos' },
  { id: 3, name: 'Camisa Social', price: 'R$ 139', cat: 'Novidades' },
];

const BIO_CLIENTS = CLIENT_SHOWCASES.filter((c) => c.serviceType === 'link-bio');
const CATALOG_CLIENT = CLIENT_SHOWCASES.find((c) => c.serviceType === 'site-catalogo');

export const ServiceVisualPreview: React.FC<ServiceVisualPreviewProps> = ({
  serviceId,
  onOpenLiveDemo,
}) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState<number>(54);
  const [catalogMode, setCatalogMode] = useState<'real' | 'cards'>('real');
  const [catalogFilter, setCatalogFilter] = useState<'Todos' | 'Novidades' | 'Mais vendidos'>('Todos');
  const [selectedBioId, setSelectedBioId] = useState<string>(BIO_CLIENTS[0]?.id || 'stilosa-prata');

  if (serviceId === 'meta-ads') {
    const activeMsg = META_MESSAGES[msgIdx];
    return (
      <div className="space-y-3.5">
        <div className="rounded-[22px] overflow-hidden bg-[#E5ECF4] p-2.5 clay-well">
          <div className="rounded-[16px] overflow-hidden bg-[#F7FAFD] clay-card">
            <div className="px-3.5 py-2 flex items-center justify-between text-[11px] bg-[#EEF3F8]">
              <span className="font-display font-bold text-[#132033]">Anúncio Instagram</span>
              <span className="text-[#52637A] font-medium">Patrocinado</span>
            </div>
            <div className="relative h-40 sm:h-44 overflow-hidden">
              <img
                src={studioPhoto}
                alt="Exemplo de anúncio de loja no Instagram"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/65 via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setMsgIdx((prev) => (prev + 1) % META_MESSAGES.length)}
                className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 bg-gradient-to-b from-[#38BDF8] to-[#0284C7] text-white font-display font-bold text-[11px] px-3.5 py-2 rounded-full clay-btn cursor-pointer"
              >
                <span>Simular clique</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] bg-gradient-to-b from-[#E1FAEF] to-[#C8F3E1] px-4 py-3 flex items-center gap-3 clay-card">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center text-white shrink-0 clay-orb">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-display font-bold text-[#047857] block truncate">
              {activeMsg.name} · Agora
            </span>
            <p className="text-xs font-medium text-[#132033] truncate">“{activeMsg.text}”</p>
          </div>
        </div>
      </div>
    );
  }

  if (serviceId === 'landing-page') {
    return (
      <div className="rounded-[22px] bg-[#E5ECF4] p-2.5 clay-well space-y-2.5">
        <div className="rounded-[18px] bg-[#F7FAFD] overflow-hidden clay-card">
          <div className="px-3.5 py-2 bg-[#E9EFF7] flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
            </div>
            <span className="text-[11px] font-mono-nums text-[#52637A]">sualoja.com.br</span>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-7 space-y-2.5 order-2 sm:order-1">
              <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                Oferta em destaque
              </span>
              <h4 className="font-display font-extrabold text-base text-[#132033] leading-snug">
                Coleção exclusiva pronta para envio hoje.
              </h4>
              <p className="text-xs text-[#52637A]">
                Página direta para transformar cliques em vendas no WhatsApp.
              </p>
              {onOpenLiveDemo && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenLiveDemo('landing-page')}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white font-display font-bold text-xs px-4 py-2.5 rounded-full clay-btn cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver modelo ao vivo</span>
                  </button>
                </div>
              )}
            </div>
            <div className="sm:col-span-5 order-1 sm:order-2">
              <div className="h-40 sm:h-auto sm:aspect-[3/4] rounded-2xl overflow-hidden clay-card">
                <img
                  src={studioPhoto}
                  alt="Preview Landing Page"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (serviceId === 'site-catalogo') {
    const filtered =
      catalogFilter === 'Todos'
        ? CATALOG_PRODUCTS
        : CATALOG_PRODUCTS.filter((p) => p.cat === catalogFilter);

    return (
      <div className="rounded-[22px] bg-[#E5ECF4] p-3.5 sm:p-4 clay-well space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-display font-bold text-[#132033] flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-[#2563EB]" />
            {catalogMode === 'real' ? 'Projeto Real · Dy Menswear' : 'Catálogo por Categorias'}
          </span>

          <div className="flex items-center gap-1 bg-[#D8E2EE] p-1 rounded-full clay-well">
            <button
              type="button"
              onClick={() => setCatalogMode('real')}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                catalogMode === 'real'
                  ? 'bg-gradient-to-b from-[#60A5FA] to-[#2563EB] text-white font-bold clay-pill-active'
                  : 'text-[#475569] hover:text-[#132033]'
              }`}
            >
              Dy Menswear (Real)
            </button>
            <button
              type="button"
              onClick={() => setCatalogMode('cards')}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                catalogMode === 'cards'
                  ? 'bg-gradient-to-b from-[#60A5FA] to-[#2563EB] text-white font-bold clay-pill-active'
                  : 'text-[#475569] hover:text-[#132033]'
              }`}
            >
              Vitrine Rápida
            </button>
          </div>
        </div>

        {catalogMode === 'real' && CATALOG_CLIENT ? (
          <LiveSiteFrame
            title={CATALOG_CLIENT.name}
            niche={CATALOG_CLIENT.niche}
            url={CATALOG_CLIENT.url}
            displayDomain={CATALOG_CLIENT.displayDomain}
            variant="desktop"
            heightClass="h-[250px] sm:h-[290px]"
            eager={false}
            onExpandModal={
              onOpenLiveDemo
                ? () => onOpenLiveDemo('site-catalogo', CATALOG_CLIENT.id)
                : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-1 bg-[#D8E2EE] p-1 rounded-full clay-well w-fit">
              {(['Todos', 'Novidades', 'Mais vendidos'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCatalogFilter(tab)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    catalogFilter === tab
                      ? 'bg-[#F7FAFD] text-[#132033] font-bold clay-pill-active'
                      : 'text-[#475569] hover:text-[#132033]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#F7FAFD] overflow-hidden flex flex-col clay-card"
                >
                  <div className="h-24 sm:h-20 overflow-hidden">
                    <img
                      src={studioPhoto}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-display font-bold text-[#132033] truncate">
                      {item.name}
                    </p>
                    <span className="text-[11px] font-mono-nums font-bold text-[#2563EB]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {onOpenLiveDemo && (
          <div className="flex items-center justify-end pt-0.5">
            <button
              type="button"
              onClick={() => onOpenLiveDemo('site-catalogo', CATALOG_CLIENT?.id)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#60A5FA] to-[#2563EB] text-white font-display font-bold text-xs px-4 py-2 rounded-full clay-btn cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Abrir modelo completo</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (serviceId === 'catalogo-ia') {
    return (
      <div className="rounded-[22px] bg-[#E5ECF4] p-3.5 sm:p-4 clay-well space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-display font-bold text-[#132033] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            Arraste: Celular vs Estúdio IA
          </span>
          <div className="flex items-center gap-1 bg-[#D8E2EE] p-1 rounded-full clay-well">
            {[
              { label: 'Antes', value: 12 },
              { label: '50/50', value: 50 },
              { label: 'Depois IA', value: 90 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setSliderPos(preset.value)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full cursor-pointer transition-colors ${
                  Math.abs(sliderPos - preset.value) < 12
                    ? 'bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white clay-pill-active'
                    : 'text-[#475569] hover:text-[#132033]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive Before / After Slider */}
        <div className="relative h-52 sm:h-56 rounded-2xl overflow-hidden clay-card select-none">
          <img
            src={studioPhoto}
            alt="Foto final de estúdio gerada com IA"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={rawPhonePhoto}
              alt="Foto simples tirada pelo celular na loja"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.45)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shadow-lg">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>

          <span className="absolute top-2.5 left-2.5 bg-[#132033]/85 text-white text-[10px] font-display font-bold px-2.5 py-1 rounded-full pointer-events-none">
            Celular comum
          </span>
          <span className="absolute top-2.5 right-2.5 bg-[#7C3AED]/95 text-white text-[10px] font-display font-bold px-2.5 py-1 rounded-full pointer-events-none">
            Estúdio IA
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Comparar foto do celular antes e estúdio com IA depois"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>
      </div>
    );
  }

  // Real client Link da Bio showcase (instant on-demand loading for smooth mobile performance)
  const activeBioClient =
    BIO_CLIENTS.find((c) => c.id === selectedBioId) || BIO_CLIENTS[0];

  return (
    <div className="rounded-[22px] bg-[#E5ECF4] p-3.5 sm:p-4 clay-well space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-display font-bold text-[#132033] flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-[#059669]" />
          Clientes Reais no Ar
        </span>

        <div className="flex items-center gap-1 bg-[#D8E2EE] p-1 rounded-full clay-well overflow-x-auto no-scrollbar max-w-full">
          {BIO_CLIENTS.map((client) => {
            const active = client.id === activeBioClient?.id;
            return (
              <button
                key={client.id}
                type="button"
                onClick={() => setSelectedBioId(client.id)}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-gradient-to-b from-[#34D399] to-[#059669] text-white font-bold clay-pill-active'
                    : 'text-[#475569] hover:text-[#132033]'
                }`}
              >
                {client.name}
              </button>
            );
          })}
        </div>
      </div>

      {activeBioClient && (
        <LiveSiteFrame
          title={activeBioClient.name}
          niche={activeBioClient.niche}
          url={activeBioClient.url}
          displayDomain={activeBioClient.displayDomain}
          variant="mobile"
          heightClass="h-[260px] sm:h-[300px]"
          eager={false}
          onExpandModal={
            onOpenLiveDemo
              ? () => onOpenLiveDemo('link-bio', activeBioClient.id)
              : undefined
          }
        />
      )}

      {onOpenLiveDemo && activeBioClient && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onOpenLiveDemo('link-bio', activeBioClient.id)}
            className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#34D399] to-[#059669] text-white font-display font-bold text-xs px-4 py-2 rounded-full clay-btn cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver todos em tela cheia</span>
          </button>
        </div>
      )}
    </div>
  );
};
