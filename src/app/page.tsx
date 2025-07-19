import { HeroSection, InfoSection, LinkWithGA } from "@/components";

export default async function Home() {

  return (
    <>
      <HeroSection />

      <section className="section  flex flex-col items-center">
        <h2>Купити шини</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <LinkWithGA
            href={'/tyres?season=summer&view=gallery'}
            eventLabel="summer"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу літніх шин"
            className="flex content-center items-center bg-theme-light  rounded-md p-12 md:w-1/3 aspect-square"
          >
            <h3>Літні</h3>
          </LinkWithGA>

          <LinkWithGA
            href={'/tyres?season=winter&view=gallery'}
            eventLabel="winter"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу зимових шин"
            className="bg-theme-light  flex content-center items-center rounded-md p-12 md:w-1/3 aspect-square"
          >
            <h3>Зимові</h3>
          </LinkWithGA>

          <LinkWithGA
            href={'/tyres?season=allseason&view=gallery'}
            eventLabel="allseason"
            eventCategory="season_tyres_section"
            aria-label="Перейти до каталогу всесезонних шин"
            className="bg-theme-light flex content-center items-center rounded-md p-12 md:w-1/3 aspect-square"
          >
            <h3>Всесезон</h3>
          </LinkWithGA>
        </div>
      </section>

      <InfoSection />

    </>
  );
}
