"use client";
import Form from "next/form";

import { useState } from "react";
import { SubmitButton } from "./submit-button";
import { handleClientSubmit, loadRecaptchaScript } from "@/lib";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function ContactForm() {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const [isRecaptchaReady, setRecaptchaReady] = useState(false);

  const initRecaptcha = async () => {
    if (!isRecaptchaReady) {
      try {
        await loadRecaptchaScript(siteKey);
        setRecaptchaReady(true);
      } catch (e) {
        console.error(`[Recaptcha]`,e);
      }
    }
  };

  return (
    <Form
      id="contact-form"
      action={(formData) => handleClientSubmit("contact-form", formData)}
      aria-label="Форма зворотнього звязку"
      className="border-border dark:border-darkmode-border mx-auto flex w-full min-w-[55vw] flex-col items-start rounded-md border p-6 md:p-10 lg:w-auto xl:min-w-[40vw]"
    >
      <div className="mb-6 flex w-full flex-col gap-6 lg:flex-row">
        <div>
          <label htmlFor="contact_name" className="form-label">
            Ім&apos;я
          </label>
          <input
            name="contact_name"
            type="text"
            id="contact_name"
            autoComplete="name"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="contact_email" className="form-label">
            Email
          </label>
          <input
            name="contact_email"
            type="email"
            id="contact_email"
            autoComplete="email"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="contact_tel" className="form-label">
            Тел
          </label>
          <input
            name="contact_tel"
            type="tel"
            id="contact_tel"
            autoComplete="tel"
            className="form-input"
          />
        </div>
      </div>
      <label htmlFor="contact_message" className="form-label">
        Повідомлення <span className="text-accent">*</span>
      </label>
      <textarea
        required={true}
        name="contact_message"
        id="contact_message"
        onFocus={initRecaptcha}
        rows={4}
        className="form-input mb-6"
      />
      <div className="mb-6">
        <input
          type="checkbox"
          defaultChecked
          name="contact_ok"
          id="contact_ok"
          className="mr-2 rounded-sm"
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="contact_ok"
          className="text-dark dark:text-darkmode-light font-normal max-md:text-base"
        >
          Погоджуюсь з умовами використання
        </label>
      </div>

      <SubmitButton
        disabled={!isChecked}
        pendingText="Надсилання ..."
        className="btn btn-primary ml-auto"
      >
        Надіслати
      </SubmitButton>
    </Form>
  );
}
