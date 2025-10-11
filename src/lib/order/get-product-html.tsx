export function getProductHtml({
    tyreId,
    tyreTitle,
    tyreSize,
    tyrePrice,
    quantity,
    imageUrl,
}: {
    tyreId: number | string;
    tyreTitle: string;
    tyreSize: string;
    tyrePrice: number | string;
    quantity: number | string;
    imageUrl?: string;
}) {
    return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
    <b style="text-center">Дані про товар:</b>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
      <tr>
        ${imageUrl
            ? `<td width="160" valign="top" style="padding-right:16px;">
                <img 
                  src="${imageUrl}" 
                  alt="${tyreTitle}" 
                  width="150" 
                  style="display:block;border-radius:8px;"
                />
              </td>`
            : ""
        }
        <td valign="top">
            ${tyreId ? `<div><b>ID:</b> ${tyreId}</div>` : ""}
            ${tyreTitle ? `<div><b>Назва:</b> ${tyreTitle}</div>` : ""}
            ${tyreSize ? `<div><b>Розмір:</b> ${tyreSize}</div>` : ""}
            ${tyrePrice ? `<div><b>Ціна:</b> ${tyrePrice} грн</div>` : ""}
            ${quantity ? `<div><b>Кількість:</b> ${quantity}</div>` : ""}
        </td>
      </tr>
    </table>
  `;
}
