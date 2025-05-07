import TyresSelect from "@/components/tyre-select/tyres-select";

export default function Home() {
  return (
    <section className="flex justify-center flex-wrap p-0 ">
      <div
        className="from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b
        w-full p-6 lg:p-0 flex flex-col gap-6 items-center">
        <TyresSelect />
      </div>

    </section>
  );
}
