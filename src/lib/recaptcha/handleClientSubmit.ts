import { toast } from "react-toastify";
// import { sendGAEvent } from "@/lib";

export async function handleClientSubmit(formId: string, formData: FormData) {
    try {
        const response = await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        if (!response.ok) throw new Error("Помилка збереження повідомлення");

        const result = await response.json();

        if (!result.success) {
            toast.error(result.error || "Не вдалося надіслати форму");
            console.error("❌ Помилка під час надсилання форми:", result.error);
            return;
        }

        toast.success("Запит успішно надіслано!");
        console.log("✅ Форма успішно надіслана:", result);

        // Відправка подій в GA
        // const gaEvents: Record<string, { event_category: string; event_label: string }> = {
        //     "price-form": {
        //         event_category: "Form",
        //         event_label: "Price Subscription",
        //     },
        //     "contact-form": {
        //         event_category: "Form",
        //         event_label: "Contact Form",
        //     },
        // };

        // if (formId in gaEvents) {
        //     sendGAEvent(formId, gaEvents[formId]);
        // } else {
        //     console.warn("⚠️ Невідомий `id` форми:", formId);
        // }
    } catch (error) {
        console.error("❌ Помилка під час надсилання форми:", error);
        toast.error("Помилка підключення до сервера");
    }
}
