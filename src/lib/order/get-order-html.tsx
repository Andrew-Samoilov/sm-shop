export function getOrderHtml({
  name,
  email,
  tel,
  deliveryMethod,
  city,
  warehouse,
  comment,
  productHtml,
}: {
  name: string;
  email: string;
  tel: string;
  deliveryMethod: "pickup" | "delivery";
  city?: string;
  warehouse?: string;
  comment?: string;
  productHtml: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <title>Підтвердження замовлення — ShinaMix</title>
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;>
      <tr>
        <td align="center" style="padding:40px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff;border-radius:12px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="text-align:center;">
                <div style="text-align:center;margin-bottom:16px;">
  <img
  src="https://shinamix.com.ua/favicon.ico"
   width="32" height="32" alt="ShinaMix"
   style="vertical-align:middle;margin-right:8px;">
  <span style="font-size:20px;font-weight:600;color:#4169E1;">ShinaMix</span>
</div>
              </td>
            </tr> 

            <!-- Title -->
            <tr>
              <td style="padding:30px 40px 10px 40px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#111827;">Ваше замовлення отримано ✅</h1>
                <p style="margin-top:10px;font-size:16px;color:#6b7280;">
                  Дякуємо, <b>${name}</b>! Ми вже обробляємо ваше замовлення
                </p>
              </td>
            </tr>

            <!-- Order Details -->
            <tr>
              <td style="padding:0 40px 30px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                  <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Ім'я:</td><td style="padding:6px 0;color:#374151;text-align:right;">${name}</td></tr>
                  <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Email:</td><td style="padding:6px 0;color:#374151;text-align:right;">${email}</td></tr>
                  <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Телефон:</td><td style="padding:6px 0;color:#374151;text-align:right;">${tel}</td></tr>
                  <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Доставка:</td><td style="padding:6px 0;color:#374151;text-align:right;">${deliveryMethod === "pickup" ? "Самовивіз" : "Нова Пошта"}</td></tr>
                  ${deliveryMethod === "delivery"
      ? `
                        <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Місто:</td><td style="padding:6px 0;color:#374151;text-align:right;">${city}</td></tr>
                        <tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Відділення:</td><td style="padding:6px 0;color:#374151;text-align:right;">${warehouse}</td></tr>
                      `
      : ""
    }
                  ${comment
      ? `<tr><td style="padding:6px 0;color:#111827;font-weight:bold;">Коментар:</td><td style="padding:6px 0;color:#374151;text-align:right;">${comment}</td></tr>`
      : ""
    }
                </table>
              </td>
            </tr>

            <!-- Product list -->
            <tr>
              <td style="padding:0 40px 30px 40px;">
                ${productHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px;text-align:center;font-size:12px;color:#9ca3af;background:#f3f4f6;">
                © 2025 ShinaMix. Всі права захищено.<br />
                <a href="https://shinamix.com.ua/" style="color:#6b7280;text-decoration:underline;">shinamix.com.ua</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
