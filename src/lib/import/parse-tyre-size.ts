export function parseTyreSize(size: string) {
  if (!size) return null;
  const s = size.trim()

  // 1) Класичний формат: 205/55R16, LT225/75R16C
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})(?:C|LT)?/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([\/-])(\d{2})(Z?R|D)(\d{2})(?:C|XL|LT)?/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})(R|D)(\d{2})\b/i;
  const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})(RD)(\d{2})$/i;
  let m = reClassic.exec(s)
  if (m) {
    return {
      width: parseInt(m[1], 10),
      delimiter: m[2],
      profile: parseInt(m[3], 10),
      constr: m[4].toUpperCase(),
      diameter: parseInt(m[5], 10),
    }
  }

  // 2) Inch формат: 33X12.5R15, 30X9.5R15LT (X або кирилична Х)
  // const reInch = /^(?:LT)?\s*(\d{2,3})[XxХх](\d{1,2}(?:\.\d)?)R(\d{2})(?:LT)?$/

  const reInch = /^(?:LT)?\s*(\d{2,3})[XxХх](\d{1,2}(?:\.\d)?)R(\d{2})(?:LT)?/;
  m = reInch.exec(s)
  if (m) {
    return {
      width: parseInt(m[1], 10),
      delimiter: 'X',
      profile: parseFloat(m[2]),
      constr: 'R',
      diameter: parseInt(m[3], 10),
    }
  }

  return { width: null, delimiter: null, profile: null, constr: null, diameter: null };
}
