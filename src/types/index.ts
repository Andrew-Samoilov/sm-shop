export interface Tyres {
    tyres: Tyre[];
}

export interface Brand {
    id: number;
    name: string;
    description?: string;
    website?: string;
    country?: string;
    logo?: string;
    created_at?: Date;
    updated_at?: Date;
}

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
