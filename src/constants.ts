import { FaqItem } from './types';

export const WHATSAPP_NUMBER = '5585981508799';
export const INSTAGRAM_URL = 'https://www.instagram.com/rocketanuncios';
export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, Neto! Vi o site da Rocket Anúncios e quero saber mais sobre os serviços para minha loja.';

export function getWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function trackWhatsAppClick(locationLabel: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click', {
      event_category: 'WhatsApp',
      event_label: locationLabel,
      transport_type: 'beacon',
    });
  }
}

export type ServiceId =
  | 'meta-ads'
  | 'landing-page'
  | 'site-catalogo'
  | 'catalogo-ia'
  | 'link-bio';

export type ServiceCategoryGroup = 'todos' | 'anuncios' | 'sites' | 'instagram';

export interface ServiceItem {
  id: ServiceId;
  categoryGroup: Exclude<ServiceCategoryGroup, 'todos'>;
  categoryLabel: string;
  shortTitle: string;
  title: string;
  tagline: string;
  priceDisplay: string;
  priceSub: string;
  fullPriceSummary: string;
  accentHex: string;
  cardTintClass: string;
  iconBgClass: string;
  highlights: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

export interface ComboPackage {
  id: string;
  name: string;
  includes: string;
  originalPrice: string;
  promoPrice: string;
  savingsLabel: string;
  billingNote: string;
  tintClass: string;
  whatsappMessage: string;
}

export interface ClientShowcaseItem {
  id: string;
  serviceType: 'link-bio' | 'site-catalogo';
  serviceLabel: string;
  name: string;
  niche: string;
  url: string;
  displayDomain: string;
  accentBgClass: string;
}

export const CLIENT_SHOWCASES: ClientShowcaseItem[] = [
  {
    id: 'stilosa-prata',
    serviceType: 'link-bio',
    serviceLabel: 'Link da Bio',
    name: 'Stilosa Prata',
    niche: 'Joias em Prata',
    url: 'https://biostilosaprata.netlify.app/',
    displayDomain: 'biostilosaprata.netlify.app',
    accentBgClass: 'from-[#E5F0FF] to-[#CEE2FF]',
  },
  {
    id: 'claudia-lavor',
    serviceType: 'link-bio',
    serviceLabel: 'Link da Bio',
    name: 'Claudia Lavor Joias',
    niche: 'Joias · Shopping Terrazo',
    url: 'https://claudialavorjoias.netlify.app/',
    displayDomain: 'claudialavorjoias.netlify.app',
    accentBgClass: 'from-[#FFF1DF] to-[#FFE0BD]',
  },
  {
    id: 'hc-calcados',
    serviceType: 'link-bio',
    serviceLabel: 'Link da Bio',
    name: 'HC Calçados',
    niche: 'Calçados & Moda',
    url: 'https://hc-calcado.netlify.app/',
    displayDomain: 'hc-calcado.netlify.app',
    accentBgClass: 'from-[#DFF9EE] to-[#C2F0DC]',
  },
  {
    id: 'dy-menswear',
    serviceType: 'site-catalogo',
    serviceLabel: 'Site Catálogo',
    name: 'Dy Menswear',
    niche: 'Catálogo Moda Masculina',
    url: 'https://dy-menswear2.netlify.app/',
    displayDomain: 'dy-menswear2.netlify.app',
    accentBgClass: 'from-[#F1EAFF] to-[#E1D4FF]',
  },
];

export const SERVICE_CATEGORY_FILTERS: { id: ServiceCategoryGroup; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'anuncios', label: 'Anúncios' },
  { id: 'sites', label: 'Sites & Catálogos' },
  { id: 'instagram', label: 'Instagram' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'meta-ads',
    categoryGroup: 'anuncios',
    categoryLabel: 'Tráfego Pago',
    shortTitle: 'Meta Ads',
    title: 'Gestão de Meta Ads',
    tagline: 'Anúncios no Instagram e Facebook levando clientes pro WhatsApp.',
    priceDisplay: 'R$ 600',
    priceSub: 'mensal · sem fidelidade',
    fullPriceSummary: 'R$ 600 / mês (gestão)',
    accentHex: '#0891B2',
    cardTintClass: 'from-[#E2F7FA] to-[#C8ECF2]',
    iconBgClass: 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white',
    highlights: [
      'Campanhas no Instagram e Facebook',
      'Roteiro simples para gravar no celular',
      'Sem contrato mínimo de 3 meses',
    ],
    ctaLabel: 'Contratar Meta Ads (R$ 600)',
    whatsappMessage:
      'Olá, Neto! Quero contratar a gestão de Meta Ads (R$ 600/mês) para atrair clientes para minha loja.',
  },
  {
    id: 'landing-page',
    categoryGroup: 'sites',
    categoryLabel: 'Página de Venda',
    shortTitle: 'Landing Page',
    title: 'Criação de Landing Page',
    tagline: 'Página rápida e exclusiva para transformar visitas em mensagens.',
    priceDisplay: 'R$ 300',
    priceSub: 'criação · valor único',
    fullPriceSummary: 'R$ 300 (pagamento único)',
    accentHex: '#EA580C',
    cardTintClass: 'from-[#FFF1DF] to-[#FFE0BD]',
    iconBgClass: 'bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white',
    highlights: [
      'Design personalizado da sua marca',
      'Botões diretos para o WhatsApp',
      'Rápida no celular e no computador',
    ],
    ctaLabel: 'Pedir Landing Page (R$ 300)',
    whatsappMessage:
      'Olá, Neto! Tenho interesse na criação de uma Landing Page (R$ 300) para meu negócio.',
  },
  {
    id: 'site-catalogo',
    categoryGroup: 'sites',
    categoryLabel: 'Loja & Vitrine',
    shortTitle: 'Site Catálogo',
    title: 'Site Estilo Catálogo',
    tagline: 'Vitrine organizada por categorias com pedido direto no WhatsApp.',
    priceDisplay: 'R$ 600',
    priceSub: 'criação + R$ 100/mês',
    fullPriceSummary: 'R$ 600 criação · R$ 100/mês',
    accentHex: '#2563EB',
    cardTintClass: 'from-[#E5F0FF] to-[#CEE2FF]',
    iconBgClass: 'bg-gradient-to-br from-[#60A5FA] to-[#2563EB] text-white',
    highlights: [
      'Produtos separados por categoria',
      'Cliente monta e envia no WhatsApp',
      'Manutenção e suporte por R$ 100/mês',
    ],
    ctaLabel: 'Criar Site Catálogo (R$ 600)',
    whatsappMessage:
      'Olá, Neto! Quero criar um Site Estilo Catálogo (R$ 600 criação + R$ 100/mês) para minha loja.',
  },
  {
    id: 'catalogo-ia',
    categoryGroup: 'sites',
    categoryLabel: 'Catálogo + IA',
    shortTitle: 'Catálogo com IA',
    title: 'Catálogo Virtual com Fotos IA',
    tagline: 'Fotos profissionais de estúdio feitas com IA + catálogo completo.',
    priceDisplay: 'R$ 1.000',
    priceSub: 'criação completa',
    fullPriceSummary: 'R$ 1.000 (catálogo + fotos IA)',
    accentHex: '#7C3AED',
    cardTintClass: 'from-[#F1EAFF] to-[#E1D4FF]',
    iconBgClass: 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white',
    highlights: [
      'Fotos do produto em cenário de estúdio IA',
      'Economia sem precisar de fotógrafo',
      'Catálogo virtual pronto para vender',
    ],
    ctaLabel: 'Pedir Catálogo com IA (R$ 1.000)',
    whatsappMessage:
      'Olá, Neto! Quero o Catálogo Virtual com Fotos de Produtos com IA (R$ 1.000) para minha loja.',
  },
  {
    id: 'link-bio',
    categoryGroup: 'instagram',
    categoryLabel: 'Perfil Instagram',
    shortTitle: 'Link da Bio',
    title: 'Link da Biografia Personalizado',
    tagline: 'Página profissional para colocar na bio do Instagram da sua loja.',
    priceDisplay: 'R$ 150',
    priceSub: 'criação · valor único',
    fullPriceSummary: 'R$ 150 (pagamento único)',
    accentHex: '#059669',
    cardTintClass: 'from-[#DFF9EE] to-[#C2F0DC]',
    iconBgClass: 'bg-gradient-to-br from-[#34D399] to-[#059669] text-white',
    highlights: [
      'Visual exclusivo combinando com sua loja',
      'Botões para WhatsApp, catálogo e mapa',
      'Passa confiança logo no primeiro clique',
    ],
    ctaLabel: 'Criar Link da Bio (R$ 150)',
    whatsappMessage:
      'Olá, Neto! Quero criar meu Link da Biografia Personalizado (R$ 150) para o Instagram.',
  },
];

