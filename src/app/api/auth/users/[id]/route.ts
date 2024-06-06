import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: id },
    });

    // Respond with a success message
    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
