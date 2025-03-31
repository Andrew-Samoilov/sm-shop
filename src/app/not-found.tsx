import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center text-center">
      <p
        className="pb-[0.25em] text-7xl font-extrabold md:text-9xl lg:text-[192px]"
        style={{
          WebkitTextStroke: "2px #4169e1",
          // через accent не працює :-(
          color: "transparent",
        }}
      >
        404!
      </p>
      <h1>Сторінка не знайдена</h1>
      <p className="text-lg md:mb-8">
        Нажаль, за цією адресою сторінки не існує або вона була переміщена.
      </p>
      <Link
        href="/"
        className="btn btn-sm md:btn-lg btn-primary hover:no-underline"
      >
        На головну
      </Link>
    </section>
  );
}
