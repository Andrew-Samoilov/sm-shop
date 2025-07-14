import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.info("[PRISMA] incoming data:", body);

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
      console.error("[PRISMA] Error: Required field [name] is missing.");
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!phone) {
      console.error("[PRISMA] Error: Required field [phone] is missing.");
      return NextResponse.json(
        { success: false, error: "Please enter your phone number." },
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
      console.info("[PRISMA] Order saved:", newOrder);
    }

    return NextResponse.json({ success: true, data: newOrder });
  } catch (error) {
    console.error("[PRISMA] Error in API:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred on the server. Please try again later or contact us at webmaster@shinamix.com" },
      { status: 500 },
    );
  }
}
