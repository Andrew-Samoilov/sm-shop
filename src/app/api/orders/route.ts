import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.info("[PRISMA] Отримані дані:", body);

    // Переконуємось, що всі необхідні поля є
    const name = body.order_name?.trim();
    const email = body.order_email?.trim() || null;
    const phone = body.order_tel?.trim() ?? null;
    const comment = body.order_comment?.trim() || null; ;
    const tyreId = Number(body.tyreId);
    const tyreTitle = body.tyreTitle;
    const tyreSize = body.tyreSize;
    const tyrePrice = Number(body.tyrePrice);
    const quantity = Number(body.quantity);

    if (!name) {
      console.error("[PRISMA] Помилка: Обовязкове поле name НЕ передано.");
      return NextResponse.json(
        { success: false, error: "Будь ласка представтесь." },
        { status: 400 },
      );
    }

    if (!phone) {
      console.error("[PRISMA] Помилка: Обовязкове поле phone НЕ передано.");
      return NextResponse.json(
        { success: false, error: "Будь ласка, введіть номер телефону." },
        { status: 400 },
      );
    }

    // Збереження в БД
    const newOrder = await prisma.order.create({
      data: {
        name, email, phone, comment, tyreId, tyreTitle, tyreSize, tyrePrice, quantity
      },
    });


    if (process.env.NODE_ENV === "development") {
      console.info("[PRISMA] Замовленнея збережено:", newOrder);
    }

    return NextResponse.json({ success: true, data: newOrder });
  } catch (error) {
    console.error("[PRISMA] Помилка в API:", error);
    return NextResponse.json(
      { success: false, error: "Сталася помилка на сервері. Спробуйте, будь ласка, ще раз пізніше або звяжіться з нами електронною поштою webmaster@shinamix.com" },
      { status: 500 },
    );
  }
}
