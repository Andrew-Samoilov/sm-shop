import { Feature } from "@/types";

export async function FeatureSection() {
  const features: Feature[] = [
    {

      id:1,
      number: '24',
      header: 'роки',
      subHeader: 'на ринку України',
    },
    {
      id:2,
      number: '5/5',
      header: 'рейтинг',
      subHeader: 'серед наших клієнтів',
    },
    {
      id:3,
      number: '10+',
      header: 'мільйонів',
      subHeader: 'шин продано',
    },
    {
      id:4,
      number: '14,5',
      header: 'роки',
      subHeader: 'середній досвід на співробітника',
    },
  ];


  return (
    <section className="bg-theme-light dark:bg-darkmode-theme-light ">
      <div className="container grid gap-6 md:grid-cols-2  lg:grid-cols-4 mx-auto">
        {features.map(({ id, number, header, subHeader }) => (
          <div key={id} className="flex flex-col items-center text-center">
            <div className="text-8xl font-extrabold">{number}</div>
            <h2>{header}</h2>
            <p className="text-xl">{subHeader}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
