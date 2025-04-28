import features from "../static-data/features.json";
export function FeatureSection() {
  return (
    <section className="bg-theme-light dark:bg-darkmode-theme-light ">
      <div className="grid gap-6 md:grid-cols-2 lg:container lg:grid-cols-4 mx-auto">
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
