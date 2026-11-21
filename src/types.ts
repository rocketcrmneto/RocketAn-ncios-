export interface ImagePlaceholders {
  heroNetoPhoto: string | null;
  aboutNetoPhoto: string | null;
  logoUrl: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CaseStudy {
  id: string;
  nicho: string;
  localizacao: string;
  resultado: string;
  descricao: string;
}
