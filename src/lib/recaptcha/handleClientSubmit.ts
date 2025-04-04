import { toast } from "react-toastify";
import { formatFormData, sendEmail, sendGAEvent } from "@/lib";

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

// потрібен порожній export, щоб файл став модулем і TypeScript не сварився
export {};

export async function handleClientSubmit(formId: string, formData: FormData) {
  try {
    // Генеруємо токен reCAPTCHA v3
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
    const recaptchaToken = await window.grecaptcha.execute(siteKey, {
      action: "submit",
    });

    formData.append("recaptcha", recaptchaToken);

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error || "Не вдалося надіслати форму");
      console.error("❌ Сервер повернув помилку:", result.error);
      return;
    }

    toast.success("Запит успішно надіслано!");
    
    // 🎯 ВІДПРАВКА ПОДІЇ В GA
    sendGAEvent({
      action: "submit_contact_form",
      params: {
        form_location: "contact_page",
        form_type: "contact",
      },
    });

    sendEmail({
      subject: 'Нове повідомлення з сайту Shinamix.com',
      text: formatFormData(formData),
    });

    const formEl = document.getElementById(formId) as HTMLFormElement;
    formEl?.reset();
  } catch (error) {
    console.error("❌ Помилка під час надсилання форми:", error);
    toast.error("Помилка підключення до сервера");
  }
}
