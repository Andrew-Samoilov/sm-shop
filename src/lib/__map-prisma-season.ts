import type { Season } from "@/types";

export function mapPrismaSeason(season?: string | null): Season | undefined {
    switch (season) {
        case "SUMMER":
            return "SUMMER";
        case "WINTER":
            return "WINTER";
        case "ALLSEASON":
            return "ALLSEASON";
        default:
            return undefined; 
    }
}
