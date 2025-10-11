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
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f9fafb;">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="padding:30px 0;text-align:center;background:#111827;">
                <div style="width:64px;height:auto;margin:0 auto;">
                  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                  <svg width="64" height="32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(-9.4983664,-9.4898964)">
                      <path
                        d="m 10,10 0.63,80 H 110 V 39 l 20,31 20,-30 v 50 h 20 V 10 H 150 L 130,40 110.33,10 H 90 V 70 H 70 V 30 H 50 V 70 H 30 V 10 L 10.01,9.99 Z"
                        fill="#4169e1"
                        stroke="#ffffff"
                        stroke-opacity="0.1" />
                    </g>
                  </svg>
                </div>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:30px 40px 10px 40px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#111827;">Ваше замовлення підтверджено ✅</h1>
                <p style="margin-top:10px;font-size:16px;color:#6b7280;">
                  Дякуємо, <b>${name}</b>! Ми вже готуємо ваше замовлення до відправки.
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

            <!-- Button -->
            <tr>
              <td align="center" style="padding:20px 40px 40px 40px;">
                <a href="https://shinamix.com.ua/orders" style="background-color:#111827;color:#ffffff;font-size:16px;padding:12px 24px;border-radius:8px;display:inline-block;text-decoration:none;font-weight:bold;">
                  Переглянути замовлення
                </a>
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
