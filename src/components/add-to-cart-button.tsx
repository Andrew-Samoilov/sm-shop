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
  
  return (
    <button
      type="button"
      onClick={() => handleClick(tyre)}
      className={className}
    >
      {label}
    </button>
  );
}
