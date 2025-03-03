export interface Tyre {
    id: number;
    title: string;
    slug?: string;
    date_code: string | null;
    price: number;
    brand_id?: number | null;
}

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
