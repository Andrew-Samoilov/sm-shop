import { BenefitsSection, FeatureSection, SertsSection } from '@/components';

export default async function AboutPage() {
    return (
        <>
            <h1>Про нас</h1>
            <SertsSection />
            <FeatureSection />
            <BenefitsSection />
        </>
    );
};
