import { GetTyresDiameters, GetTyresProfiles, GetTyresWidths } from "@/lib";

export async function TyresSelect() {
    const widths = await GetTyresWidths();
    const profiles = await GetTyresProfiles();
    const diameters = await GetTyresDiameters();
    return (
        <form className="flex gap-6 pt-6 justify-center">
            <select className="py-2 px-4 border-2 rounded-md border-border dark:border-darkmode-border
             focus:ring-2 focus:outline-none focus:ring-accent">
                <option value="">Оберіть ширину</option>
                {widths.map((width) => (
                    <option key={width} value={width}>
                        {width}
                    </option>
                ))}
            </select>

            <select
                className="py-2 px-4 border-2 rounded-md border-border dark:border-darkmode-border
                focus:ring-2 focus:outline-none focus:ring-accent">
                <option value="">Оберіть профіль</option>
                {profiles.map((profile) => (
                    <option key={profile} value={profile}>
                        {profile}
                    </option>
                ))}
            </select>

            <select
                className="py-2 px-4 border-2 rounded-md border-border dark:border-darkmode-border
                focus:ring-2 focus:outline-none focus:ring-accent">
                <option value="">Оберіть діаметр</option>
                {diameters.map((diameter) => (
                    <option key={diameter} value={diameter}>
                        {diameter}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="btn btn-primary btn-md">
                Шукати
            </button>
        </form>
    );
}
