export function getProductHtml(tyres: {
  tyreId: number | string;
  tyreTitle: string;
  tyreSize: string;
  tyrePrice: number | string;
  quantity: number | string;
  imageUrl?: string;
}[]) {
  const baseUrl = "https://shinamix.com.ua";

  return tyres
    .map((t) => {
      const imageUrl = t.imageUrl;
      let imageSrc: string | null = null;

      if (imageUrl?.startsWith("http")) {
        imageSrc = imageUrl;
      } else if (imageUrl) {
        imageSrc = `${baseUrl}${imageUrl}`;
      }

      const imageHtml = imageSrc
        ? `<img 
          src="${imageSrc}" 
          alt="${t.tyreTitle}" 
          width="150" 
          style="display:block;border-radius:8px;"
        />`
        : "";

      return `
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
        <tr>
          ${imageHtml
          ? `<td width="160" align="center" style="padding-right:16px;text-align:center;vertical-align:middle;">
               <img
                 src="${imageSrc}"
                 alt="${t.tyreTitle}"
                 width="150"
                 style="display:block;margin:0 auto;border-radius:8px;"
               />
             </td>`
          : ""
        }
          <td align="top" style="vertical-align:middle;">
              ${t.tyreId ? `<div><b>ID:</b> ${t.tyreId}</div>` : ""}
              ${t.tyreTitle ? `<div><b>Назва:</b> ${t.tyreTitle}</div>` : ""}
              ${t.tyreSize ? `<div><b>Розмір:</b> ${t.tyreSize}</div>` : ""}
              ${t.tyrePrice ? `<div><b>Ціна:</b> ${t.tyrePrice} грн</div>` : ""}
              ${t.quantity ? `<div><b>Кількість:</b> ${t.quantity}</div>` : ""}
          </td>
        </tr>
      </table>
    `;
    })
    .join("\n");

}
