import { prisma, ensureSchema } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ensureSchema();
    const invitees = await prisma.invitee.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        adultsCount: true,
        kidsCount: true,
        isAttending: true,
        message: true,
        respondedAt: true,
      },
    });

    return NextResponse.json(invitees);
  } catch (error) {
    console.error("Failed to fetch invitees:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitees" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureSchema();
    const { id } = await request.json();

    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { error: "Valid invitee ID is required" },
        { status: 400 }
      );
    }

    // Check if invitee exists
    const invitee = await prisma.invitee.findUnique({
      where: { id },
    });

    if (!invitee) {
      return NextResponse.json(
        { error: "Invitee not found" },
        { status: 404 }
      );
    }

    // Delete the invitee
    await prisma.invitee.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true,
      message: `${invitee.name} has been deleted` 
    });
  } catch (error) {
    console.error("Failed to delete invitee:", error);
    return NextResponse.json(
      { error: "Failed to delete invitee" },
      { status: 500 }
    );
  }
}
