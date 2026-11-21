import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, Loader2, Play, Smartphone, Monitor } from 'lucide-react';

interface LiveSiteFrameProps {
  title: string;
  niche?: string;
  url: string;
  displayDomain: string;
  variant?: 'mobile' | 'desktop';
  heightClass?: string;
  eager?: boolean;
  onExpandModal?: () => void;
}

export const LiveSiteFrame: React.FC<LiveSiteFrameProps> = ({
  title,
  niche,
  url,
  displayDomain,
  variant = 'desktop',
  heightClass = 'h-[320px]',
  eager = false,
  onExpandModal,
}) => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(eager);
  const [isLoading, setIsLoading] = useState(eager);

  useEffect(() => {
    setShouldLoadIframe(eager);
    setIsLoading(eager);
  }, [url, eager]);

  const isMobile = variant === 'mobile';

  const handleActivatePreview = () => {
    setIsLoading(true);
    setShouldLoadIframe(true);
  };

  return (
    <div
      className={`mx-auto w-full ${
        isMobile ? 'max-w-[330px] rounded-[24px] sm:rounded-[28px]' : 'rounded-[20px]'
      } bg-[#F7FAFD] overflow-hidden clay-card flex flex-col`}
    >
      {/* Top Browser / Phone Bar */}
      <div className="px-3.5 py-2 bg-[#E8EFF7] border-b border-slate-300/60 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {!isMobile && (
            <div className="hidden sm:flex items-center gap-1 shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
            </div>
          )}
          <div className="flex items-center gap-1.5 min-w-0 text-[11px] font-mono-nums text-[#475569]">
            <Globe className="w-3 h-3 text-[#059669] shrink-0" />
            <span className="truncate">{displayDomain}</span>
          </div>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-display font-bold text-[#2563EB] hover:text-[#1D4ED8] whitespace-nowrap shrink-0"
        >
          <span>Abrir site</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Lightweight On-Demand Facade or Active Live Iframe */}
      <div className={`relative w-full bg-[#F1F5F9] ${heightClass}`}>
        {!shouldLoadIframe ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-5 gap-3.5 bg-gradient-to-b from-[#F7FAFD] to-[#E8EFF7]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#059669] text-white flex items-center justify-center clay-orb">
              {isMobile ? <Smartphone className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
            </div>
            <div className="space-y-1 max-w-[240px]">
              <h4 className="font-display font-extrabold text-sm sm:text-base text-[#132033]">
                {title}
              </h4>
              {niche && (
                <p className="text-xs text-[#52637A]">{niche}</p>
              )}
              <p className="text-[11px] font-mono-nums text-[#64748B] truncate">
                {displayDomain}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleActivatePreview}
                className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#34D399] to-[#059669] text-white font-display font-bold text-xs px-4 py-2.5 rounded-full clay-btn cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Carregar prévia ao vivo</span>
              </button>
              {onExpandModal && (
                <button
                  type="button"
                  onClick={onExpandModal}
                  className="inline-flex items-center gap-1 bg-[#E5ECF4] text-[#132033] font-display font-bold text-xs px-3.5 py-2.5 rounded-full clay-btn cursor-pointer whitespace-nowrap"
                >
                  <span>Tela cheia</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#EEF3F8]/95 text-[#475569] p-4 text-center">
                <Loader2 className="w-5 h-5 animate-spin text-[#7C3AED]" />
                <span className="text-xs font-medium">Carregando prévia real de {title}...</span>
              </div>
            )}
            <iframe
              key={url}
              src={url}
              title={`Prévia ao vivo: ${title}`}
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="w-full h-full border-0 bg-white"
            />
          </>
        )}
      </div>
    </div>
  );
};
