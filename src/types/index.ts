import { Prisma } from "@prisma/client";

export type SiteConfig = {
  siteName: string;
  baseUrl: string;
  fb: string;
  signal: string;
  viber: string;
  whatsapp: string;
  email: string;
  tel: {
    visual: string;
    normalize: string;
  };
};

export type TyreWithRelations = Prisma.TyreGetPayload<{
  include: { brand: true; model: true }
}>;

export interface Benefit {
  id: number
  title: string
}

export interface Feature {
  id: number
  number: string
  header: string
  subHeader: string
}

export type Block = { markdown: string }

export interface ContactLink {
  id: number
  text: string
  url: string
}
export interface ContactBlock {
  id: number
  name: string
  link: ContactLink[]
}

export interface Certificate {
  id: number
  text: string
  url: string
  brand: string
  year: number
  width: number
  height: number
}

export type IImage = {
  id: number
  modelId: number
  url: string
  alt: string | null
  width: number | null
  height: number | null
  position: number
};

export type Season = "SUMMER" | "WINTER" | "ALLSEASON" | null;

export interface CartTyre {
  id: number;
  title: string;
  brand: string;
  model: string;
  tyreSize: string;
  tyreImageUrl?: string;
  price: number;
  quantity: number;
}

export type TyreTitleProps = {
  title: string;
  country: string | null | undefined;
  date: string | null | undefined;
  season: Season | null | undefined;
  applicability: string | null | undefined;
  diskProtection: string | null | undefined;
};

export interface OneCTyreData {
  id: string;
  name: string;
  code: string;
  price?: number;
  quantity?: number;
  model?: string;
  manufacturer?: string;
  yearOfProduction?: string;
  season?: string;
  typeSize?: string;
  diameter?: string;
  load?: string;
  speed?: string;
  additionalIndex?: string;
  applicability?: string;
  diskProtection?: string;
  country?: string;
  rof?: string;
  itemType?: string;
  [key: string]: unknown; // щоб зберегти raw
}
