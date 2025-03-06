import { GetTyresWidths, GetTyresProfiles, GetTyresDiameters } from "@/lib";
import TyresSelectClient from "./tyres-select-client";

export async function TyresSelect() {
    const widths = await GetTyresWidths();
    const profiles = await GetTyresProfiles();
    const diameters = await GetTyresDiameters();

    return (
        <TyresSelectClient
            widths={widths}
            profiles={profiles}
            diameters={diameters}
        />
    );
}
