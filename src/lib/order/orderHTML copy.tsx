export const orderHtml = `
    // <div><img src="https://shinamix.com/logo.png" alt="Shinamix" width="150"/></div>
      <p>Дякуємо, <b>${name}</b>! Ваше замовлення надіслано. Ми відповімо найближчим часом.</p>
      <hr/>
      <ul> 
        <li><b>Ім'я:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Телефон:</b> ${tel}</li>

        <p>Спосіб доставки: ${deliveryMethod === 'pickup' ? 'Самовивіз' : 'Доставка'}</p>
${deliveryMethod === 'delivery' ? `Місто: ${city}\n Відділення: ${warehouse}` : ''}

       ${comment ? `<li><b>Повідомлення:</b> ${comment}</li>` : ""}
      </ul>
      ${productHtml}
    `;