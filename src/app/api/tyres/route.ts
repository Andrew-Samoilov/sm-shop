import { prisma } from "@/lib";
import { Prisma, season } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const width = searchParams.get("width");
  const profile = searchParams.get("profile");
  const diameter = searchParams.get("diameter");

  const allowedSeasons: season[] = ["SUMMER", "WINTER", "ALLSEASON"];
  const season = searchParams.getAll("season");
  const validSeasons = season.filter((s): s is season => allowedSeasons.includes(s as season));

  const where: Prisma.TyreWhereInput = {
    ...(width && !isNaN(Number(width)) && { width: Number(width) }),
    ...(profile && !isNaN(Number(profile)) && { profile: Number(profile) }),
    ...(diameter && !isNaN(Number(diameter)) && { diameter: Number(diameter) }),
    ...(validSeasons.length > 0 && { season: { in: validSeasons } }),
  };

  const sort = searchParams.get("sort");

  let orderBy: Prisma.TyreOrderByWithRelationInput;
  switch (sort) {
    case "title_asc":
      orderBy = { title: "asc" };
      break;
    case "title_desc":
      orderBy = { title: "desc" };
      break;
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    default:
      orderBy = { title: "asc" };
  }

  try {
    const tyres = await prisma.tyre.findMany({
      where,
      include: {
        brand: true,
        model: true,
      },
      orderBy,
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

    // console.log(`[DB] GET`,tyres[0])

    return NextResponse.json({ tyres, images });
  } catch (error) {
    console.error("[DB]", error);
    return NextResponse.json({ error: `[api\tyres] Database error` }, { status: 500 });
  }
}
