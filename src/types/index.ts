export interface Tyres {
  tyres: Tyre[];
}

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

export type Tyre = {
  id: number;
  model: string | null;
  description: string | null;
  country: string | null;
  model_id: number | null;
  brand_id: number | null;
  title: string;
  slug: string;
  date_code: string | null;
  type: string | null;
  price?: number;
};

export interface IImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
}
