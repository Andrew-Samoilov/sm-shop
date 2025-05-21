import { prisma } from "@/lib";
import { Prisma, Season } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const width = searchParams.get("width");
  const profile = searchParams.get("profile");
  const diameter = searchParams.get("diameter");
  const season = searchParams
    .getAll("season")
    .map((s) => s.toUpperCase())
    .filter((s): s is Season => (s in Season));

  // if (!width || !profile || !diameter) {return NextResponse.json({ error: "Missing parameters" }, { status: 400 }); }

  const where: Prisma.TyreWhereInput = {};

  if (width && !isNaN(Number(width))) {
    where.width = Number(width);
  }

  if (profile && !isNaN(Number(profile))) {
    where.profile = Number(profile);
  }

  if (diameter && !isNaN(Number(diameter))) {
    where.diameter = Number(diameter);
  }

  if (season.length > 0) {
    where.season = {
      in: season,
    };
  }

  try {
    const tyres = await prisma.tyre.findMany({
      where,
      orderBy: { width: "asc" },
    });

    const modelIds = [
      ...new Set(tyres.map((t) => t.modelId).filter((id): id is number => id !== null)),
    ];

    const images = await prisma.modelImage.findMany({
      where: {
        modelId: { in: modelIds },
      },
      orderBy: { position: "asc", },
    });

    return NextResponse.json({ tyres, images });
  } catch (error) {
    console.error("[DB]", error);
    return NextResponse.json({ error: `[api\tyres] Database error` }, { status: 500 });
  }
}
