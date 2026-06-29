import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch relational entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newListing = await prisma.listing.create({
      data: {
        title: body.title,
        description: body.description,
        price: Number(body.price),
        category: body.category || "General",
        imageUrl: body.imageUrl || "/hero.jpg",
      }
    });
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Relational database transaction failed" }, { status: 500 });
  }
}
