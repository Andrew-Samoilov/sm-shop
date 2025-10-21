"use server";

import { getBaseMetadata } from "@/lib/metadata/get-base-metadata";
type GetBaseMetadataParams = Parameters<typeof getBaseMetadata>[0];

export async function getBaseMetadataAction(params?: GetBaseMetadataParams) {
    return getBaseMetadata(params);
}