export const COMBOS_DATA: ComboPackage[] = [
  {
    id: 'combo-presenca',
    name: 'Combo Presença Digital',
    includes: 'Link da Bio + Landing Page',
    originalPrice: 'R$ 450',
    promoPrice: 'R$ 390',
    savingsLabel: 'Economia de R$ 60',
    billingNote: 'pagamento único',
    tintClass: 'from-[#FFF1DF] to-[#FFE2C2]',
    whatsappMessage:
      'Olá, Neto! Quero contratar o Combo Presença Digital (Link da Bio + Landing Page por R$ 390).',
  },
  {
    id: 'combo-vendas',
    name: 'Combo Loja Vendedora',
    includes: 'Meta Ads (1º mês) + Site Catálogo (criação)',
    originalPrice: 'R$ 1.200',
    promoPrice: 'R$ 1.050',
    savingsLabel: 'Economia de R$ 150',
    billingNote: 'no 1º mês · depois R$ 700/mês',
    tintClass: 'from-[#EFE9FF] to-[#E2F3FF]',
    whatsappMessage:
      'Olá, Neto! Quero contratar o Combo Loja Vendedora (Meta Ads + Criação Site Catálogo por R$ 1.050 no 1º mês).',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Tem contrato mínimo de 3 meses no Meta Ads?',
    answer: 'Não. A gestão custa R$ 600/mês sem fidelidade e sem multa de cancelamento.',
  },
  {
    id: 'faq-2',
    question: 'Como funciona a mensalidade do Site Catálogo?',
    answer: 'Você investe R$ 600 na criação inicial e R$ 100/mês para manter no ar com suporte e atualizações.',
  },
  {
    id: 'faq-3',
    question: 'Como funcionam as fotos com IA no catálogo de R$ 1.000?',
    answer: 'Você envia fotos simples do produto pelo celular e transformamos em imagens de estúdio dentro do seu catálogo virtual.',
  },
  {
    id: 'faq-4',
    question: 'Landing Page e Link da Bio têm mensalidade?',
    answer: 'Não. A Landing Page (R$ 300) e o Link da Biografia (R$ 150) têm pagamento único pela criação.',
  },
];
