import { PopularBrands, PopularSizes } from "@/components";

export function EmptyPlaceholder() {
    return (
        <section className="section flex flex-col items-center justify-center mx-auto py-2 text-center text-gray-500" >

            <p className="text-lg font-medium" >
                Оберіть параметри для пошуку шин
            </p>
            <p>Використайте фільтри</p>

            <PopularSizes />

            <PopularBrands />

        </section>
    );
}
