export function parseTyreSize(size: string) {
  if (!size) return null;
  const s = size.trim()
  
  const reLT = /^(?:LT|HL)?\s*(\d{3})[/-](\d{2})([RD])(\d{2})$/i;
  let m = reLT.exec(s)
  if (m) {
    console.log('Matched LT format', m);
    return {
      width: parseInt(m[1], 10),  
      profile: parseInt(m[2], 10), 
      constr: m[3].toUpperCase(),  
      diameter: parseInt(m[4], 10) 
    };
  }
  
  // 1) Класичний формат: 205/55R16, LT225/75R16C
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})(?:C|LT)?/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([\/-])(\d{2})(Z?R|D)(\d{2})(?:C|XL|LT)?/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})([RD])(\d{2})/i;
  // const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})(R|D)(\d{2})\b/i;

  const reClassic = /^(?:LT|HL|P|T)?\s*(\d{3})([/-])(\d{2})(RD)(\d{2})$/i;
  m = reClassic.exec(s)
  if (m) {
    // console.log('Matched Classic format', m);
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
    // console.log('Matched Inch format', m);
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
