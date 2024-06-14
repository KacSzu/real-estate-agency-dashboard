import prisma from "@/lib/db";
import { PropertyType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      city,
      country,
      description,
      files,
      numberBathrooms,
      numberBedrooms,
      numberRooms,
      squares,
      price,
      title,
      type,
    } = body;

    // Create a new property in the database
    const property = await prisma.property.create({
      data: {
        city,
        country,
        description,
        price,
        title,
        type: type as PropertyType,
        numberBedrooms,
        numberBathrooms,
        numberRooms,
        squares,
        images: {
          create: files.map(
            (file: { imageSrc: string; thumbnailSrc: string | null }) => ({
              imageSrc: file.imageSrc,
              thumbnailSrc: file.thumbnailSrc,
            })
          ),
        },
      },
    });
    // Return the created property as the response;
    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    console.error("Error creating property:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing property ID" },
        { status: 400 }
      );
    }
    //  Delete related images
    await prisma.image.deleteMany({
      where: { propertyId: Number(id) },
    });
    // Delete the property
    const property = await prisma.property.delete({
      where: { id: Number(id) },
    });

    // Return the deleted property as the response
    return NextResponse.json(property, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting property:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
