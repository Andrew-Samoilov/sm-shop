export type Brand = {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  website?: string | null;
  description?: string | null;
  country?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Model = {
  id: number;
  name: string;
  brand: {
    name: string;
  };
};

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
