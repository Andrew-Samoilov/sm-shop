export type TyreWithSizeProps = {
    width?: string | number | null;
    profile?: string | number | null;
    diameter?: string | number | null;
    delimiter?: string | null;
    loadIndex?: string | number | null;
    speedIndex?: string | null;
    loadSpeedIndex?: string | null;
  };

export function getTyreSize(tyre: TyreWithSizeProps): string | null {
    const { width, profile, diameter, delimiter, loadIndex, speedIndex, loadSpeedIndex } = tyre;

    if (width && profile && diameter && loadSpeedIndex) {
        return `${width}${delimiter ?? "/"}${profile} R${diameter} ${loadIndex ?? ""}${speedIndex ?? ""}`.trim();
    }

    return null;
}
