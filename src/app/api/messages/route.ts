import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("📥 Отримані дані:", body);

        // Переконуємось, що всі необхідні поля є
        const name = body.contact_name?.trim();
        const email = body.contact_email?.trim();
        const phone = body.contact_tel?.trim() || null;
        const message = body.contact_message?.trim();

        if (!name || !email || !message) {
            console.error("❌ Помилка: Не всі обов'язкові поля передані.");
            return NextResponse.json(
                { success: false, error: "Заповніть всі обов'язкові поля" },
                { status: 400 }
            );
        }

        // Збереження в БД
        const newMessage = await prisma.messages.create({
            data: { name, email, phone, message },
        });

        console.log("✅ Повідомлення збережено:", newMessage);
        return NextResponse.json({ success: true, data: newMessage });

    } catch (error) {
        console.error("❌ Помилка в API:", error);
        return NextResponse.json(
            { success: false, error: "Помилка збереження повідомлення" },
            { status: 500 }
        );
    }
}
