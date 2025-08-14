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

    const email = formData.get('contact_email') as string;
    const name = formData.get('contact_name') as string;
    const message = formData.get('contact_message') as string;

    formData.append("recaptcha", recaptchaToken);

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error ?? "Не вдалося надіслати форму / Failed to submit the form");
      console.error("[Form] Server returned an error:", result.error);
      return;
    }

    toast.success("Запит успішно надіслано! / Request sent successfully!");
    
    // ВІДПРАВКА ПОДІЇ В GA
    sendGAEvent({
      action: "submit_contact_form",
      params: {
        form_location: "contact_page",
        form_type: "contact",
      },
    });

    sendEmail({
      subject: 'Нове повідомлення з сайту Shinamix',
      text: formatFormData(formData),
    });

    sendEmail({
      to: email,
      subject: "Ваше повідомлення надіслано",
      html: `<p>Дякуємо, ${name}! Ваше замовлення надіслано. Ми відповімо найближчим часом.</p>
             <hr />
             <p><b>Ваше повідомлення:</b></p>
             <p>${message}</p>`
    });

    const formEl = document.getElementById(formId) as HTMLFormElement;
    formEl?.reset();
  } catch (error) {
    console.error("[Form] Error while submitting the form:", error);
    toast.error("Не вдалося зв’язатися із сервером. Перевірте, будь ласка, ваше інтернет‑з’єднання та спробуйте ще раз. Failed to connect to the server. / Please check your internet connection and try again.");
  }
}
