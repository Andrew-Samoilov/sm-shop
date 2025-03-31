"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@/lib";

type ViewItemGAProps = {
  item_id: string | number;
  item_name: string;
  brand: string;
  model: string;
  price: number;
};

export function ViewItemGA({
  item_id,
  item_name,
  brand,
  model,
  price,
}: ViewItemGAProps) {
  useEffect(() => {
    sendGAEvent({
      action: "view_item",
      params: {
        item_id: String(item_id),
        item_name,
        brand,
        model,
        price,
      },
    });
  }, [item_id, item_name, brand, model, price]);

  return null;
}
