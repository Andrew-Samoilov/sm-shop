import type { Season } from "@/types";

export function mapPrismaSeason(season?: string | null): Season | undefined {
    switch (season) {
        case "SUMMER":
            return "summer";
        case "WINTER":
            return "winter";
        case "ALLSEASON":
            return "allseason";
        default:
            return undefined; 
    }
}
