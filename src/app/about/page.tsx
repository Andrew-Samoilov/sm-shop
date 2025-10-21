import { BenefitsSection, FeatureSection, CertificatesClient, BuyTyres, PopularSizes,  PopularBrands } from "@/components";
import { getBaseMetadataAction } from "@/lib/server/get-base-metadata-action";

import { getContentBlock } from "@/lib/server/get-content-block";
import { Certificate } from '@/types'

const cert = await getContentBlock<Certificate[]>('certificates', [])
export async function generateMetadata() {
  return getBaseMetadataAction({
    title: "Про компанію ShinaMix",
    description:
      "ShinaMix — українська компанія з багаторічним досвідом у продажу автошин. Ми працюємо лише з перевіреними брендами, гарантуємо якість, чесні ціни та швидку доставку по всій Україні.",
    openGraph: {
      title: "Про нас — ShinaMix",
      description:
        "Дізнайтесь більше про компанію ShinaMix: історію, принципи роботи та сервіс. Ми цінуємо довіру клієнтів і пропонуємо тільки якісні шини.",
    },
  });
}

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
