import { BenefitsSection, FeatureSection, CertificatesClient, BuyTyres } from "@/components";
import { getContentBlock } from "@/lib";
import { Certificate } from "@/types";
const cert = await getContentBlock<Certificate[]>('certificates', [])

export default async function AboutPage() {
  return (
    <section >
      <h1 className="text-h1">Про нас</h1>

      <FeatureSection />

      <BenefitsSection />

      <h2 className="text-center pb-6">Наші сертифікати</h2>
      <CertificatesClient cert={cert} />
      
      <BuyTyres />

    </section>
  );
}
