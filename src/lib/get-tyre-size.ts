export type TyreWithSizeProps = {
    width?: string | number | null;
    profile?: string | number | null;
    diameter?: string | number | null;
    loadIndex?: string | number | null;
    speedIndex?: string | null;
    loadSpeedIndex?: string | null;
    additionalIndex?: string | null;
};

export function getTyreSize(tyre: TyreWithSizeProps): string | null {
    const { width, profile, diameter, loadIndex, speedIndex, loadSpeedIndex, additionalIndex } = tyre;
    if (width && profile && diameter && loadSpeedIndex) {
        return `${width}/${profile}R${diameter} ${loadIndex ?? ""}${speedIndex ?? ""} ${additionalIndex ?? ""}`.trim();
    }

    return null;
}
