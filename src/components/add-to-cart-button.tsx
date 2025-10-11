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

  // Отримуємо поточну кількість із localStorage
  let quantity = tyre.quantity ?? 4;
  try {
    const stored = localStorage.getItem("tyre");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed.quantity === "number") {
        quantity = parsed.quantity;
      }
    }
  } catch (err) {
    console.error("Помилка читання quantity з localStorage:", err);
  }

  const tyreWithQuantity = { ...tyre, quantity };

  localStorage.setItem("tyre", JSON.stringify(tyreWithQuantity));
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
          item_quantity: quantity,
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
