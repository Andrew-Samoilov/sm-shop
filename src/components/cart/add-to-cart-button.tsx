"use client";

import { sendGAEvent } from "@/lib";
import { CartTyre } from "@/types";

function handleClick(tyre: CartTyre) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[handleClick] tyre id:`, tyre.id);
  }

  let cart: CartTyre[] = [];


  // 🔹 1. Зчитуємо існуючий кошик (масив)
  try {
    const stored = localStorage.getItem("tyres");
    if (stored) {
      cart = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Помилка читання tyres з localStorage:", err);
  }

  // 🔹 2. Перевіряємо, чи цей товар уже є
  const existing = cart.find((item) => item.id === tyre.id);

  if (existing) {
    // Якщо є — просто додаємо кількість
    existing.quantity = (existing.quantity ?? 0) + (tyre.quantity ?? 1);
  } else {
    // Якщо немає — додаємо новий товар
    const quantity = tyre.quantity ?? 4;
    cart.push({ ...tyre, quantity });
  }

  // 🔹 3. Зберігаємо назад
  try {
    localStorage.setItem("tyres", JSON.stringify(cart));
  } catch (err) {
    console.error("Помилка запису tyres у localStorage:", err);
  }

  // 🔹 4. Відправляємо події для CartPanel
  globalThis.dispatchEvent(new Event("cart-updated"));

  //fucking react slows
  setTimeout(() => {
    globalThis.dispatchEvent(new Event("open-cart"));
  }, 50);

  // 🔹 5. Аналітика
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
