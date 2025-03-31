import { getTyresWidths, getTyresProfiles, getTyresDiameters } from "@/lib";
import TyresSelectClient from "./tyres-select-client";

export async function TyresSelect() {
  const widths = await getTyresWidths();
  const profiles = await getTyresProfiles();
  const diameters = await getTyresDiameters();

  return (
    <TyresSelectClient
      widths={widths}
      profiles={profiles}
      diameters={diameters}
    />
  );
}
