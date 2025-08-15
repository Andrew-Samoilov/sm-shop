export function parseTyreSize(tyreSize: string) {
    if (!tyreSize) return null;

    /*
      Приклади:
      205/55R16
      195/75R16C
      245/45ZR18
      225/50RF17
      205\55R16
    */
    const match = tyreSize.trim().match(
        /^(\d+)([\/\\])(\d+)([A-Z]{0,4})/i
    );

    if (!match) return null;

    const [, width, delimiter, profile, constr] = match;

    return {
        width: parseFloat(width),
        profile: parseFloat(profile),
        constr: constr || null,
        delimiter,
    };
}
