import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const width = searchParams.get("width");
  const profile = searchParams.get("profile");
  const diameter = searchParams.get("diameter");

  if (!width || !profile || !diameter) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const tyres = await prisma.tyres.findMany({
      where: { width, profile, diameter },
      select: {
        id: true,
        model: true,
        description: true,
        country: true,
        model_id: true,
        brand_id: true,
        title: true,
        slug: true,
        date_code: true,
        type: true,
        price: true,
      },
      orderBy: { title: "asc" },
    });

    return NextResponse.json(tyres);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
