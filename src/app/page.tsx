import { TyresSelect } from "@/components";

export default function Home() {
  return (
    <section className="flex justify-center flex-wrap from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b
        w-full p-6 lg:p-0 flex-col gap-6 items-center">

      <TyresSelect />

    </section>
  );
}
