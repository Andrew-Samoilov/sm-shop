import benefits from '../static-data/benefits.json'

export function BenefitsSection() {
    return (
        <section className="container flex flex-col md:flex-row gap-6 2xl:justify-around ">
            <div>
                <h2 className="text-left">Наші переваги</h2>
                <p className="subHeader">Відкрийте для себе наші виняткові переваги</p>
            </div>
            <ul className="flex flex-col list-disc pl-4 lg:pl-0">
                {benefits.map(({ id, title }) => (
                    <li key={id} className="lg:text-xl ">
                        {title}
                    </li>
                ))}
            </ul>
        </section>
    )
}
