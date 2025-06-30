"use client";

import { sendGAEvent } from "@/lib";
import { CartTyre } from "@/types";

const openCart = () => {
  window.dispatchEvent(new Event("open-cart"));
};

function handleClick(tyre: CartTyre) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[handleClick] tyre id:`, tyre.id);
  }

  localStorage.setItem("tyre", JSON.stringify(tyre));
  openCart();

  sendGAEvent({
    action: "add_to_cart",
    params: {
      currency: "UAH",
      items: [
        {
          item_id: tyre.id.toString(),
          item_name: tyre.title,
          item_price: tyre.price,
          item_quantity: tyre.quantity,
          currency: "UAH",
        },
      ],
    },
  });
}

export function AddToCartButton({
  tyre,
  label = "Купити",
  className,
}: {
  tyre: CartTyre;
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
      onClick={() => handleClick(tyre)}
      className={`${defaultClasses} ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
