import {benefits} from '../static-data/benefits.json'

export function BenefitsSection() {
    return (
        <section className="container flex flex-col md:flex-row gap-6 2xl:justify-around ">
            <div>
                <h2 className="text-left">Наші досягнення в цифрах</h2>
                <p className="subHeader">Наші вражаючі досягнення в цифрах</p>
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
