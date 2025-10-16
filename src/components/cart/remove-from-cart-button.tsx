"use client";

import { sendGAEvent } from "@/lib";
import { CartTyre } from "@/types";
import { TrashIcon } from "@heroicons/react/24/solid";

export function RemoveFromCartButton({
  tyre,
  className,
  onRemoved,
}: {
  tyre: CartTyre;
  className?: string;
  onRemoved?: () => void;
}) {
  const handleRemove = () => {
    if (process.env.NODE_ENV === "development") {
      console.info(`[handleRemove] tyre id:`, tyre.id);
    }
    
    try {
      localStorage.removeItem("tyre");

      sendGAEvent({
        action: "remove_from_cart",
        params: {
          currency: "UAH",
          items: [
            {
              item_id: tyre.id.toString(),
              item_name: tyre.title,
              item_price: tyre.price,
              currency: "UAH",
            },
          ],
        },
      });

      // Закриваємо кошик / оновлюємо стан
      if (onRemoved) onRemoved();
      globalThis.dispatchEvent(new Event("close-cart"));
    } catch (err) {
      console.error("[RemoveFromCartButton] Помилка при видаленні:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRemove}
      className={
        className ??
        "text-sm text-gray-500 hover:text-accent transition-colors"
      }
    >
      <TrashIcon className=" h-5 w-5 cursor-pointer text-light" />
    </button>
  );
}
