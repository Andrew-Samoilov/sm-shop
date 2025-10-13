'use server'

import { getContentBlock } from "@/lib";
import { Benefit } from "@/types";

export async function BenefitsSection() {
  const benefits = await getContentBlock<Benefit[]>('benefit', [])
  
  return (
    <section className="container flex flex-col md:flex-row 2xl:justify-around py-6">
      <div>
        <h2 className="text-left">Наші переваги</h2>
        <p className="subHeader">Відкрийте для себе наші виняткові переваги</p>
      </div>
      <ul className="flex list-disc flex-col pl-4 lg:pl-0">
        {benefits.map(({ id, title }) => (
          <li key={id} className="lg:text-xl">
            {title}
          </li>
        ))}
      </ul>
    </section>
  );
}
