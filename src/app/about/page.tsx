import { BenefitsSection, FeatureSection, SertsSection } from '@/components';

export default async function AboutPage() {
    return (
        <>
            <section className='bg-gradient-to-b from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light'>
                <h1 >Про нас</h1>
            </section>
            <SertsSection />
            <FeatureSection />
            <BenefitsSection />
        </>
    );
};
