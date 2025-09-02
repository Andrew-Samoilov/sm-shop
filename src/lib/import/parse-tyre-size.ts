export function parseTyreSize(size: string) {
  if (!size) return null;
  const s = size.trim().toUpperCase();

  // 1) Класичний метричний формат: 265/70R17, LT245/65R17
  // const reMetric = /^(?:LT|HL|P|T)?\s*(\d{3})[/-](\d{2})(Z?R|D)(\d{2})/i;
  const reMetric = /^(?:LT|HL|P|T)?\s*(\d{3})[/-](\d{2})[RDZ]?R?(\d{2})$/i;

  let m = reMetric.exec(s);
  if (m) {
    return {
      width: parseInt(m[1], 10),
      profile: parseInt(m[2], 10),
      constr: "R", 
      diameter: parseInt(m[4], 10),
    };
  }

  // 2) Американський формат (flotation): LT31X10.5R15
  const reFlotation = /^(?:LT|HL)?\s*(\d{2,3})x(\d{1,2}(?:\.\d)?)R(\d{2})$/i;
  m = reFlotation.exec(s);
  if (m) {
    return {
      overallDiameter: parseFloat(m[1]), // 31
      widthInch: parseFloat(m[2]),       // 10.5
      constr: "R",
      diameter: parseInt(m[3], 10),      // 15
    };
  }

  return null;
}
