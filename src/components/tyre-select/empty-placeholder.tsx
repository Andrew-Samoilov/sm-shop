import { BuyTyres, PopularBrands, PopularSizes } from "@/components";

export function EmptyPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center mx-auto py-10 text-center text-gray-500" >

            <p className="text-lg font-medium" >
                Оберіть параметри для пошуку шин
            </p>
            < p className="text-sm" >Використайте фільтри</p>

            <BuyTyres />

            <PopularBrands />

            <PopularSizes />
        </div>
    );
}
