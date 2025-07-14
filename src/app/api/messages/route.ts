import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.info("[PRISMA] Incoming data:", body);

    // Переконуємось, що всі необхідні поля є
    const name = body.contact_name?.trim();
    const email = body.contact_email?.trim();
    const phone = body.contact_tel?.trim() ?? null;
    const message = body.contact_message?.trim();

    if (!message) {
      console.error("[PRISMA] Error: Required field message is missing.");
      return NextResponse.json(
        { success: false, error: "Please enter a message." },
        { status: 400 },
      );
    }

    // Збереження в БД
    const newMessage = await prisma.message.create({
      data: { name, email, phone, message },
    });

    if (process.env.NODE_ENV === "development") {
      console.info("[PRISMA] Message saved:", newMessage);
    }

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error("[PRISMA] Error in API:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred on the server. Please try again later or contact us at webmaster@shinamix.com" },
      { status: 500 },
    );
  }
}
