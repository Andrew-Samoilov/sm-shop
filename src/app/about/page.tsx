import { BenefitsSection, FeatureSection,  CertificatesClient } from "@/components";
import { getContentBlock } from "@/lib";
import { Certificate } from "@/types";
const cert = await getContentBlock<Certificate[]>('certificates', [])
    
export default async function AboutPage() {
  return (
    <>
      <section className="from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b">
        <h1>Про нас</h1>
      </section>
      <FeatureSection />
      <section>
        <h2 className="text-center pb-6">Наші сертифікати</h2>
        <CertificatesClient cert={cert} />
      </section>
      <BenefitsSection />
    </>
  );
}
