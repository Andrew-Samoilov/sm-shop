import { toast } from "react-toastify";
import { getOrderHtml, sendEmail, sendGAEvent } from "@/lib";
import { getProductHtml } from "@/components";

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

    const savedTyre = localStorage.getItem("tyre");
    let productData;

    if (savedTyre) {
      try {
        productData = JSON.parse(savedTyre);
        formData.set("tyreId", String(productData.id));
        formData.set("tyreTitle", productData.title ?? "");
        formData.set("tyreSize", productData.tyreSize ?? "");
        formData.set("tyrePrice", String(productData.price ?? ""));
        formData.set("quantity", String(productData.quantity ?? 1));
        formData.set("tyreImageUrl", productData.tyreImageUrl ?? "");
      } catch (err) {
        console.error("[LocalStorage] Failed to parse tyre:", err);
      }
    }

    const deliveryMethod = formData.get("delivery_method") as "pickup" | "delivery";

    const city = formData.get('delivery_city') as string | undefined;
    const warehouse = formData.get('delivery_warehouse') as string | undefined;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinamix.com.ua";

    const productHtml = getProductHtml({
      tyreId: productData?.id ?? formData.get("tyreId"),
      tyreTitle: productData?.title ?? formData.get("tyreTitle"),
      tyreSize: productData?.tyreSize ?? formData.get("tyreSize"),
      tyrePrice: productData?.price ?? formData.get("tyrePrice"),
      quantity: productData?.quantity ?? formData.get("quantity"),
      imageUrl: `${baseUrl}${productData?.tyreImageUrl ?? formData.get("tyreImageUrl")}`,
    });

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


    if (result.success) {
      const order = result.data;

      // its my privite email do not need push garbsge to analitics 
      if (order.email != "veprsag@gmail.com") {
        sendGAEvent({
          action: "purchase",
          params: {
            transaction_id: order.id.toString(),
            value: order.tyrePrice * order.quantity,
            currency: "UAH",
            items: [
              {
                item_id: order.tyreId.toString(),
                item_name: order.tyreTitle,
                item_variant: order.tyreSize,
                price: order.tyrePrice,
                quantity: order.quantity,
              },
            ],
          },
        });
      }

      toast.success("Замовлення успішно надіслано!");
    }


    const orderHtml = getOrderHtml({
      name,
      email,
      tel,
      deliveryMethod,
      city,
      warehouse,
      comment,
      productHtml,
    });

    const order = result.data;
    const now = new Date().toLocaleString('uk-UA');
    const subject = `Нове замовлення №${order.id} (${now})`;

    sendEmail({
      to: "webmaster@shinamix.com, ityre03@gmail.com",
      subject,
      html: orderHtml,
    });

    sendEmail({
      to: email,
      subject: `Ваше замовлення №${order.id} надіслано (${now})`,
      html: orderHtml
    });

    const formEl = document.getElementById(formId) as HTMLFormElement;
    formEl?.reset();
  } catch (error) {
    console.error("[Form] Error while submitting the order:", error);
    toast.error("Не вдалося зв’язатися із сервером. Спробуйте ще раз. Перевірте, будь ласка, ваше інтернет‑з’єднання та спробуйте ще раз. / Failed to connect to the server. / Please check your internet connection and try again.");
  }
}
