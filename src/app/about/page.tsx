import { BenefitsSection, FeatureSection, CertificatesClient, BuyTyres, PopularSizes,  PopularBrands } from "@/components";
import { getContentBlock } from "@/lib";
import { Certificate } from '@/types'

const cert = await getContentBlock<Certificate[]>('certificates', [])

// console.log(`[AboutPage]`,brandsSection) 

export default async function AboutPage() {
  return (
    <section >
      <h1 className="text-h1 py-2 lg:py-6">Про нас</h1>

      <FeatureSection />

      <BenefitsSection />

      <PopularBrands />

      <h2 className="text-center pb-6">Наші сертифікати</h2>
      <CertificatesClient cert={cert} />

      <BuyTyres />

      <PopularSizes />

    </section>
  );
}
