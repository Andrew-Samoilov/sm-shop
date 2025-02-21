export interface Tyre {
    id: number;
    title: string;
    date_code: string;
    price: number;
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
    created_at: Date;
    updated_at: Date;
}
