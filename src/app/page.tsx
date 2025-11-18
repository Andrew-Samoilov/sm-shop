export const dynamic = "force-static";
import { BuyTyres, HeroSection, InfoSection, PopularSizes, TyreSelectClient } from "@/components";

export default function Home() {

  return (
    <>   
      <TyreSelectClient />

      <PopularSizes />

      <BuyTyres />
      
      <InfoSection />

      <HeroSection />

    </>
  );
}
