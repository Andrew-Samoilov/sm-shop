import { HeroSection, InfoSection, LinkWithGA } from "@/components";

export default async function Home() {

  return (
    <>
      <section className="section">
        <HeroSection />
      </section>

      <section className="  flex flex-col items-center pb-6">
        <h2>Купити шини</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <LinkWithGA
            href={'/tyres?season=summer&view=gallery'}
            eventLabel="summer"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу літніх шин"
            className="bg-theme-light text-center rounded-md p-12"
          >
            <h3>Літні</h3>
          </LinkWithGA>

          <LinkWithGA
            href={'/tyres?season=winter&view=gallery'}
            eventLabel="winter"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу зимових шин"
            className="bg-theme-light  text-center rounded-md p-12"
          >
            <h3>Зимові</h3>
          </LinkWithGA>

          <LinkWithGA
            href={'/tyres?season=allseason&view=gallery'}
            eventLabel="allseason"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу всесезонних шин"
            className="bg-theme-light text-center rounded-md p-12"
          >
            <h3>Всесезон</h3>
          </LinkWithGA>
        </div>
      </section>

      <InfoSection />
    </>
  );
}
