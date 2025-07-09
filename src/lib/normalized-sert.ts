
import { Certificate } from "@/types";

export function normalizedCerts(cert: Certificate[], brand?: string): Certificate[] {
    if (typeof brand !== "string" || !brand.trim()) return cert;
    const brandLC = brand.toLowerCase();
    return cert.filter(
        c => (c.brand?.toLowerCase?.() ?? "") === brandLC
    );
}
