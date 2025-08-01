import { prisma } from "@/lib";
import { Prisma, season } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

function getOrderBy(sort: string): Prisma.TyreOrderByWithRelationInput {
  switch (sort) {
    case "title_asc":
      return { title: "asc" };
    case "title_desc":
      return { title: "desc" };
    case "price_asc":
      return { price: "asc" };
    case "price_desc":
      return { price: "desc" };
    default:
      return { title: "asc" };
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const width = searchParams.get("width");
  const profile = searchParams.get("profile");
  const diameter = searchParams.get("diameter");
  const sort = searchParams.get("sort") ?? "price_asc";
  // const allowedSeasons: season[] = ["SUMMER", "WINTER", "ALLSEASON"];
  const seasons = searchParams.getAll("season");
  const query = searchParams.get("query")?.trim();

    try {
      const tyres = await prisma.tyre.findMany({
        where: {
          ...(width && { width: +width }),
          ...(profile && { profile: +profile }),
          ...(diameter && { diameter: +diameter }),
          ...(seasons.length > 0 && {
            season: { in: seasons.map((s) => s.toUpperCase() as season) }
          }),
          ...(query && {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { models: { is: { name: { contains: query, mode: "insensitive" } } } },
              { brands: { is: { brand_name: { contains: query, mode: "insensitive" } } } },
            ],
          }),
        },
        include: {
          models: {
            include: {
              brand: true,
            },
          },
        },
        orderBy: getOrderBy(sort),
      });

      const images = await prisma.modelImage.findMany({
        where: {
          modelId: {
            in: tyres.map((tyre) => tyre.modelId).filter((id): id is number => id !== null)
          },
        },
      });

      return NextResponse.json({ tyres, images });
    } catch(error) {
      console.error("[API] /tyres error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
