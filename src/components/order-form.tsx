"use client";
import Form from "next/form";
import { useState } from "react";
import { handleClientSubmit, loadRecaptchaScript } from "@/lib";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function OrderForm() {

  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  const initRecaptcha = async () => {
    if (!isRecaptchaReady) {
      try {
        await loadRecaptchaScript(siteKey);
        setIsRecaptchaReady(true);
      } catch (e) {
        console.error(`[Recaptcha]`, e);
      }
    }
  };

  return (
    <Form
      id="order-form"
      action={(formData) => handleClientSubmit("order-form", formData)}
      aria-label="Форма замовлення звязку"
      className="gap-2 xl:gap-6  flex  flex-col items-start  md:p-6"
    >

      <div className="flex flex-col items-left w-full  gap-0 md:gap-2 ">
        <label htmlFor="order_name" className="form-label">
          Ім&apos;я<span className="text-accent">*</span>
        </label>
        <input
          name="order_name"
          type="text"
          id="order_name"
          autoComplete="name"
          placeholder="Введіть імя..."
          className="w-full border-b  border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>

      <div className="flex flex-col items-left w-full gap-0 md:gap-2">
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
          className="w-full border-b  border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>


      <div className="flex flex-col items-left w-full gap-0 md:gap-2">
        <label htmlFor="order_tel" className="form-label">
          Тел<span className="text-accent">*</span>
        </label>
        <input
          name="order_tel"
          type="tel"
          id="order_tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380__ ___ ____ ___"
          className="w-full border-b  border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>


      <div className="flex flex-left w-full gap-0 md:gap-2">
        <label htmlFor="order_message" className="form-label">
          Повідомлення
        </label>
        <textarea
          required={true}
          name="order_message"
          id="order_message"
          inputMode="text"
          placeholder="Введіть повідомлення"
          onFocus={initRecaptcha}

          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>

      {/* <SubmitButton

        pendingText="Надсилання ..."
        className="btn btn-primary ml-auto"
      >
        Надіслати
      </SubmitButton> */}
    </Form>
  );
}
