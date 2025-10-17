import { NextResponse } from "next/server";
import { prisma } from "@/lib";

interface TyreItem {
  id: number;
  title: string;
  tyreSize?: string;
  price: number;
  quantity?: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ 1. базова перевірка
    if (!Array.isArray(body.tyres) || body.tyres.length === 0) {
      return NextResponse.json({ error: "No tyres provided" }, { status: 400 });
    }

    if (!body.customerName || !body.customerTel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ 2. (опціонально) перевірка reCAPTCHA
    if (body.recaptcha) {
      try {
        const verify = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptcha}`,
          }
        ).then((r) => r.json());

        if (!verify.success) {
          return NextResponse.json(
            { error: "reCAPTCHA verification failed" },
            { status: 403 }
          );
        }
      } catch (err) {
        console.error("[reCAPTCHA]", err);
      }
    }

    console.log("[API][orders] incoming tyres:", body.tyres);

    const order = await prisma.order.create({
      data: {
        name: body.customerName,
        phone: body.customerTel,
        email: body.customerEmail,
        comment: body.customerComment ?? null,
        deliveryMethod: body.deliveryMethod ?? "delivery",
        deliveryCity: body.city ?? null,
        deliveryWarehouse: body.warehouse ?? null,

        items: {
          create: body.tyres.map((t: TyreItem) => ({
            // 👇 ключовий момент
            tyre: {
              connect: {
                id: Number(t.id),
              },
            },
            tyreTitle: t.title,
            tyreSize: t.tyreSize,
            tyrePrice: Number(t.price),
            quantity: Number(t.quantity),
          })),
        },
      },
      include: { items: true },
    });



    console.log(`[ORDER CREATED] id=${order.id}, items=${order.items.length}`);

    // ✅ 4. повертаємо результат
    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("[API/ORDERS] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
