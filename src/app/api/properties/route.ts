import prisma from "@/lib/db";
import { PropertyType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      city,
      country,
      description,
      files,
      numberBathrooms,
      numberBedrooms,
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
        type: type as PropertyType, // Casting type to PropertyType enum
        numberBedrooms,
        numberBathrooms,
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
