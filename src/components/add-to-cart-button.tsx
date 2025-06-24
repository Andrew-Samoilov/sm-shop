"use client";

import { sendGAEvent } from "@/lib";

const openCart = () => {
  window.dispatchEvent(new Event("open-cart"));
};

function handleClick(
  id: number,
  title: string,
  price: number,
  quantity: number,
) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[handleClick] tyre id:`, id);
  }

  const tyreData = JSON.stringify({ id, title, price, quantity });
  localStorage.setItem("tyre", tyreData);
  openCart();

  sendGAEvent({
    action: "add_to_cart",
    params: {
      currency: "UAH",
      items: [
        {
          item_id: id.toString(),
          item_name: title,
          price,
          quantity,
          currency: "UAH",
        },
      ],
    },
  });
}

export function AddToCartButton({
  id,
  title,
  price,
  quantity,
  label = "Купити",
  className,
}: {
  id: number;
  title: string;
  price: number;
  quantity: number;
  label?: string;
  className?: string;
}) {
  const defaultClasses = `btn max-md:btn-sm btn-primary z-10
    fixed bottom-2 left-2 right-2 bg-theme-light dark:bg-theme-dark
    md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent
    text-dark hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark
  `;
  return (
    <button
      type="button"
      onClick={() => handleClick(id, title, price, quantity)}
      className={`${defaultClasses} ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
