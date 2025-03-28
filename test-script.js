const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
    // Додаємо новий запис
    const newMessage = await prisma.messages.create({
        data: {
            name: "Тест",
            email: "test@example.com",
            phone: "+380123456789",
            message: "Перевірка запису",
        },
    });

    console.info("✅ Новий запис додано:", newMessage);

    // Отримуємо всі записи
    const allMessages = await prisma.messages.findMany();
    console.info("📌 Всі повідомлення:", allMessages);
}

test()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
