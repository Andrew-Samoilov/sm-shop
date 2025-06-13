import { getContentBlock } from "@/lib";
import { Certificate } from "@/types";
import { CertificatesClient } from "./certificates-client";

export async function CertificatesSection({ brandName }: { brandName?: string }) {
    const cert = await getContentBlock<Certificate[]>('certificates', [])
    let filteredSert = cert;

    if (brandName) {
        filteredSert = cert
            .filter((item) => item.brand.toLowerCase() === brandName.toLowerCase())
            .sort((a, b) => b.year - a.year);
    }
    // console.log(`[CertificatesSection]`, filteredSert[0]);

    if (filteredSert.length === 0) return null;

    return <CertificatesClient cert={filteredSert} />;
}
