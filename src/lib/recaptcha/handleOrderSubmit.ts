import { toast } from "react-toastify";
import { sendEmail, sendGAEvent } from "@/lib";

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

// потрібен порожній export, щоб файл став модулем і TypeScript не сварився
export { };

export async function handleOrderSubmit(formId: string, formData: FormData) {
  try {
    // Генеруємо токен reCAPTCHA v3
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
    const recaptchaToken = await window.grecaptcha.execute(siteKey, {
      action: "submit",
    });

    formData.append("recaptcha", recaptchaToken);

    const email = formData.get('order_email') as string;
    const name = formData.get('order_name') as string;
    const tel = formData.get("order_tel") as string;
    const comment = formData.get('order_comment') as string;

    // Дані про товар з прихованих полів
    const tyreId = formData.get("tyreId") as string | null;
    const tyreTitle = formData.get("tyreTitle") as string | null;
    const tyreSize = formData.get("tyreSize") as string | null;
    const tyrePrice = formData.get("tyrePrice") as string | null;
    const quantity = formData.get("quantity") as string | null;

    let productHtml = "";
    if (tyreId || tyreTitle || tyreSize || tyrePrice || quantity) {
      productHtml = `
        <hr/>
        <b>Дані про товар:</b>
        <ul>
          ${tyreId ? `<li><b>ID:</b> ${tyreId}</li>` : ""}
          ${tyreTitle ? `<li><b>Назва:</b> ${tyreTitle}</li>` : ""}
          ${tyreSize ? `<li><b>Розмір:</b> ${tyreSize}</li>` : ""}
          ${tyrePrice ? `<li><b>Ціна:</b> ${tyrePrice} грн</li>` : ""}
          ${quantity ? `<li><b>Кількість:</b> ${quantity}</li>` : ""}
        </ul>
        
      `;
    }

    const orderHtml = `
      <p>Дякуємо, <b>${name}</b>! Ваше замовлення надіслано. Ми відповімо найближчим часом.</p>
      <hr/>
      <ul> 
        <li><b>Ім'я:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Телефон:</b> ${tel}</li>
       ${comment ? `<li><b>Повідомлення:</b> ${comment}</li>` : ""}
      </ul>
      ${productHtml}
    `;

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error ?? "Не вдалося надіслати замовлення / Failed to submit the order");
      console.error("[Form]Server returned an error:", result.error);
      return;
    }

    toast.success("Замовлення успішно надіслано!");

    // ВІДПРАВКА ПОДІЇ В GA
    sendGAEvent({
      action: "order",
      params: {
        form_type: "order",
      },
    });

    sendEmail({
      subject: `Нове замовлення з сайту ShinaMix`,
      html: orderHtml,
    });

    sendEmail({
      to: email,
      subject: "Ваше замовлення надіслано",
      html: orderHtml
    });

    const formEl = document.getElementById(formId) as HTMLFormElement;
    formEl?.reset();
  } catch (error) {
    console.error("[Form] Error while submitting the order:", error);
    toast.error("Не вдалося зв’язатися із сервером. Перевірте, будь ласка, ваше інтернет‑з’єднання та спробуйте ще раз. / Failed to connect to the server. / Please check your internet connection and try again.");
  }
}
