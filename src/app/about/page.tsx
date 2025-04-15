import { BenefitsSection, FeatureSection, CertificatesSection } from "@/components";

export default async function AboutPage() {
  return (
    <>
      <section className="from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b">
        <h1>Про нас</h1>
      </section>
      <CertificatesSection />
      <FeatureSection />
      <BenefitsSection />
    </>
  );
}
