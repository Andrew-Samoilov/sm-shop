"use client";

import { sendGAEvent } from "@/lib";

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
}: {
  id: number;
  title: string;
  price: number;
    quantity: number;
    label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => handleClick(id, title, price, quantity)}
      className="
      btn btn-outline-primary z-10
      fixed bottom-2 left-2 right-2 bg-theme-light dark:bg-theme-dark
      md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent
      md:hover:bg-dark md:hover:text-white
      dark:md:hover:bg-white dark:md:hover:text-dark
   "
    >
      {label}
    </button>
  );
}
