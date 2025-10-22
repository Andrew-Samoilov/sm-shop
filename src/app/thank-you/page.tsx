import { getBaseMetadataAction } from "@/lib/server/get-base-metadata-action";
import Link from "next/link";

export async function generateMetadata() {
    return getBaseMetadataAction({
        title: "Дякуємо за замовлення — ShinaMix",
        description:
            "Ваше замовлення прийнято! Команда ShinaMix зв’яжеться з вами найближчим часом для підтвердження деталей. Ми цінуємо вашу довіру.",
        openGraph: {
            title: "Дякуємо за замовлення — ShinaMix",
            description:
                "Ваше замовлення успішно оформлено! Ми вже працюємо над його обробкою та незабаром з вами зв’яжемось.",
        },
    });
}


export default function ThankYouPage() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
            <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl font-semibold text-accent  mb-4">
                    Дякуємо за замовлення!
                </h1>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Ми отримали ваше замовлення і вже працюємо над ним.
                    Найближчим часом наш менеджер зв’яжеться з вами для уточнення деталей.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-2 rounded-lg  px-6 py-3 font-medium text-light dark:text-theme-light border border-border hover:border-theme-dark transition hover:no-underline"
                >
                    Повернутись на головну
                </Link>
            </div>

            <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                Якщо маєте запитання — телефонуйте:{" "}
                <a href="tel:+380973232161" className=" font-medium">
                    097 323 21 61
                </a>
            </div>
        </main>
    );
}
