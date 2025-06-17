import { Prisma } from "@prisma/client";

export type SiteConfig = {
  siteName: string;
  fb: string;
  tg: string;
  viber: string;
  email: string;
  tel: {
    visual: string;
    normalize: string;
  };
};

export type TyreWithRelations = Prisma.TyreGetPayload<{
  include: { brands: true; models: true }
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
