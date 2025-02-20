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
    title: string;
}
