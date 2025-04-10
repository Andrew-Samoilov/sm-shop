import { test, expect } from '@playwright/test';

test('Форма відправляє дані і запис зʼявляється у БД', async ({ page, request }) => {
    const testEmail = `test-${Date.now()}@example.com`;

    await page.goto('/contacts');

    await page.fill('input[name="contact_name"]', 'Playwright Тест');
    await page.fill('input[name="contact_email"]', testEmail);
    await page.fill('input[name="contact_tel"]', '0991234567');
    await page.focus('textarea[name="contact_message"]');
    await page.fill('textarea[name="contact_message"]', 'Це перевірка форми у продакшені');
    await page.check('input[name="contact_ok"]');
    
    await page.click('button[type="submit"]');

    // Зачекати трохи, поки сервер обробить запит
    await page.waitForTimeout(3000);

    const res = await request.get(
        `/api/test/check-message?email=${testEmail}&secret=${process.env.TEST_API_SECRET}`
    );

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message.email).toBe(testEmail);
});
