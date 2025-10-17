"use client";
import Form from "next/form";
import { useState } from "react";
import { handleOrderSubmit, loadRecaptchaScript } from "@/lib";
import { DeliverySelect, LinkWithGA, SubmitButton } from "@/components";
import { CartTyre } from "@/types";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function OrderForm({ tyres }: { tyres: CartTyre[] }) {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  // ініціалізація reCAPTCHA
  const initRecaptcha = async () => {
    if (!isRecaptchaReady) {
      try {
        await loadRecaptchaScript(siteKey);
        setIsRecaptchaReady(true);
      } catch (e) {
        console.error("[Recaptcha] Load error:", e);
      }
    }
  };
  const [localTyres] = useState(tyres);


  // сабміт форми
  const handleAction = async (formData: FormData) => {
    try {
      await initRecaptcha();
      const token = await window.grecaptcha.execute(siteKey, { action: "submit" });
      formData.append("recaptcha", token);

      await handleOrderSubmit("order-form", formData, localTyres);
    } catch (err) {
      console.error("[OrderForm] Submit error:", err);
    }
  };

  return (
    <Form
      id="order-form"
      action={handleAction}

      aria-label="Форма замовлення"
      className="gap-2 xl:gap-6 flex flex-col items-start md:p-6"
    >
      {/* --- Ім’я --- */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="order_name" className="form-label">
          Ім&apos;я<span className="text-accent">*</span>
        </label>
        <input
          required
          name="order_name"
          type="text"
          id="order_name"
          autoComplete="name"
          placeholder="Введіть ім'я..."
          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
          onFocus={initRecaptcha}
        />
      </div>

      {/* --- Email --- */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="order_email" className="form-label">
          Email
        </label>
        <input
          name="order_email"
          type="email"
          inputMode="email"
          id="order_email"
          autoComplete="email"
          placeholder="example@domain.com"
          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>

      {/* --- Телефон --- */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="order_tel" className="form-label">
          Тел<span className="text-accent">*</span>
        </label>
        <input
          name="order_tel"
          type="tel"
          required
          id="order_tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380__ ___ ____ ___"
          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>

      {/* --- Спосіб отримання --- */}
      <fieldset className="flex flex-col w-full gap-3">
        <legend className="form-label">Спосіб отримання</legend>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="delivery_method"
              value="pickup"
              defaultChecked
              required
              className="accent-accent h-4 w-4"
            />
            <span>Самовивіз</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="delivery_method"
              value="delivery"
              required
              className="accent-accent h-4 w-4"
            />
            <span>Доставка</span>
          </label>
        </div>

        <DeliverySelect />
      </fieldset>

      {/* --- Коментар --- */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="order_comment" className="form-label">
          Повідомлення
        </label>
        <textarea
          name="order_comment"
          id="order_comment"
          placeholder="Введіть повідомлення"
          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>

      {/* --- Кнопка --- */}
      <SubmitButton
        pendingText="Надсилання ..."
        className="w-2/3 mx-auto btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover"
      >
        Надіслати замовлення
      </SubmitButton>

      {/* --- Примітка --- */}
      <p className="text-light text-sm mx-auto text-center">
        Натискаючи &ldquo;Надіслати замовлення&ldquo;, Ви погоджуєтесь з&nbsp;
        <LinkWithGA
          href="/info/legal"
          eventLabel="legal"
          eventCategory="cart"
          aria-label="Умови використання сайту"
        >
          умовами
        </LinkWithGA>
      </p>
    </Form>
  );
}
