import { toast } from "react-toastify";
import { getOrderHtml, sendEmail, sendGAEvent } from "@/lib";
import { getProductHtml } from "@/components";
import { CartTyre } from "@/types";

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export async function handleOrderSubmit(
  formId: string,
  formData: FormData,
  tyres: CartTyre[]
) {
  try {
    // ✅ reCAPTCHA
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
    const recaptchaToken = await window.grecaptcha.execute(siteKey, {
      action: "submit",
    });
    formData.append("recaptcha", recaptchaToken);

    // ✅ Дані користувача
    const email = formData.get("order_email") as string;
    const name = formData.get("order_name") as string;
    const tel = formData.get("order_tel") as string;
    const comment = formData.get("order_comment") as string;

    // ✅ Перевірка кошика
    if (!Array.isArray(tyres) || tyres.length === 0) {
      toast.error("Кошик порожній або відсутній товар.");
      return;
    }

    // ✅ Тіло запиту
    const body = {
      customerName: name,
      customerEmail: email,
      customerTel: tel,
      customerComment: comment,
      tyres: tyres.map((t) => ({
        id: t.id,
        title: t.title,
        tyreSize: t.tyreSize,
        price: t.price,
        quantity: t.quantity,
      })),
    };

    // ✅ Створення замовлення
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[Order Submit Error]", text);
      toast.error("Помилка при створенні замовлення. Спробуйте пізніше.");
      return;
    }

    // ✅ Формуємо HTML лист
    const productsHtml = getProductHtml(
      tyres.map((t) => ({
        tyreId: t.id,
        tyreTitle: t.title,
        tyreSize: t.tyreSize,
        tyrePrice: t.price,
        quantity: t.quantity,
        imageUrl: t.tyreImageUrl,
      }))
    );

    const html = getOrderHtml({
      name,
      tel,
      email,
      comment,
      deliveryMethod: "delivery",
      productHtml: productsHtml,
    });

    // ✅ Надсилаємо лист користувачу
    await sendEmail({
      to: email,
      subject: "Ваше замовлення в ShinaMix",
      html,
    });

    // ✅ Надсилаємо копію адміну
    await sendEmail({
      to: "webmaster@shinamix.com.ua",
      subject: `Нове замовлення від ${name}`,
      html,
    });

    // ✅ GA event
    sendGAEvent({
      action: "purchase",
      params: {
        currency: "UAH",
        items: tyres.map((t) => ({
          item_id: t.id.toString(),
          item_name: t.title,
          price: t.price,
          quantity: t.quantity,
        })),
      },
    });

    // ✅ Завершення
    toast.success("Ваше замовлення успішно надіслано!");
    localStorage.removeItem("tyres");
    (document.getElementById(formId) as HTMLFormElement)?.reset();
  } catch (err) {
    console.error("[Order Submit Fatal Error]", err);
    toast.error("Помилка під час надсилання замовлення. Спробуйте ще раз.");
  }
}
