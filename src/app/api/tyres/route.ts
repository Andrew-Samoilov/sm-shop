import { prisma } from "@/lib/server/prisma/prisma";
import { Prisma, season } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"

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

  //все пусто - даєм 100 записів
  const hasFilters =
    width || profile || diameter || seasons.length > 0 || query;
  
  try {
    const tyres = await prisma.tyre.findMany({
      where: {
        inventoryQuantity: {
          not: null,
          gt: 0
        },
        ...(width && { width: +width }),
        ...(profile && { profile: +profile }),
        ...(diameter && { diameter: +diameter }),
        ...(seasons.length > 0 && {
          model: { is: { season: { in: seasons.map((s) => s.toUpperCase() as season) } } }
        }),
        ...(query && {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              model: {
                is: {
                  modelName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              brand: {
                is: {
                  brand_name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }),
      },

      include: {
        brand: true,
        model: true,
      },
      orderBy: getOrderBy(sort),
      //якщо немає параметрів - 100 записів
      ...(hasFilters ? {} : { take: 100 }),
    });

    const images = await prisma.modelImage.findMany({
      where: {
        modelId: {
          in: tyres.map((tyre) => tyre.modelId).filter((id): id is number => id !== null)
        },
      },
      orderBy: {
        position: "asc",
      },
    });
    // console.log("[API] /tyres fetched tyresCount:", tyres.length);
    // console.log("[API] /tyres fetched tyres:", tyres);

    return NextResponse.json({ tyres, images });
  } catch (error) {
    console.error("[API] /tyres error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
