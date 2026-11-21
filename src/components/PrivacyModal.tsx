import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060910]/75"
      onClick={onClose}
    >
      <div
        className="bg-[#F4F7FB] rounded-[28px] max-w-2xl w-full max-h-[85vh] flex flex-col clay-shell text-[#132033] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-300/60">
          <div className="flex items-center gap-2.5 text-[#7C3AED]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h3 id="privacy-modal-title" className="font-display font-extrabold text-lg text-[#132033]">
              Política de Privacidade
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar política de privacidade"
            className="text-[#52637A] hover:text-[#132033] w-8 h-8 rounded-full bg-[#E5ECF4] flex items-center justify-center clay-btn cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <p>
            A <strong className="text-[#132033]">Rocket Anúncios</strong> respeita a privacidade de lojistas, clientes e visitantes do nosso site.
          </p>

          <h4 className="font-display font-bold text-sm text-[#132033] pt-2">
            1. Contato via WhatsApp
          </h4>
          <p>
            Ao clicar nos botões de contato, você é redirecionado espontaneamente para o aplicativo oficial do WhatsApp (Meta Inc.), onde as conversas ocorrem em ambiente protegido de ponta a ponta.
          </p>

          <h4 className="font-display font-bold text-sm text-[#132033] pt-2">
            2. Métricas de Navegação
          </h4>
          <p>
            Utilizamos ferramentas padrão de análise web exclusivamente para contabilizar cliques e melhorar o desempenho da página.
          </p>

          <h4 className="font-display font-bold text-sm text-[#132033] pt-2">
            3. Sigilo Comercial
          </h4>
          <p>
            Informações de produtos, estoque ou faturamento compartilhadas durante consultorias são mantidas sob sigilo.
          </p>
        </div>

        <div className="p-4 border-t border-slate-300/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white font-display font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full clay-btn cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
