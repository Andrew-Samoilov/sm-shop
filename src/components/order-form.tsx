"use client";
import Form from "next/form";
import { useState } from "react";
import { handleOrderSubmit, loadRecaptchaScript } from "@/lib";
import { LinkWithGA, SubmitButton } from "@/components";
import { CartTyre } from "@/types";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function OrderForm({ tyre }: { tyre: CartTyre }){

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
      action={(formData) => handleOrderSubmit("order-form", formData)}
      aria-label="Форма замовлення"
      className="gap-2 xl:gap-6  flex  flex-col items-start  md:p-6"
    >

      <div className="flex flex-col items-left w-full  gap-0 md:gap-2 ">
        <label htmlFor="order_name" className="form-label">
          Ім&apos;я<span className="text-accent">*</span>
        </label>
        <input
          required={true}
          name="order_name"
          type="text"
          id="order_name"
          autoComplete="name"
          placeholder="Введіть імя..."
          className="w-full border-b  border-theme-light dark:bg-darkmode-theme-light"
          onFocus={initRecaptcha}
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
          required={true}
          id="order_tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380__ ___ ____ ___"
          className="w-full border-b  border-theme-light dark:bg-darkmode-theme-light"
        />
      </div>


      <div className="flex flex-left w-full gap-0 md:gap-2">
        <label htmlFor="order_comment" className="form-label">
          Повідомлення
        </label>
        <textarea
          name="order_comment"
          id="order_comment"
          inputMode="text"
          placeholder="Введіть повідомлення"


          className="w-full border-b border-theme-light dark:bg-darkmode-theme-light"
        />

      </div>

      <input type="hidden" name="tyreId" value={tyre.id} />
      <input type="hidden" name="tyreTitle" value={tyre.title} />
      <input type="hidden" name="tyreSize" value={tyre.tyreSize} />
      <input type="hidden" name="tyrePrice" value={tyre.price} />
      <input type="hidden" name="quantity" value={tyre.quantity} />

      <SubmitButton
        pendingText="Надсилання ..."
        className="w-2/3 mx-auto btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover"
      >
        Надіслати замовлення
      </SubmitButton>
      <p
        className="text-light text-sm"
      >Натискаючи &ldquo;Надіслати замовлення&ldquo;, Ви погоджуєтесь з&nbsp;
        <LinkWithGA
          href={'/info/legal'}
          eventLabel="legal"
          eventCategory="cart"
          aria-label="Умови використання сайту"
        >умовами
        </LinkWithGA>
      </p>
    </Form>
  );
}
